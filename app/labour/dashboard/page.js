"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../../firebase";

export default function Dashboard() {
  const [labour, setLabour] =
    useState(null);

  useEffect(() => {
    loadLabour();
  }, []);

  const loadLabour = async () => {
    const labourId =
      localStorage.getItem(
        "labourId"
      );

    if (!labourId) return;

    const snap = await getDoc(
      doc(db, "labours", labourId)
    );

    if (snap.exists()) {
      setLabour({
        id: snap.id,
        ...snap.data(),
      });
    }
  };

  const toggleDuty = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const labourId =
          localStorage.getItem(
            "labourId"
          );

        const newStatus =
          !labour.onDuty;

        await updateDoc(
          doc(
            db,
            "labours",
            labourId
          ),
          {
            onDuty: newStatus,

            latitude:
              position.coords
                .latitude,

            longitude:
              position.coords
                .longitude,
          }
        );

        loadLabour();
      },
      () =>
        alert(
          "Turn ON location services"
        )
    );
  };

  if (!labour)
    return <h2>Loading...</h2>;

  return (
    <div className="page">

      <h1>
        👷 {labour.name}
      </h1>

      <div className="glass">
        ⭐ {labour.rating}
      </div>

      <div className="glass">
        💰 ₹
        {labour.walletBalance}
      </div>

      <div className="glass">
        📋 Jobs :
        {" "}
        {labour.completedJobs}
      </div>

      <div className="glass">
        🚲
        {" "}
        {labour.hasBike
          ? "Bike Available"
          : "No Bike"}
      </div>

      <button
        onClick={toggleDuty}
        style={{
          background:
            labour.onDuty
              ? "#dc2626"
              : "#16a34a",

          color: "white",

          padding: "16px",

          border: "none",

          borderRadius: "12px",
        }}
      >
        {labour.onDuty
          ? "🔴 GO OFF DUTY"
          : "🟢 GO ON DUTY"}
      </button>

    </div>
  );
}
