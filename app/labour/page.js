"use client";

import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function LabourPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [verified, setVerified] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [village, setVillage] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [govtId, setGovtId] = useState("");
  const [photo, setPhoto] = useState(null);

  const sendOtp = async () => {
    if (!email) {
      alert("Enter Email");
      return;
    }

    const newOtp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    setGeneratedOtp(newOtp);

    const response = await fetch(
      "/api/send-otp",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp: newOtp,
        }),
      }
    );

    if (response.ok) {
      alert("OTP Sent Successfully");
    } else {
      alert("Failed To Send OTP");
    }
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

    if (!photo) {
      alert("Photo is mandatory");
      return;
    }

    try {
      await addDoc(collection(db, "labours"), {
        email,
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

      alert("Registration Successful");

      window.location.href =
        "/labour/dashboard";
    } catch (error) {
      console.error(error);
      alert("Failed To Register");
    }
  };

  return (
    <div className="page">
      <div className="card">

        <h1>
          👷 Labour Registration
        </h1>

        {!verified && (
          <>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <button onClick={sendOtp}>
              Send OTP
            </button>

            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value)
              }
            />

            <button onClick={verifyOtp}>
              Verify OTP
            </button>
          </>
        )}

        {verified && (
          <form onSubmit={registerLabour}>

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
            />

            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              required
            />

            <input
              type="text"
              placeholder="Village"
              value={village}
              onChange={(e) =>
                setVillage(e.target.value)
              }
              required
            />

            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) =>
                setLocation(e.target.value)
              }
              required
            />

            <input
              type="number"
              placeholder="Experience (Years)"
              value={experience}
              onChange={(e) =>
                setExperience(e.target.value)
              }
              required
            />

            <input
              type="text"
              placeholder="Government ID Number"
              value={govtId}
              onChange={(e) =>
                setGovtId(e.target.value)
              }
              required
            />

            <input
              type="file"
              accept="image/*"
              required
              onChange={(e) =>
                setPhoto(e.target.files[0])
              }
            />

            <button type="submit">
              Register Labour
            </button>

          </form>
        )}

      </div>

      <style jsx>{`
        .page {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          background: linear-gradient(
            135deg,
            #0f172a,
            #14532d,
            #064e3b
          );
        }

        .card {
          width: 100%;
          max-width: 700px;
          background: rgba(255,255,255,.08);
          backdrop-filter: blur(20px);
          padding: 35px;
          border-radius: 25px;
          box-shadow:
            0 25px 60px rgba(0,0,0,.45);
        }

        h1 {
          color: #22c55e;
          text-align: center;
          margin-bottom: 25px;
        }

        input {
          width: 100%;
          padding: 15px;
          margin-bottom: 15px;
          border-radius: 12px;
          border: none;
          outline: none;
          background:
            rgba(255,255,255,.15);
          color: white;
        }

        input::placeholder {
          color: #d1d5db;
        }

        button {
          width: 100%;
          padding: 15px;
          border: none;
          border-radius: 12px;
          background: #16a34a;
          color: white;
          cursor: pointer;
          font-size: 16px;
          margin-bottom: 15px;
        }
      `}</style>
    </div>
  );
}
