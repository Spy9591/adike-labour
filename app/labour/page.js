"use client";

import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

export default function LabourPage() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");

  const [verified, setVerified] = useState(false);

  const [name, setName] = useState("");
  const [village, setVillage] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [govtId, setGovtId] = useState("");

  const [hasBike, setHasBike] = useState(false);

  const sendOtp = async () => {
    if (!email) {
      alert("Enter Email");
      return;
    }

    const newOtp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    setGeneratedOtp(newOtp);

    await fetch("/api/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        otp: newOtp,
      }),
    });

    alert("OTP Sent Successfully");
  };

  const verifyOtp = () => {
    if (otp === generatedOtp) {
      setVerified(true);
      alert("OTP Verified");
    } else {
      alert("Invalid OTP");
    }
  };

  const registerLabour = async (e) => {
    e.preventDefault();

    const docRef = await addDoc(
      collection(db, "labours"),
      {
        email,
        phone,
        password,

        name,
        village,
        location,
        experience,
        govtId,

        hasBike,

        rating: 5,
        reviewCount: 0,

        walletBalance: 0,

        completedJobs: 0,

        workHistory: [],

        ownerRequest: null,

        currentBooking: null,

        onDuty: false,

        latitude: null,
        longitude: null,

        createdAt: new Date(),
      }
    );

    localStorage.setItem(
      "labourId",
      docRef.id
    );

    alert("Account Created Successfully");

    window.location.href =
      "/labour/dashboard";
  };

  const pageStyle = {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    background:
      "linear-gradient(135deg,#020617,#0f172a,#064e3b)",
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "850px",
    padding: "40px",
    background: "rgba(255,255,255,.08)",
    backdropFilter: "blur(25px)",
    borderRadius: "30px",
    border: "1px solid rgba(255,255,255,.1)",
    boxShadow:
      "0 25px 80px rgba(0,0,0,.45)",
  };

  const inputStyle = {
    width: "100%",
    padding: "16px",
    marginBottom: "15px",
    borderRadius: "16px",
    border: "none",
    outline: "none",
    background:
      "rgba(255,255,255,.12)",
    color: "white",
  };

  const buttonStyle = {
    width: "100%",
    padding: "16px",
    border: "none",
    borderRadius: "16px",
    background:
      "linear-gradient(90deg,#22c55e,#16a34a)",
    color: "white",
    fontSize: "18px",
    cursor: "pointer",
    marginBottom: "15px",
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>

        <h1
          style={{
            color: "white",
            textAlign: "center",
            marginBottom: 25,
          }}
        >
          👷 Labour Registration
        </h1>

        {!verified && (
          <>
            <input
              style={inputStyle}
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <input
              style={inputStyle}
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
            />

            <input
              style={inputStyle}
              type="password"
              placeholder="Create Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            <button
              style={buttonStyle}
              onClick={sendOtp}
            >
              Send OTP
            </button>

            <input
              style={inputStyle}
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value)
              }
            />

            <button
              style={buttonStyle}
              onClick={verifyOtp}
            >
              Verify OTP
            </button>
          </>
        )}

        {verified && (
          <form onSubmit={registerLabour}>

            <input
              style={inputStyle}
              value={email}
              disabled
            />

            <input
              style={inputStyle}
              value={phone}
              disabled
            />

            <input
              style={inputStyle}
              value={password}
              disabled
              type="password"
            />

            <input
              style={inputStyle}
              placeholder="Full Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
            />

            <input
              style={inputStyle}
              placeholder="Village"
              value={village}
              onChange={(e) =>
                setVillage(e.target.value)
              }
              required
            />

            <input
              style={inputStyle}
              placeholder="Location"
              value={location}
              onChange={(e) =>
                setLocation(e.target.value)
              }
              required
            />

            <input
              style={inputStyle}
              placeholder="Experience"
              value={experience}
              onChange={(e) =>
                setExperience(
                  e.target.value
                )
              }
              required
            />

            <input
              style={inputStyle}
              placeholder="Government ID"
              value={govtId}
              onChange={(e) =>
                setGovtId(e.target.value)
              }
              required
            />

            <select
              style={inputStyle}
              onChange={(e) =>
                setHasBike(
                  e.target.value === "yes"
                )
              }
            >
              <option value="no">
                No Bike
              </option>

              <option value="yes">
                Have Bike
              </option>
            </select>

            <button
              type="submit"
              style={buttonStyle}
            >
              Create Account
            </button>

          </form>
        )}
      </div>
    </div>
  );
}
