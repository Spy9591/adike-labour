"use client";

import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

export default function LabourPage() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [password, setPassword] =
    useState("");

  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] =
    useState("");

  const [verified, setVerified] =
    useState(false);

  const [name, setName] = useState("");
  const [village, setVillage] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] =
    useState("");
  const [govtId, setGovtId] = useState("");

  const [hasBike, setHasBike] =
    useState(false);

  const sendOtp = async () => {
    const newOtp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    setGeneratedOtp(newOtp);

    await fetch("/api/send-otp", {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        email,
        otp: newOtp,
      }),
    });

    alert("OTP Sent");
  };

  const verifyOtp = () => {
    if (otp === generatedOtp) {
      setVerified(true);
      alert("OTP Verified");
    } else {
      alert("Invalid OTP");
    }
  };

  const registerLabour = async (
    e
  ) => {
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

    alert("Registration Success");

    window.location.href =
      "/labour/dashboard";
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
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <input
              placeholder="Mobile"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
            />

            <input
              type="password"
              placeholder="Create Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
            />

            <button
              onClick={sendOtp}
            >
              Send OTP
            </button>

            <input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value)
              }
            />

            <button
              onClick={verifyOtp}
            >
              Verify OTP
            </button>
          </>
        )}

        {verified && (
          <form
            onSubmit={
              registerLabour
            }
          >
            <input
              value={email}
              disabled
            />

            <input
              value={phone}
              disabled
            />

            <input
              type="password"
              value={password}
              disabled
            />

            <input
              placeholder="Full Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
            />

            <input
              placeholder="Village"
              value={village}
              onChange={(e) =>
                setVillage(
                  e.target.value
                )
              }
              required
            />

            <input
              placeholder="Location"
              value={location}
              onChange={(e) =>
                setLocation(
                  e.target.value
                )
              }
              required
            />

            <input
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
              placeholder="Government ID"
              value={govtId}
              onChange={(e) =>
                setGovtId(
                  e.target.value
                )
              }
              required
            />

            <select
              onChange={(e) =>
                setHasBike(
                  e.target.value ===
                    "yes"
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
            >
              Create Account
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
