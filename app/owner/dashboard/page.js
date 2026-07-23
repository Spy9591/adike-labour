"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  collection,
  query,
  where,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  onSnapshot,
  doc,
} from "firebase/firestore";

import { db } from "../../firebase";

import DashboardHeader from "./DashboardHeader";
import DashboardContent from "./DashboardContent";
import StatsCards from "./StatsCards";
import LoadingScreen from "./LoadingScreen";
import ScanOverlay from "./ScanOverlay";

import "./dashboard.css";

export default function OwnerDashboard() {
  const router = useRouter();

  const [owner, setOwner] = useState(null);

  const [availableLabours, setAvailableLabours] =
    useState([]);

  const [runningJobs, setRunningJobs] =
    useState([]);

  const [completedJobs, setCompletedJobs] =
    useState([]);

  const [cancelledJobs, setCancelledJobs] =
    useState([]);

  const [notifications, setNotifications] =
    useState([]);

  const [selectedView, setSelectedView] =
    useState("available");

  const [isScanning, setIsScanning] =
    useState(false);

  const [toast, setToast] =
    useState(null);

  const [soundEnabled, setSoundEnabled] =
    useState(true);

  const [
    showNotifications,
    setShowNotifications,
  ] = useState(false);

  const [
    lastPaymentStatus,
    setLastPaymentStatus,
  ] = useState({});

  useEffect(() => {
    loadOwner();
  }, []);

  useEffect(() => {
    subscribeBookings();
    subscribeNotifications();
  }, []);

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const playNotificationSound = () => {
    if (!soundEnabled) return;

    try {
      const audio = new Audio(
        "/mixkit-bell-notification-933.wav"
      );

      audio.play();
    } catch (error) {
      console.log(error);
    }
  };

  const getPaymentMeta = () => {
    const now = new Date();

    return {
      paymentRequestDate:
        now.toLocaleDateString(),

      paymentRequestTime:
        now.toLocaleTimeString(),

      paymentRequestDay:
        now.toLocaleDateString(
          "en-US",
          {
            weekday: "long",
          }
        ),

      paymentRequestTimestamp:
        Date.now(),
    };
  };

  const loadOwner = async () => {
    try {
      const ownerId =
        localStorage.getItem(
          "ownerId"
        );

      if (!ownerId) {
        router.replace("/");
        return;
      }

      const ownerDoc =
        await getDoc(
          doc(
            db,
            "owners",
            ownerId
          )
        );

      if (ownerDoc.exists()) {
        setOwner({
          id: ownerDoc.id,
          ...ownerDoc.data(),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const scanNearbyLabours =
    async () => {
      try {
        setIsScanning(true);

        const snapshot =
          await getDocs(
            collection(
              db,
              "labours"
            )
          );

        const labours = [];

        snapshot.forEach(
          (item) => {
            const labour =
              item.data();

            if (
              labour.onDuty ===
                true &&
              labour.busy !==
                true
            ) {
              labours.push({
                id: item.id,
                ...labour,
              });
            }
          }
        );

        setAvailableLabours(
          labours
        );

        showToast(
          `✅ ${labours.length} Labour Found`
        );
      } catch (error) {
        console.log(error);
      } finally {
        setIsScanning(false);
      }
    };

  const subscribeNotifications =
    () => {
      const ownerId =
        localStorage.getItem(
          "ownerId"
        );

      if (!ownerId) return;

      const q = query(
        collection(
          db,
          "notifications"
        ),
        where(
          "userId",
          "==",
          ownerId
        )
      );

      return onSnapshot(
        q,
        (
          snapshot
        ) => {
          const list =
            [];

          snapshot.forEach(
            (docSnap) => {
              list.push({
                id: docSnap.id,
                ...docSnap.data(),
              });
            }
          );

          setNotifications(
            list
          );
        }
      );
    };

  const subscribeBookings =
    () => {
      const ownerId =
        localStorage.getItem(
          "ownerId"
        );

      if (!ownerId) return;

      const bookingQuery =
        query(
          collection(
            db,
            "bookings"
          ),
          where(
            "ownerId",
            "==",
            ownerId
          )
        );

      return onSnapshot(
        bookingQuery,
        (
          snapshot
        ) => {
          const running =
            [];

          const completed =
            [];

          const cancelled =
            [];

          const statusMap =
            {};

          snapshot.forEach(
            (item) => {
              const booking =
                {
                  id: item.id,
                  ...item.data(),
                };

              statusMap[
                booking.id
              ] =
                booking.paymentStatus;

              const previous =
                lastPaymentStatus[
                  booking.id
                ];

              if (
                previous !==
                booking.paymentStatus
              ) {
                if (
                  booking.paymentStatus ===
                  "approved"
                ) {
                  playNotificationSound();

                  showToast(
                    `✅ ${booking.labourName} approved payment`
                  );
                }

                if (
                  booking.paymentStatus ===
                  "rejected"
                ) {
                  showToast(
                    `❌ ${booking.labourName} rejected payment`
                  );
                }

                if (
                  booking.paymentStatus ===
                  "expired"
                ) {
                  showToast(
                    "⌛ Payment expired"
                  );
                }
              }

              if (
                booking.status ===
                  "pending" &&
                booking.requestExpiry &&
                Date.now() >
                  booking.requestExpiry
              ) {
                updateDoc(
                  doc(
                    db,
                    "bookings",
                    booking.id
                  ),
                  {
                    status:
                      "expired",
                  }
                );
              }

              if (
                booking.paymentStatus ===
                  "processing" &&
                booking.paymentExpiry &&
                Date.now() >
                  booking.paymentExpiry
              ) {
                updateDoc(
                  doc(
                    db,
                    "bookings",
                    booking.id
                  ),
                  {
                    paymentStatus:
                      "expired",
                  }
                );
              }

              if (
                booking.status ===
                "accepted"
              ) {
                running.push(
                  booking
                );
              }

              if (
                booking.paymentStatus ===
                  "processing" ||
                booking.paymentStatus ===
                  "approved" ||
                booking.paymentStatus ===
                  "paid" ||
                booking.status ===
                  "completed"
              ) {
                completed.push(
                  booking
                );
              }

              if (
                booking.status ===
                  "cancelled" ||
                booking.status ===
                  "rejected" ||
                booking.status ===
                  "expired"
              ) {
                cancelled.push(
                  booking
                );
              }
            }
          );

          setLastPaymentStatus(
            statusMap
          );

          setRunningJobs(
            running
          );

          setCompletedJobs(
            completed
          );

          setCancelledJobs(
            cancelled
          );
        }
      );
    };

  const bookLabour =
    async (
      labour
    ) => {
      try {
        const ownerId =
          localStorage.getItem(
            "ownerId"
          );

        await addDoc(
          collection(
            db,
            "bookings"
          ),
          {
            ownerId,

            labourId:
              labour.id,

            labourName:
              labour.name,

            labourPhone:
              labour.phone,

            status:
              "pending",

            requestSentAt:
              Date.now(),

            requestExpiry:
              Date.now() +
              60000,

            totalAmount:
              700,

            receivedAmount:
              0,

            remainingAmount:
              700,

            paymentStatus:
              "unpaid",

            requestedPaymentAmount:
              0,

            paymentHistory:
              [],

            createdAt:
              new Date(),
          }
        );

        showToast(
          "🚀 Request Sent"
        );

        playNotificationSound();
      } catch (error) {
        console.log(error);
      }
    };

  const payFullAmount =
    async (
      job
    ) => {
      try {
        const meta =
          getPaymentMeta();

        await updateDoc(
          doc(
            db,
            "bookings",
            job.id
          ),
          {
            paymentStatus:
              "processing",

            requestedPaymentAmount:
              job.remainingAmount,

            paymentExpiry:
              Date.now() +
              120000,

            ...meta,
          }
        );

        showToast(
          "💳 Waiting Labour Approval"
        );
      } catch (error) {
        console.log(error);
      }
    };

  const payCustomAmount =
    async (
      job,
      amount
    ) => {
      try {
        const meta =
          getPaymentMeta();

        await updateDoc(
          doc(
            db,
            "bookings",
            job.id
          ),
          {
            paymentStatus:
              "processing",

            requestedPaymentAmount:
              amount,

            paymentExpiry:
              Date.now() +
              120000,

            ...meta,
          }
        );

        showToast(
          `💳 ₹${amount} Waiting Approval`
        );
      } catch (error) {
        console.log(error);
      }
    };

  const logout = () => {
    localStorage.removeItem(
      "ownerId"
    );

    router.replace("/");
  };

  if (!owner) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <div className="dashboard">

      <DashboardHeader
        owner={owner}
        logout={logout}
        scanNearbyLabours={
          scanNearbyLabours
        }
        soundEnabled={
          soundEnabled
        }
        setSoundEnabled={
          setSoundEnabled
        }
        notifications={
          notifications
        }
        showNotifications={
          showNotifications
        }
        setShowNotifications={
          setShowNotifications
        }
      />

      <StatsCards
        availableLabours={
          availableLabours.length
        }
        runningJobs={
          runningJobs.length
        }
        completedJobs={
          completedJobs.length
        }
        cancelledJobs={
          cancelledJobs.length
        }
        setSelectedView={
          setSelectedView
        }
      />

      <DashboardContent
        selectedView={
          selectedView
        }
        availableLabours={
          availableLabours
        }
        runningJobs={
          runningJobs
        }
        completedJobs={
          completedJobs
        }
        cancelledJobs={
          cancelledJobs
        }
        bookLabour={
          bookLabour
        }
        payFullAmount={
          payFullAmount
        }
        payCustomAmount={
          payCustomAmount
        }
      />

      {toast && (
        <div className="toast">
          {toast}
        </div>
      )}

      {isScanning && (
        <ScanOverlay />
      )}

    </div>
  );
}