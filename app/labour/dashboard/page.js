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
            onDuty:
              !labour.onDuty,

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

      alert(
        "Booking Accepted"
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

      alert(
        "Booking Rejected"
      );

      loadLabour();
    };

  const completeWork =
    async () => {
      if (!runningBooking) return;

      const labourId =
        localStorage.getItem(
          "labourId"
        );

      await updateDoc(
        doc(
          db,
          "bookings",
          runningBooking.id
        ),
        {
          status: "completed",
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
            (labour.completedJobs ||
              0) + 1,

          walletBalance:
            (labour.walletBalance ||
              0) + 700,
        }
      );

      alert(
        "Work Completed Successfully"
      );

      loadLabour();
    };

  if (!labour)
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#020617",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Loading Dashboard...
      </div>
    );

  const pageStyle = {
    minHeight: "100vh",
    padding: "20px",
    background:
      "linear-gradient(135deg,#020617,#0f172a,#064e3b)",
  };

  const heroStyle = {
    background:
      "rgba(255,255,255,.08)",
    backdropFilter: "blur(25px)",
    padding: "30px",
    borderRadius: "30px",
    color: "white",
    marginBottom: "20px",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "15px",
  };

  const glassCard = {
    background:
      "rgba(255,255,255,.08)",
    backdropFilter: "blur(20px)",
    borderRadius: "20px",
    padding: "20px",
    color: "white",
  };

  return (
    <div style={pageStyle}>
      <div style={heroStyle}>
        <h1>
          👷 {labour.name}
        </h1>

        <p>
          ⭐ {labour.rating}
        </p>

        <p>
          📍 {labour.village}
        </p>

        <p>
          {labour.busy
            ? "🟠 BUSY"
            : labour.onDuty
            ? "🟢 ON DUTY"
            : "🔴 OFF DUTY"}
        </p>
      </div>

      <div style={gridStyle}>
        <div style={glassCard}>
          <h3>💰 Wallet</h3>
          <h1>
            ₹
            {labour.walletBalance ||
              0}
          </h1>
        </div>

        <div style={glassCard}>
          <h3>📋 Jobs</h3>
          <h1>
            {labour.completedJobs ||
              0}
          </h1>
        </div>

        <div style={glassCard}>
          <h3>⭐ Rating</h3>
          <h1>
            {labour.rating || 5}
          </h1>
        </div>

        <div style={glassCard}>
          <h3>🚲 Vehicle</h3>
          <h1>
            {labour.hasBike
              ? "Bike"
              : "No Bike"}
          </h1>
        </div>
      </div>

      <button
        onClick={toggleDuty}
        style={{
          width: "100%",
          padding: "18px",
          marginTop: "20px",
          border: "none",
          borderRadius: "18px",
          color: "white",
          fontSize: "18px",
          cursor: "pointer",
          background:
            labour.onDuty
              ? "linear-gradient(90deg,#ef4444,#dc2626)"
              : "linear-gradient(90deg,#22c55e,#16a34a)",
        }}
      >
        {labour.onDuty
          ? "🔴 GO OFF DUTY"
          : "🟢 GO ON DUTY"}
      </button>

      <div
        style={{
          ...glassCard,
          marginTop: "20px",
        }}
      >
        <h2>
          🔔 Booking Requests
        </h2>

        {bookings.length ===
        0 ? (
          <p>
            No Active Requests
          </p>
        ) : (
          bookings.map(
            (booking) => (
              <div
                key={
                  booking.id
                }
                style={{
                  marginTop:
                    "15px",
                }}
              >
                <p>
                  Owner:
                  {" "}
                  {
                    booking.ownerName
                  }
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
                    marginLeft:
                      "10px",
                  }}
                >
                  ❌ Reject
                </button>
              </div>
            )
          )
        )}
      </div>

      {runningBooking && (
        <div
          style={{
            ...glassCard,
            marginTop: "20px",
          }}
        >
          <h2>
            🟠 Running Job
          </h2>

          <p>
            Owner:
            {" "}
            {
              runningBooking.ownerName
            }
          </p>

          <p>
            Status:
            {" "}
            {
              runningBooking.status
            }
          </p>

          <p>
            Payment:
            ₹700
          </p>

          <button
            onClick={
              completeWork
            }
          >
            ✅ Complete Work
          </button>
        </div>
      )}

      <div
        style={{
          ...glassCard,
          marginTop: "20px",
        }}
      >
        <h2>
          📋 Work History
        </h2>

        <p>
          Completed Jobs:
          {" "}
          {labour.completedJobs ||
            0}
        </p>
      </div>
    </div>
  );
}
