"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  collection,
  addDoc,
  updateDoc,
  getDoc,
  getDocs,
  doc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../../firebase";

import DashboardHeader from "./DashboardHeader";
import DashboardContent from "./DashboardContent";
import StatsCards from "./StatsCards";
import Notifications from "./Notifications";
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

  useEffect(() => {
    loadOwner();
  }, []);

  useEffect(() => {
    subscribeBookings();
    subscribeNotifications();
  }, []);

  const playNotificationSound = () => {
    if (!soundEnabled) return;

    const audio = new Audio(
      "/mixkit-bell-notification-933.wav"
    );

    audio.play();
  };

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const loadOwner = async () => {
    try {
      const ownerId =
        localStorage.getItem("ownerId");

      if (!ownerId) {
        router.replace("/");
        return;
      }

      const ownerRef = doc(
        db,
        "owners",
        ownerId
      );

      const ownerSnap =
        await getDoc(ownerRef);

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

  const subscribeBookings = () => {
    const ownerId =
      localStorage.getItem("ownerId");

    if (!ownerId) return;

    const bookingQuery = query(
      collection(db, "bookings"),
      where("ownerId", "==", ownerId)
    );

    return onSnapshot(
      bookingQuery,
      (snapshot) => {
        const running = [];
        const completed = [];
        const cancelled = [];

        snapshot.forEach((item) => {
          const booking = {
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
                status: "expired",
              }
            );
          }

          if (
            booking.status ===
            "accepted"
          ) {
            running.push(booking);
          }

          if (
            booking.status ===
              "completed" ||
            booking.paymentStatus ===
              "paid"
          ) {
            completed.push(booking);
          }

          if (
            booking.status ===
              "cancelled" ||
            booking.status ===
              "rejected" ||
            booking.status ===
              "expired"
          ) {
            cancelled.push(booking);
          }
        });

        setRunningJobs(running);
        setCompletedJobs(completed);
        setCancelledJobs(cancelled);
      }
    );
  };

  const subscribeNotifications =
    () => {
      const ownerId =
        localStorage.getItem("ownerId");

      if (!ownerId) return;

      const notifyQuery = query(
        collection(
          db,
          "notifications"
        ),
        where("userId", "==", ownerId)
      );

      return onSnapshot(
        notifyQuery,
        (snapshot) => {
          const list = [];

          snapshot.forEach((item) => {
            list.push({
              id: item.id,
              ...item.data(),
            });
          });

          setNotifications(list);
        }
      );
    };

  const bookLabour = async (
    labour
  ) => {
    try {
      const ownerId =
        localStorage.getItem("ownerId");

      const existingQuery = query(
        collection(db, "bookings"),
        where("ownerId", "==", ownerId),
        where(
          "labourId",
          "==",
          labour.id
        ),
        where(
          "status",
          "==",
          "pending"
        )
      );

      const existing =
        await getDocs(
          existingQuery
        );

      if (!existing.empty) {
        showToast(
          "Please wait for labour response."
        );
        return;
      }

      await addDoc(
        collection(db, "bookings"),
        {
          ownerId,

          labourId:
            labour.id,

          labourName:
            labour.name,

          labourPhone:
            labour.phone,

          status: "pending",

          requestSentAt:
            Date.now(),

          requestExpiry:
            Date.now() + 60000,

          totalAmount: 700,

          receivedAmount: 0,

          remainingAmount: 700,

          paymentStatus:
            "unpaid",

          createdAt:
            new Date(),
        }
      );

      playNotificationSound();

      showToast(
        "✅ Request Sent"
      );
    } catch (error) {
      console.log(error);
    }
  };

  const payFullAmount =
    async (job) => {
      const due =
        job.remainingAmount ||
        job.totalAmount ||
        700;

      const paid =
        job.receivedAmount || 0;

      await updateDoc(
        doc(
          db,
          "bookings",
          job.id
        ),
        {
          receivedAmount:
            paid + due,

          remainingAmount: 0,

          paymentStatus:
            "paid",

          paymentType:
            "Full Payment",
        }
      );

      playNotificationSound();

      showToast(
        "✅ Payment Completed"
      );
    };

  const payCustomAmount =
    async (job) => {
      const value = prompt(
        "Enter Amount"
      );

      if (!value) return;

      const amount =
        Number(value);

      const paid =
        job.receivedAmount || 0;

      const total =
        job.totalAmount || 700;

      const updatedPaid =
        paid + amount;

      const updatedDue =
        total - updatedPaid;

      await updateDoc(
        doc(
          db,
          "bookings",
          job.id
        ),
        {
          receivedAmount:
            updatedPaid,

          remainingAmount:
            updatedDue,

          paymentStatus:
            updatedDue === 0
              ? "paid"
              : "partial",
        }
      );

      if (updatedDue === 0) {
        playNotificationSound();
      }

      showToast(
        `₹${amount} Paid`
      );
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
        soundEnabled={soundEnabled}
        setSoundEnabled={
          setSoundEnabled
        }
      />

      <Notifications
        notifications={notifications}
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