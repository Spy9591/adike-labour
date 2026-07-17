"use client";

import { useEffect, useState } from "react";
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

export default function Dashboard() {
  const [labour, setLabour] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [runningBooking, setRunningBooking] =
    useState(null);
  const [awaitingPayment, setAwaitingPayment] =
    useState(false);

  useEffect(() => {
    loadLabour();
  }, []);

  const loadRunningBooking = async (
    labourId
  ) => {
    const q = query(
      collection(db, "bookings"),
      where("labourId", "==", labourId),
      where("status", "==", "accepted")
    );

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      setRunningBooking({
        id: snapshot.docs[0].id,
        ...snapshot.docs[0].data(),
      });
    } else {
      setRunningBooking(null);
    }
  };

  const loadBookings = async (
    labourId
  ) => {
    const q = query(
      collection(db, "bookings"),
      where("labourId", "==", labourId),
      where("status", "==", "pending")
    );

    const snapshot = await getDocs(q);

    const requests = [];

    snapshot.forEach((docItem) => {
      requests.push({
        id: docItem.id,
        ...docItem.data(),
      });
    });

    setBookings(requests);
  };

  const loadLabour = async () => {
    const labourId =
      localStorage.getItem("labourId");

    if (!labourId) return;

    const snap = await getDoc(
      doc(db, "labours", labourId)
    );

    if (snap.exists()) {
      setLabour({
        id: snap.id,
        ...snap.data(),
      });

      loadBookings(labourId);
      loadRunningBooking(labourId);
    }
  };

  const toggleDuty = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
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
            onDuty: !labour.onDuty,
            latitude:
              position.coords.latitude,
            longitude:
              position.coords.longitude,
          }
        );

        loadLabour();
      },
      () =>
        alert(
          "Please Enable Location Services"
        )
    );
  };

  const acceptBooking = async (
    bookingId
  ) => {
    const labourId =
      localStorage.getItem("labourId");

    await updateDoc(
      doc(
        db,
        "bookings",
        bookingId
      ),
      {
        status: "accepted",
        startTime: new Date(),
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
        currentBooking: bookingId,
      }
    );

    alert("Booking Accepted");

    loadLabour();
  };

  const rejectBooking = async (
    bookingId
  ) => {
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

    alert("Booking Rejected");

    loadLabour();
  };

  const cancelOrder = async () => {
    if (!runningBooking) return;

    const labourId =
      localStorage.getItem("labourId");

    await updateDoc(
      doc(
        db,
        "bookings",
        runningBooking.id
      ),
      {
        status: "cancelled",
      }
    );

    await updateDoc(
      doc(
        db,
        "labours",
        labourId
      ),
      {
        busy: false,
        currentBooking: null,
      }
    );

    alert("Order Cancelled");

    loadLabour();
  };

  const completeWork = async () => {
    if (!runningBooking) return;

    const labourId =
      localStorage.getItem("labourId");

    await updateDoc(
      doc(
        db,
        "bookings",
        runningBooking.id
      ),
      {
        status: "completed",
        paymentStatus: "pending",
        amount: 700,
      }
    );

    await updateDoc(
      doc(
        db,
        "labours",
        labourId
      ),
      {
        busy: false,
        currentBooking: null,
        completedJobs:
          (labour.completedJobs || 0) + 1,
      }
    );

    setAwaitingPayment(true);

    alert(
      "Work Completed Successfully!\nAmount Payable ₹700"
    );

    loadLabour();
  };

  const openPhonePe = () => {
    window.location.href =
      "phonepe://";
  };

  const paymentReceived = async () => {
    const labourId =
      localStorage.getItem("labourId");

    await updateDoc(
      doc(
        db,
        "labours",
        labourId
      ),
      {
        walletBalance:
          (labour.walletBalance || 0) +
          700,
      }
    );

    setAwaitingPayment(false);

    alert(
      "Payment Received Successfully"
    );

    loadLabour();
  };

  // MODERN LOADING UI

  if (!labour) {
    return (
      <>
        <div
          style={{
            minHeight: "100vh",
            padding: "20px",
            background:
              "linear-gradient(135deg,#020617,#0f172a,#064e3b)",
          }}
        >
          <div
            style={{
              height: "180px",
              borderRadius: "30px",
              marginBottom: "20px",
              background:
                "linear-gradient(90deg,#1e293b 25%,#334155 50%,#1e293b 75%)",
              backgroundSize:
                "200% 100%",
              animation:
                "shimmer 1.5s infinite linear",
            }}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(180px,1fr))",
              gap: "15px",
              marginBottom: "20px",
            }}
          >
            {[1, 2, 3, 4].map(
              (item) => (
                <div
                  key={item}
                  style={{
                    height: "120px",
                    borderRadius: "20px",
                    background:
                      "linear-gradient(90deg,#1e293b 25%,#334155 50%,#1e293b 75%)",
                    backgroundSize:
                      "200% 100%",
                    animation:
                      "shimmer 1.5s infinite linear",
                  }}
                />
              )
            )}
          </div>
        </div>

        <style jsx>{`
          @keyframes shimmer {
            0% {
              background-position: 200% 0;
            }

            100% {
              background-position: -200% 0;
            }
          }
        `}</style>
      </>
    );
  }

  const glassCard = {
    background:
      "rgba(255,255,255,.08)",
    backdropFilter: "blur(20px)",
    borderRadius: "20px",
    padding: "20px",
    color: "white",
    marginTop: "20px",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "20px",
        background:
          "linear-gradient(135deg,#020617,#0f172a,#064e3b)",
      }}
    >
      <div style={glassCard}>
        <h1>👷 {labour.name}</h1>
        <p>⭐ {labour.rating}</p>
        <p>📍 {labour.village}</p>

        <button onClick={toggleDuty}>
          {labour.onDuty
            ? "🔴 Go Off Duty"
            : "🟢 Go On Duty"}
        </button>
      </div>

      <div style={glassCard}>
        <h2>🔔 Booking Requests</h2>

        {bookings.length === 0 ? (
          <p>No Booking Requests</p>
        ) : (
          bookings.map((booking) => (
            <div
              key={booking.id}
              style={{ marginTop: "15px" }}
            >
              <p>
                Owner:
                {" "}
                {booking.ownerName}
              </p>

              <button
                onClick={() =>
                  acceptBooking(
                    booking.id
                  )
                }
              >
                ✅ Accept
              </button>

              <button
                onClick={() =>
                  rejectBooking(
                    booking.id
                  )
                }
                style={{
                  marginLeft: "10px",
                }}
              >
                ❌ Reject
              </button>
            </div>
          ))
        )}
      </div>

      {runningBooking && (
        <div style={glassCard}>
          <h2>🟠 Running Job</h2>

          <p>
            Owner:
            {" "}
            {
              runningBooking.ownerName
            }
          </p>

          <p>
            Payment: ₹700
          </p>

          <button
            onClick={completeWork}
          >
            ✅ Complete Work
          </button>

          <button
            onClick={cancelOrder}
            style={{
              marginLeft: "10px",
            }}
          >
            ❌ Cancel Order
          </button>
        </div>
      )}

      {awaitingPayment && (
        <div style={glassCard}>
          <h2>
            💰 Payment Collection
          </h2>

          <h3>
            Amount Payable: ₹700
          </h3>

          <p>
            Open PhonePe and show
            your QR code to customer.
          </p>

          <button
            onClick={openPhonePe}
          >
            Open PhonePe
          </button>

          <br />
          <br />

          <button
            onClick={
              paymentReceived
            }
          >
            ✅ Payment Received
          </button>
        </div>
      )}

      <div style={glassCard}>
        <h2>📋 Work History</h2>

        <p>
          Completed Jobs:
          {" "}
          {labour.completedJobs || 0}
        </p>

        <p>
          Wallet Balance: ₹
          {labour.walletBalance || 0}
        </p>
      </div>
    </div>
  );
}
