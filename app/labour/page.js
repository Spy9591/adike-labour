"use client";

import { useState } from "react";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { db } from "../firebase";

export default function LabourPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [village, setVillage] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [govtId, setGovtId] = useState("");
  const [photo, setPhoto] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check if account exists
      const q = query(
        collection(db, "labours"),
        where("phone", "==", phone)
      );

      const existingUser = await getDocs(q);

      if (!existingUser.empty) {
        alert("⚠️ Account already exists. Please Login.");
        return;
      }

      // Mandatory validations
      if (!govtId) {
        alert("Government ID is mandatory");
        return;
      }

      if (!photo) {
        alert("Photo is mandatory");
        return;
      }

      await addDoc(collection(db, "labours"), {
        name,
        phone,
        village,
        location,
        experience,
        govtId,
        photoName: photo.name,
        onDuty: false,
        createdAt: new Date(),
      });

      alert("✅ Labour Registration Saved Successfully");

      setName("");
      setPhone("");
      setVillage("");
      setLocation("");
      setExperience("");
      setGovtId("");
      setPhoto(null);

      // Future dashboard redirect
      // window.location.href = "/labour/dashboard";

    } catch (error) {
      console.error(error);
      alert("❌ Failed to Save Data");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0f172a,#14532d,#064e3b)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: "650px",
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(15px)",
          padding: "30px",
          borderRadius: "25px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
          color: "white",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#22c55e",
            marginBottom: "25px",
          }}
        >
          👷 ಕಾರ್ಮಿಕರ ನೋಂದಣಿ
        </h1>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={inputStyle}
        />

        <input
          type="tel"
          placeholder="Phone Number"
          pattern="[0-9]{10}"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Village"
          value={village}
          onChange={(e) => setVillage(e.target.value)}
          required
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          style={inputStyle}
        />

        <input
          type="number"
          placeholder="Experience (Years)"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          required
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Government ID Number"
          value={govtId}
          onChange={(e) => setGovtId(e.target.value)}
          required
          style={inputStyle}
        />

        <input
          type="file"
          accept="image/*"
          required
          onChange={(e) => setPhoto(e.target.files[0])}
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>
          ✅ Register Labour
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  margin: "10px 0",
  borderRadius: "10px",
  border: "none",
};

const buttonStyle = {
  width: "100%",
  padding: "15px",
  background: "#22c55e",
  border: "none",
  borderRadius: "12px",
  color: "white",
  fontSize: "18px",
  cursor: "pointer",
  marginTop: "15px",
};
