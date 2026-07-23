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

  const [toast, setToast] = useState(null);

  const [soundEnabled, setSoundEnabled] =
    useState(true);

  const [
    showNotifications,
    setShowNotifications,
  ] = useState(false);

  useEffect(() => {
    loadOwner();
  }, []);

  useEffect(() => {
    subscribeBookings();
    subscribeNotifications();
  }, []);

  const showToast = (message) => {
    setToast(message);

    setTimeout(
      () => setToast(null),
      3000
    );
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

      const ownerSnap =
        await getDoc(
          doc(
            db,
            "owners",
            ownerId
          )
        );

      if (ownerSnap.exists()) {
        setOwner({
          id: ownerSnap.id,
          ...ownerSnap.data(),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const calculateDistance = (
    lat1,
    lon1,
    lat2,
    lon2
  ) => {
    const R = 6371;

    const dLat =
      ((lat2 - lat1) *
        Math.PI) /
      180;

    const dLon =
      ((lon2 - lon1) *
        Math.PI) /
      180;

    const a =
      Math.sin(dLat / 2) *
        Math.sin(dLat / 2) +
      Math.cos(
        (lat1 *
          Math.PI) /
          180
      ) *
        Math.cos(
          (lat2 *
            Math.PI) /
            180
        ) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c =
      2 *
      Math.atan2(
        Math.sqrt(a),
        Math.sqrt(1 - a)
      );

    return R * c;
  };

  const scanNearbyLabours =
    () => {
      setIsScanning(true);

      navigator.geolocation.getCurrentPosition(
        async (
          position
        ) => {
          try {
            const ownerLat =
              position.coords
                .latitude;

            const ownerLng =
              position.coords
                .longitude;

            const snapshot =
              await getDocs(
                collection(
                  db,
                  "labours"
                )
              );

            const nearby = [];

            snapshot.forEach(
              (item) => {
                const labour =
                  item.data();

                if (
                  labour.onDuty ===
                    true &&
                  labour.busy !==
                    true &&
                  labour.latitude &&
                  labour.longitude
                ) {
                  const distance =
                    calculateDistance(
                      ownerLat,
                      ownerLng,
                      labour.latitude,
                      labour.longitude
                    );

                  if (
                    distance <=
                    10
                  ) {
                    nearby.push({
                      id: item.id,
                      ...labour,
                      distance:
                        distance.toFixed(
                          1
                        ),
                    });
                  }
                }
              }
            );

            setAvailableLabours(
              nearby
            );

            showToast(
              `✅ ${nearby.length} Labour Found`
            );

            setIsScanning(
              false
            );
          } catch (error) {
            console.log(error);
            setIsScanning(
              false
            );
          }
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

      onSnapshot(
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

          snapshot.forEach(
            (item) => {
              const booking =
                {
                  id: item.id,
                  ...item.data(),
                };

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
                booking.status ===
                  "completed" ||
                booking.paymentStatus ===
                  "approved" ||
                booking.paymentStatus ===
                  "paid"
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

  const subscribeNotifications =
    () => {
      const ownerId =
        localStorage.getItem(
          "ownerId"
        );

      if (!ownerId) return;

      const notifyQuery =
        query(
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

      onSnapshot(
        notifyQuery,
        (
          snapshot
        ) => {
          const list =
            [];

          snapshot.forEach(
            (item) => {
              list.push({
                id: item.id,
                ...item.data(),
              });
            }
          );

          setNotifications(
            list
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

            requestedPaymentAmount:
              0,

            paymentStatus:
              "unpaid",

            paymentHistory:
              [],

            createdAt:
              new Date(),
          }
        );

        playNotificationSound();

        showToast(
          "🚀 Request Sent"
        );
      } catch (error) {
        console.log(error);
      }
    };

  const payFullAmount = async (
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
        "💳 Full Payment Request Sent"
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
          `💳 ₹${amount} Request Sent`
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
    return <LoadingScreen />;
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