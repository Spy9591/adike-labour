"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

import { db } from "../../firebase";

import DashboardHeader from "./DashboardHeader";
import StatsCards from "./StatsCards";
import AvailableLabours from "./AvailableLabours";
import RunningJobs from "./RunningJobs";
import CompletedJobs from "./CompletedJobs";
import CancelledJobs from "./CancelledJobs";
import LoadingScreen from "./LoadingScreen";

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

  useEffect(() => {
    loadOwner();
  }, []);

  const logout = () => {
    localStorage.removeItem("ownerId");
    router.replace("/login");
  };

  const loadOwner = async () => {
    const ownerId =
      localStorage.getItem("ownerId");

    if (!ownerId) {
      router.replace("/login");
      return;
    }

    setOwner({
      id: ownerId,
      name: "Farm Owner",
    });

    loadAvailableLabours();
    loadBookings(ownerId);
  };

  const loadAvailableLabours = async () => {
    try {
      const snapshot = await getDocs(
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
          completed.push(
            booking
          );
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

          paidAmount: 0,

          remainingAmount:
            700,

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

      alert(
        "Failed to create booking"
      );
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
          extraMinutes /
            30
        );

      amount +=
        blocks * 50;
    }

    return Math.round(
      amount
    );
  };

  const payFullAmount =
    async (booking) => {
      try {
        const amount =
          booking.remainingAmount ||
          booking.totalAmount ||
          700;

        const upiUrl =
          `upi://pay?pa=test@upi&pn=${booking.labourName}&am=${amount}&cu=INR`;

        window.location.href =
          upiUrl;

        await updateDoc(
          doc(
            db,
            "bookings",
            booking.id
          ),
          {
            paymentStatus:
              "paid",

            paidAmount:
              booking.totalAmount ||
              700,

            remainingAmount: 0,

            paymentMethod:
              "UPI",

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

  const payCash = async (
    booking
  ) => {
    try {
      const amount =
        booking.totalAmount ||
        700;

      await updateDoc(
        doc(
          db,
          "bookings",
          booking.id
        ),
        {
          paymentStatus:
            "paid",

          paidAmount:
            amount,

          remainingAmount:
            0,

          paymentMethod:
            "Cash",

          paymentDate:
            new Date(),
        }
      );

      alert(
        "Cash Payment Recorded"
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
        "Enter Amount"
      );

      if (
        !amount ||
        Number(amount) <= 0
      )
        return;

      try {
        const paid =
          Number(amount);

        const total =
          booking.totalAmount ||
          700;

        const existing =
          booking.paidAmount ||
          0;

        const newPaid =
          existing + paid;

        const remaining =
          Math.max(
            total - newPaid,
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
              newPaid,

            remainingAmount:
              remaining,

            paymentStatus:
              remaining === 0
                ? "paid"
                : "partial",

            paymentMethod:
              "Custom",

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
      />

      <AvailableLabours
        labours={
          availableLabours
        }
        bookLabour={
          bookLabour
        }
      />

      <RunningJobs
        jobs={runningJobs}
        calculateAmount={
          calculateAmount
        }
      />

      <CompletedJobs
        jobs={completedJobs}
        payFullAmount={
          payFullAmount
        }
        payCash={payCash}
        payCustomAmount={
          payCustomAmount
        }
      />

      <CancelledJobs
        jobs={cancelledJobs}
      />
    </div>
  );
}
