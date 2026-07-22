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

import { db } from "@/firebase";

import DashboardHeader from "./DashboardHeader";
import StatsCards from "./StatsCards";
import BookingRequests from "./BookingRequests";
import RunningJob from "./RunningJob";
import PendingPayments from "./PendingPayments";
import OrderHistory from "./OrderHistory";

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
    loadData();
  }, []);

  const playNotificationSound =
    () => {
      try {
        const audio = new Audio(
          "/mixkit-bell-notification-933.wav"
        );

        audio.play();
      } catch (error) {
        console.log(error);
      }
    };

  const loadData = async () => {
    try {
      const labourId =
        localStorage.getItem(
          "labourId"
        );

      if (!labourId) return;

      const labourRef = doc(
        db,
        "labours",
        labourId
      );

      const labourSnap =
        await getDoc(labourRef);

      if (!labourSnap.exists())
        return;

      const labourData = {
        id: labourSnap.id,
        ...labourSnap.data(),
      };

      setLabour(labourData);

      await loadBookings(
        labourId
      );

      await loadPendingPayments(
        labourId
      );

      await loadOrders(
        labourId
      );

      await loadRunningBooking(
        labourId
      );
    } catch (error) {
      console.log(error);
    }
  };

  const loadBookings =
    async (labourId) => {
      const q = query(
        collection(db, "bookings"),
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

      const snapshot =
        await getDocs(q);

      const list = [];

      snapshot.forEach((doc) => {
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

  const loadRunningBooking =
    async (labourId) => {
      const q = query(
        collection(db, "bookings"),
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

      const snapshot =
        await getDocs(q);

      if (!snapshot.empty) {
        setRunningBooking({
          id:
            snapshot.docs[0].id,
          ...snapshot.docs[0].data(),
        });
      } else {
        setRunningBooking(
          null
        );
      }
    };

  const loadPendingPayments =
    async (labourId) => {
      const q = query(
        collection(db, "bookings"),
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

      const snapshot =
        await getDocs(q);

      const list = [];

      snapshot.forEach((doc) => {
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

      setPendingPayments(
        list
      );
    };

  const loadOrders =
    async (labourId) => {
      const q = query(
        collection(db, "bookings"),
        where(
          "labourId",
          "==",
          labourId
        )
      );

      const snapshot =
        await getDocs(q);

      const list = [];

      let earnings = 0;

      snapshot.forEach((doc) => {
        const data =
          doc.data();

        list.push({
          id: doc.id,
          ...data,
        });

        if (
          data.paymentStatus ===
          "paid"
        ) {
          earnings +=
            data.receivedAmount ||
            0;
        }
      });

      setOrders(list);
      setMonthlyEarnings(
        earnings
      );
    };

  const toggleDuty =
    async () => {
      try {
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

        loadData();
      } catch (error) {
        console.log(error);
      }
    };

  const acceptBooking =
    async (bookingId) => {
      try {
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
            status:
              "accepted",
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

        loadData();
      } catch (error) {
        console.log(error);
      }
    };

  const rejectBooking =
    async (bookingId) => {
      try {
        await updateDoc(
          doc(
            db,
            "bookings",
            bookingId
          ),
          {
            status:
              "rejected",
          }
        );

        loadData();
      } catch (error) {
        console.log(error);
      }
    };

  const completeWork =
    async () => {
      try {
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
              "completed",

            paymentStatus:
              "pending",

            totalAmount:
              runningBooking.totalAmount ||
              700,

            remainingAmount:
              runningBooking.totalAmount ||
              700,

            receivedAmount: 0,
          }
        );

        loadData();
      } catch (error) {
        console.log(error);
      }
    };

  const cancelOrder =
    async () => {
      try {
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

        loadData();
      } catch (error) {
        console.log(error);
      }
    };

  const receivePayment =
    async (payment) => {
      try {
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
          }
        );

        loadData();
      } catch (error) {
        console.log(error);
      }
    };

  const markReady =
    async () => {
      try {
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

        alert(
          "✅ Busy Status Removed"
        );

        loadData();
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

  if (!labour) {
    return (
      <div
        style={{
          padding: "40px",
          color: "white",
        }}
      >
        Loading...
      </div>
    );
  }

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
          (sum, item) =>
            sum +
            (item.remainingAmount ||
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