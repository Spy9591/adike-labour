"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  collection,
  getDocs,
  getDoc,
  query,
  where,
  addDoc,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../../firebase";

import DashboardHeader from "./DashboardHeader";
import StatsCards from "./StatsCards";
import DashboardContent from "./DashboardContent";
import LoadingScreen from "./LoadingScreen";
import Notifications from "./Notifications";
import ScanOverlay from "./ScanOverlay";

import "./dashboard.css";

export default function OwnerDashboard() {
  const router = useRouter();

  const [owner, setOwner] = useState(null);

  const [availableLabours, setAvailableLabours] =
    useState([]);

  const [hasScanned, setHasScanned] =
    useState(false);

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
    const ownerId =
      localStorage.getItem("ownerId");

    if (!ownerId) return;

    const bookingQuery = query(
      collection(db, "bookings"),
      where("ownerId", "==", ownerId)
    );

    const unsubscribeBookings =
      onSnapshot(
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
              "accepted"
            ) {
              running.push(booking);
            }

            if (
              booking.status ===
              "completed"
            ) {
              completed.push(booking);
            }

            if (
              booking.status ===
                "cancelled" ||
              booking.status ===
                "rejected"
            ) {
              cancelled.push(booking);
            }
          });

          setRunningJobs(running);
          setCompletedJobs(completed);
          setCancelledJobs(cancelled);
        }
      );

    const notifyQuery = query(
      collection(db, "notifications"),
      where("userId", "==", ownerId)
    );

    const unsubscribeNotifications =
      onSnapshot(
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

    return () => {
      unsubscribeBookings();
      unsubscribeNotifications();
    };
  }, []);

  const playNotificationSound =
    () => {
      if (!soundEnabled) return;

      const audio = new Audio(
        "/mixkit-bell-notification-933.wav"
      );

      audio.play();
    };

  const logout = () => {
    localStorage.removeItem("ownerId");
    router.replace("/");
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
      Math.sin(dLat / 2) **
        2 +
      Math.cos(
        (lat1 * Math.PI) /
          180
      ) *
        Math.cos(
          (lat2 * Math.PI) /
            180
        ) *
        Math.sin(dLon / 2) **
          2;

    const c =
      2 *
      Math.atan2(
        Math.sqrt(a),
        Math.sqrt(1 - a)
      );

    return R * c;
  };

  const scanNearbyLabours = () => {
    setIsScanning(true);

    if (!navigator.geolocation) {
      setIsScanning(false);

      alert(
        "Location services are not supported."
      );

      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const ownerLat =
            position.coords.latitude;

          const ownerLng =
            position.coords.longitude;

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
                  distance <= 10
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

          setHasScanned(true);

          setIsScanning(false);

          if (
            nearby.length === 0
          ) {
            alert(
              "No available labour found."
            );
          }
        } catch (error) {
          setIsScanning(false);
          console.log(error);
        }
      },
      () => {
        setIsScanning(false);

        alert(
          "Please allow location access."
        );
      }
    );
  };

  const bookLabour = async (
    labour
  ) => {
    try {
      const ownerId =
        localStorage.getItem(
          "ownerId"
        );

      await addDoc(
        collection(db, "bookings"),
        {
          ownerId,
          ownerName:
            owner?.name || "",
          ownerPhone:
            owner?.phone || "",

          labourId:
            labour.id,

          labourName:
            labour.name || "",

          labourPhone:
            labour.phone || "",

          labourVillage:
            labour.village || "",

          distance:
            labour.distance || "",

          status: "pending",

          paymentStatus:
            "unpaid",

          totalAmount: 700,

          receivedAmount: 0,

          remainingAmount: 700,

          ownerPaidAmount: 0,

          createdAt:
            new Date(),
        }
      );

      alert(
        "✅ Booking Request Sent Successfully"
      );
    } catch (error) {
      console.log(error);

      alert(
        "❌ Failed to send booking request"
      );
    }
  };

  const payFullAmount = async (
    job
  ) => {
    try {
      const amount =
        job.remainingAmount ??
        job.totalAmount ??
        700;

      await updateDoc(
        doc(
          db,
          "bookings",
          job.id
        ),
        {
          ownerPaidAmount:
            amount,
          paymentType:
            "Full Payment",
          paymentStatus:
            "pending",
        }
      );

      alert(
        `₹${amount} payment submitted`
      );
    } catch (error) {
      console.log(error);
    }
  };

  const payCustomAmount =
    async (job) => {
      try {
        const value = prompt(
          "Enter Amount"
        );

        if (!value) return;

        const amount =
          Number(value);

        if (
          isNaN(amount) ||
          amount <= 0
        ) {
          alert(
            "Invalid Amount"
          );
          return;
        }

        const due =
          job.remainingAmount ??
          job.totalAmount ??
          700;

        if (amount > due) {
          alert(
            "Amount cannot exceed due amount"
          );
          return;
        }

        await updateDoc(
          doc(
            db,
            "bookings",
            job.id
          ),
          {
            ownerPaidAmount:
              amount,
            paymentType:
              "Partial Payment",
            paymentStatus:
              "pending",
          }
        );

        alert(
          `₹${amount} payment submitted`
        );
      } catch (error) {
        console.log(error);
      }
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
      />

      <Notifications
        notifications={
          notifications
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
        hasScanned={
          hasScanned
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
          🔔 {toast}
        </div>
      )}

      {isScanning && (
        <ScanOverlay />
      )}
    </div>
  );
}