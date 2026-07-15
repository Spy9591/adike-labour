"use client";

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore";

import { db } from "../../firebase";

export default function OwnerDashboard() {
  const [labours, setLabours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOwnerLocation();
  }, []);

  const getOwnerLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        loadLabours(
          position.coords.latitude,
          position.coords.longitude
        );
      },
      () => {
        alert("Please enable location services");
        setLoading(false);
      }
    );
  };

  const calculateDistance = (
    lat1,
    lon1,
    lat2,
    lon2
  ) => {
    const R = 6371;

    const dLat =
      ((lat2 - lat1) * Math.PI) / 180;

    const dLon =
      ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) *
        Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c =
      2 *
      Math.atan2(
        Math.sqrt(a),
        Math.sqrt(1 - a)
      );

    return (R * c).toFixed(1);
  };

  const loadLabours = async (
    ownerLat,
    ownerLng
  ) => {
    try {
      const snapshot = await getDocs(
        collection(db, "labours")
      );

      const labourList = [];

      snapshot.forEach((doc) => {
        const data = doc.data();

        if (data.onDuty === true) {
          labourList.push({
            id: doc.id,
            ...data,
            distance:
              data.latitude &&
              data.longitude
                ? calculateDistance(
                    ownerLat,
                    ownerLng,
                    data.latitude,
                    data.longitude
                  )
                : "N/A",
          });
        }
      });

      labourList.sort(
        (a, b) =>
          parseFloat(a.distance) -
          parseFloat(b.distance)
      );

      setLabours(labourList);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
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
          labourId: labour.id,
          labourName: labour.name,

          ownerName:
            "Farm Owner",

          status: "pending",

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
        "Failed To Create Booking"
      );
    }
  };

  const pageStyle = {
    minHeight: "100vh",
    padding: "20px",
    background:
      "linear-gradient(135deg,#0f172a,#1e3a8a,#2563eb)",
  };

  const heroCard = {
    background:
      "rgba(255,255,255,.08)",
    backdropFilter: "blur(25px)",
    borderRadius: "25px",
    padding: "30px",
    color: "white",
    marginBottom: "20px",
  };

  const labourCard = {
    background:
      "rgba(255,255,255,.08)",
    backdropFilter: "blur(20px)",
    borderRadius: "20px",
    padding: "20px",
    color: "white",
    marginBottom: "15px",
  };

  const buttonStyle = {
    padding: "12px 18px",
    border: "none",
    borderRadius: "12px",
    background:
      "linear-gradient(90deg,#22c55e,#16a34a)",
    color: "white",
    cursor: "pointer",
    marginTop: "10px",
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#0f172a",
          color: "white",
          fontSize: "20px",
        }}
      >
        Loading Labour Details...
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <div style={heroCard}>
        <h1>
          🏡 Owner Dashboard
        </h1>

        <p>
          Available Labour:
          {" "}
          {labours.length}
        </p>

        <p>
          Showing ON DUTY labour only
        </p>
      </div>

      {labours.length === 0 && (
        <div style={labourCard}>
          <h2>
            No Labour Currently On Duty
          </h2>
        </div>
      )}

      {labours.map((labour) => (
        <div
          key={labour.id}
          style={labourCard}
        >
          <h2>
            👷 {labour.name}
          </h2>

          <p>
            ⭐ Rating:
            {" "}
            {labour.rating || 5}
          </p>

          <p>
            📍 Village:
            {" "}
            {labour.village}
          </p>

          <p>
            📌 Location:
            {" "}
            {labour.location}
          </p>

          <p>
            🚲 Vehicle:
            {" "}
            {labour.hasBike
              ? "Bike Available"
              : "No Bike"}
          </p>

          <p>
            📏 Distance:
            {" "}
            {labour.distance}
            {" "}
            KM
          </p>

          <p>
            💼 Experience:
            {" "}
            {labour.experience}
          </p>

          <button
            style={buttonStyle}
            onClick={() =>
              bookLabour(
                labour
              )
            }
          >
            Book Labour
          </button>
        </div>
      ))}
    </div>
  );
}
