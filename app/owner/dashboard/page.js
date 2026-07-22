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

    const interval = setInterval(() => {
      loadNotifications(ownerId);
      loadBookings(ownerId);
    }, 5000);

    return () =>
      clearInterval(interval);
  }, []);

  const playNotificationSound = () => {
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

      loadBookings(ownerId);
      loadNotifications(ownerId);
    } catch (error) {
      console.log(error);
    }
  };

  const loadBookings = async (
    ownerId
  ) => {
    try {
      const q = query(
        collection(db, "bookings"),
        where(
          "ownerId",
          "==",
          ownerId
        )
      );

      const snapshot =
        await getDocs(q);

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
    } catch (error) {
      console.log(error);
    }
  };

  const loadNotifications = async (
    ownerId
  ) => {
    try {
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

      const snapshot =
        await getDocs(q);

      const list = [];

      snapshot.forEach((item) => {
        list.push({
          id: item.id,
          ...item.data(),
        });
      });

      const hasNewNotification =
        list.length >
        notifications.length;

      if (hasNewNotification) {
        playNotificationSound();

        const latest =
          list[list.length - 1];

        setToast(
          latest?.message ||
            "New Notification"
        );

        setTimeout(() => {
          setToast(null);
        }, 5000);
      }

      setNotifications(list);
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