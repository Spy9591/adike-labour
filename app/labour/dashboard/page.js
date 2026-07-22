"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  doc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { db } from "../../firebase";

import DashboardHeader from "./DashboardHeader";
import StatsCards from "./StatsCards";
import BookingRequests from "./BookingRequests";
import RunningJob from "./RunningJob";
import PendingPayments from "./PendingPayments";
import OrderHistory from "./OrderHistory";
import LoadingScreen from "./LoadingScreen";

import "./dashboard.css";

export default function Dashboard() {
  const router = useRouter();

  const [labour, setLabour] =
    useState(null);

  const [bookings, setBookings] =
    useState([]);

  const [runningBooking, setRunningBooking] =
    useState(null);

  const [pendingPayments, setPendingPayments] =
    useState([]);

  const [orders, setOrders] =
    useState([]);

  const [monthlyEarnings, setMonthlyEarnings] =
    useState(0);

  useEffect(() => {
    loadLabour();
  }, []);

  const playNotificationSound =
    () => {
      try {
        const audio =
          new Audio(
            "/mixkit-bell-notification-933.wav"
          );

        audio.play();
      } catch (error) {
        console.log(error);
      }
    };

  const logout = () => {
    localStorage.removeItem(
      "labourId"
    );

    router.replace("/");
  };

  const loadLabour = async () => {
    const labourId =
      localStorage.getItem(
        "labourId"
      );

    if (!labourId) return;

    const snap =
      await getDoc(
        doc(
          db,
          "labours",
          labourId
        )
      );

    if (snap.exists()) {
      setLabour({
        id: snap.id,
        ...snap.data(),
      });

      loadBookings(labourId);
      loadRunning(labourId);
      loadPendingPayments(
        labourId
      );
      loadOrders(labourId);
      loadMonthlyEarnings(
        labourId
      );
    }
  };

  const loadBookings =
    async (labourId) => {
      const q = query(
        collection(
          db,
          "bookings"
        ),
        where(
          "labourId",
          "==",
          labourId
        ),
        where(
          "status",
          "==",
          "pending"
        )
      );

      const snap =
        await getDocs(q);

      const list = [];

      snap.forEach((doc) => {
        list.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      if (
        list.length >
        bookings.length
      ) {
        playNotificationSound();
      }

      setBookings(list);
    };

  const loadRunning =
    async (labourId) => {
      const q = query(
        collection(
          db,
          "bookings"
        ),
        where(
          "labourId",
          "==",
          labourId
        ),
        where(
          "status",
          "==",
          "accepted"
        )
      );

      const snap =
        await getDocs(q);

      if (!snap.empty) {
        setRunningBooking({
          id: snap.docs[0].id,
          ...snap.docs[0].data(),
        });
      } else {
        setRunningBooking(null);
      }
    };

  const loadPendingPayments =
    async (labourId) => {
      const q = query(
        collection(
          db,
          "bookings"
        ),
        where(
          "labourId",
          "==",
          labourId
        ),
        where(
          "paymentStatus",
          "==",
          "pending"
        )
      );

      const snap =
        await getDocs(q);

      const list = [];

      snap.forEach((doc) => {
        list.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      if (
        list.length >
        pendingPayments.length
      ) {
        playNotificationSound();
      }

      setPendingPayments(list);
    };

  const loadOrders =
    async (labourId) => {
      const q = query(
        collection(
          db,
          "bookings"
        ),
        where(
          "labourId",
          "==",
          labourId
        )
      );

      const snap =
        await getDocs(q);

      const list = [];

      snap.forEach((item) => {
        const data =
          item.data();

        if (
          data.status ===
            "completed" ||
          data.status ===
            "cancelled"
        ) {
          list.push({
            id: item.id,
            ...data,
          });
        }
      });

      setOrders(list);
    };

  const loadMonthlyEarnings =
    async (labourId) => {
      const q = query(
        collection(
          db,
          "bookings"
        ),
        where(
          "labourId",
          "==",
          labourId
        ),
        where(
          "paymentStatus",
          "==",
          "paid"
        )
      );

      const snap =
        await getDocs(q);

      let total = 0;

      snap.forEach((item) => {
        total +=
          item.data()
            .receivedAmount ||
          0;
      });

      setMonthlyEarnings(total);
    };

  const toggleDuty = async () => {
    const labourId =
      localStorage.getItem(
        "labourId"
      );

    await updateDoc(
      doc(
        db,
        "labours",
        labourId
      ),
      {
        onDuty:
          !labour.onDuty,
      }
    );

    loadLabour();
  };

  const acceptBooking =
    async (bookingId) => {
      const labourId =
        localStorage.getItem(
          "labourId"
        );

      await updateDoc(
        doc(
          db,
          "bookings",
          bookingId
        ),
        {
          status: "accepted",
          startTime:
            new Date(),
        }
      );

      await updateDoc(
        doc(
          db,
          "labours",
          labourId
        ),
        {
          busy: true,
          currentBooking:
            bookingId,
        }
      );

      loadLabour();
    };

  const rejectBooking =
    async (bookingId) => {
      await updateDoc(
        doc(
          db,
          "bookings",
          bookingId
        ),
        {
          status: "rejected",
        }
      );

      loadLabour();
    };

  const completeWork =
    async () => {
      if (!runningBooking)
        return;

      await updateDoc(
        doc(
          db,
          "bookings",
          runningBooking.id
        ),
        {
          status: "completed",
          paymentStatus:
            "pending",
          totalAmount:
            runningBooking.totalAmount ||
            700,
          receivedAmount: 0,
          remainingAmount:
            runningBooking.totalAmount ||
            700,
          completedAt:
            new Date(),
        }
      );

      loadLabour();
    };

  const receivePayment =
    async (payment) => {
      await updateDoc(
        doc(
          db,
          "bookings",
          payment.id
        ),
        {
          paymentStatus:
            "paid",
          paymentReceived:
            true,
          receivedAmount:
            payment.remainingAmount,
          remainingAmount: 0,
          paymentDate:
            new Date(),
        }
      );

      loadLabour();
    };

  const markReady =
    async () => {
      const labourId =
        localStorage.getItem(
          "labourId"
        );

      await updateDoc(
        doc(
          db,
          "labours",
          labourId
        ),
        {
          busy: false,
          onDuty: true,
          currentBooking:
            null,
        }
      );

      loadLabour();
    };

  const cancelOrder =
    async () => {
      if (!runningBooking)
        return;

      await updateDoc(
        doc(
          db,
          "bookings",
          runningBooking.id
        ),
        {
          status:
            "cancelled",
        }
      );

      loadLabour();
    };

  if (!labour)
    return <LoadingScreen />;

  return (
    <div className="dashboard">

      <DashboardHeader
        labour={labour}
        toggleDuty={toggleDuty}
        logout={logout}
      />

      <StatsCards
        labour={{
          ...labour,
          monthlyEarnings,
        }}
        pendingAmount={pendingPayments.reduce(
          (a, b) =>
            a +
            (b.remainingAmount ||
              0),
          0
        )}
      />

      <BookingRequests
        bookings={bookings}
        acceptBooking={
          acceptBooking
        }
        rejectBooking={
          rejectBooking
        }
      />

      <RunningJob
        runningBooking={
          runningBooking
        }
        completeWork={
          completeWork
        }
        cancelOrder={
          cancelOrder
        }
        markReady={markReady}
      />

      <PendingPayments
        payments={
          pendingPayments
        }
        receivePayment={
          receivePayment
        }
      />

      <OrderHistory
        orders={orders}
      />

    </div>
  );
}