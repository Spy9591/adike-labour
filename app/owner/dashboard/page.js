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
  updateDoc,
  doc,
} from "firebase/firestore";

import { db } from "../../firebase";

import DashboardHeader from "./DashboardHeader";
import StatsCards from "./StatsCards";
import DashboardContent from "./DashboardContent";
import LoadingScreen from "./LoadingScreen";
import Notifications from "./Notifications";

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

  useEffect(() => {
    loadOwner();
  }, []);

  const logout = () => {
    localStorage.removeItem("ownerId");
    router.replace("/owner");
  };

  const loadOwner = async () => {
    try {
      const ownerId =
        localStorage.getItem("ownerId");

      if (!ownerId) {
        router.replace("/owner");
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

      loadAvailableLabours();
      loadBookings(ownerId);
      loadNotifications(ownerId);
    } catch (error) {
      console.log(error);
    }
  };

  const loadAvailableLabours = async () => {
    try {
      const snapshot =
        await getDocs(
          collection(db, "labours")
        );

      const list = [];

      snapshot.forEach((item) => {
        const data = item.data();

        if (
          data.onDuty === true &&
          data.busy !== true
        ) {
          list.push({
            id: item.id,
            ...data,
          });
        }
      });

      setAvailableLabours(list);
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
          cancelled.push(
            booking
          );
        }
      });

      setRunningJobs(running);
      setCompletedJobs(completed);
      setCancelledJobs(cancelled);
    } catch (error) {
      console.log(error);
    }
  };

  const loadNotifications =
    async (ownerId) => {
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

        setNotifications(list);
      } catch (error) {
        console.log(error);
      }
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
            owner?.name ||
            "Farm Owner",

          labourId:
            labour.id,

          labourName:
            labour.name,

          village:
            labour.village || "",

          status:
            "pending",

          paymentStatus:
            "unpaid",

          totalAmount: 700,
          paidAmount: 0,
          remainingAmount: 700,

          createdAt:
            new Date(),
        }
      );

      alert(
        "✅ Booking Request Sent Successfully"
      );

      loadBookings(ownerId);
    } catch (error) {
      console.log(error);
    }
  };

  const calculateAmount = (
    startTime
  ) => {
    if (!startTime)
      return 700;

    const diff =
      new Date() -
      startTime.toDate();

    const hours =
      diff / 3600000;

    let amount = 700;

    if (hours > 9) {
      const extraMinutes =
        (hours - 9) * 60;

      const blocks =
        Math.ceil(
          extraMinutes / 30
        );

      amount += blocks * 50;
    }

    return Math.round(amount);
  };

  const openPhonePe = () => {
    try {
      window.location.href =
        "phonepe://";
    } catch (error) {
      console.log(error);
    }
  };

  const payCash = async (
    booking
  ) => {
    try {
      const totalAmount =
        booking.totalAmount ||
        700;

      await updateDoc(
        doc(
          db,
          "bookings",
          booking.id
        ),
        {
          paidAmount:
            totalAmount,
          remainingAmount: 0,
          paymentStatus:
            "paid",
          paymentMethod:
            "Cash",
          paymentDate:
            new Date(),
        }
      );

      loadBookings(
        localStorage.getItem(
          "ownerId"
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const payCustomAmount =
    async (booking) => {
      const amount = prompt(
        "Enter Amount Paid"
      );

      if (
        !amount ||
        Number(amount) <= 0
      )
        return;

      try {
        const paid =
          Number(amount);

        const totalAmount =
          booking.totalAmount ||
          700;

        const existingPaid =
          booking.paidAmount ||
          0;

        const newPaidAmount =
          existingPaid + paid;

        const remainingAmount =
          Math.max(
            totalAmount -
              newPaidAmount,
            0
          );

        await updateDoc(
          doc(
            db,
            "bookings",
            booking.id
          ),
          {
            paidAmount:
              newPaidAmount,

            remainingAmount:
              remainingAmount,

            paymentStatus:
              remainingAmount === 0
                ? "paid"
                : "partial",

            paymentMethod:
              "Partial",

            paymentDate:
              new Date(),
          }
        );

        loadBookings(
          localStorage.getItem(
            "ownerId"
          )
        );
      } catch (error) {
        console.log(error);
      }
    };

  const scanNearbyLabours = () => {
    alert(
      "Scanning nearby labour..."
    );
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
        calculateAmount={
          calculateAmount
        }
        openPhonePe={
          openPhonePe
        }
        payCash={payCash}
        payCustomAmount={
          payCustomAmount
        }
      />
    </div>
  );
}
