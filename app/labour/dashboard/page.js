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
import PaymentCard from "./PaymentCard";
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

  const [completedPayments, setCompletedPayments] =
    useState([]);

  const [orders, setOrders] =
    useState([]);

  const [monthlyEarnings, setMonthlyEarnings] =
    useState(0);

  const [notifications, setNotifications] =
    useState([]);

  const [
    showNotifications,
    setShowNotifications,
  ] = useState(false);

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

      const labourSnap =
        await getDoc(
          doc(
            db,
            "labours",
            labourId
          )
        );

      if (!labourSnap.exists())
        return;

      setLabour({
        id: labourSnap.id,
        ...labourSnap.data(),
      });

      await loadBookings(
        labourId
      );

      await loadRunningBooking(
        labourId
      );

      await loadPendingPayments(
        labourId
      );

      await loadOrders(
        labourId
      );

    } catch (error) {
      console.log(error);
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

      const snapshot =
        await getDocs(q);

      const list = [];

      snapshot.forEach(
        (item) => {
          list.push({
            id: item.id,
            ...item.data(),
          });
        }
      );

      setBookings(list);
    };

  const loadRunningBooking =
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

      const snapshot =
        await getDocs(q);

      let activeJob = null;

      snapshot.forEach(
        (item) => {

          const data = {
            id: item.id,
            ...item.data(),
          };

          if (
            data.status ===
            "accepted"
          ) {
            activeJob = data;
          }
        }
      );

      setRunningBooking(
        activeJob
      );
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
        )
      );

      const snapshot =
        await getDocs(q);

      const pending = [];
      const completed = [];

      snapshot.forEach(
        (item) => {

          const data = {
            id: item.id,
            ...item.data(),
          };

          if (
            data.status ===
              "workCompleted" &&
            (data.remainingAmount ||
              0) > 0
          ) {
            pending.push(data);
          }

          if (
            data.status ===
              "completed" &&
            (data.remainingAmount ||
              0) === 0
          ) {
            completed.push(data);
          }
        }
      );

      setPendingPayments(
        pending
      );

      setCompletedPayments(
        completed
      );
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

      const snapshot =
        await getDocs(q);

      const list = [];

      let earnings = 0;

      snapshot.forEach(
        (item) => {

          const data =
            item.data();

          list.push({
            id: item.id,
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
        }
      );

      setOrders(list);

      setMonthlyEarnings(
        earnings
      );
    };

  const toggleDuty =
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
          onDuty:
            !labour.onDuty,
        }
      );

      loadData();
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
          status:
            "rejected",
        }
      );

      loadData();
    };

  const completeWork =
    async () => {

      if (!runningBooking)
        return;

      const amount =
        runningBooking.totalAmount ||
        700;

      await updateDoc(
        doc(
          db,
          "bookings",
          runningBooking.id
        ),
        {
          status:
            "workCompleted",

          totalAmount:
            amount,

          receivedAmount:
            runningBooking.receivedAmount ||
            0,

          remainingAmount:
            runningBooking.remainingAmount ||
            amount,

          completedDate:
            new Date().toLocaleDateString(),

          completedTime:
            new Date().toLocaleTimeString(),

          completedTimestamp:
            Date.now(),
        }
      );

      loadData();
    };

  const acceptPayment =
    async (payment) => {

      const currentPaid =
        payment.receivedAmount ||
        0;

      const amountSent =
        payment.requestedPaymentAmount ||
        0;

      const totalAmount =
        payment.totalAmount || 0;

      const updatedPaid =
        currentPaid +
        amountSent;

      const updatedDue =
        Math.max(
          totalAmount -
            updatedPaid,
          0
        );

      await updateDoc(
        doc(
          db,
          "bookings",
          payment.id
        ),
        {
          receivedAmount:
            updatedPaid,

          remainingAmount:
            updatedDue,

          paymentStatus:
            updatedDue === 0
              ? "paid"
              : "approved",

          status:
            updatedDue === 0
              ? "completed"
              : "workCompleted",

          paymentApprovedDate:
            new Date().toLocaleDateString(),

          paymentApprovedTime:
            new Date().toLocaleTimeString(),

          paymentApprovedTimestamp:
            Date.now(),
        }
      );

      loadData();
    };

  const rejectPayment =
    async (payment) => {

      await updateDoc(
        doc(
          db,
          "bookings",
          payment.id
        ),
        {
          paymentStatus:
            "rejected",
        }
      );

      loadData();
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

      loadData();
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
          currentBooking:
            null,
        }
      );

      loadData();
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
          color: "white",
          padding: "40px",
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
        notifications={notifications}
        showNotifications={
          showNotifications
        }
        setShowNotifications={
          setShowNotifications
        }
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
        markReady={
          markReady
        }
      />

      <PendingPayments
        payments={
          pendingPayments
        }
        acceptPayment={
          acceptPayment
        }
        rejectPayment={
          rejectPayment
        }
      />

      <PaymentCard
        completedPayments={
          completedPayments
        }
      />

      <OrderHistory
        orders={orders}
      />

    </div>
  );
}