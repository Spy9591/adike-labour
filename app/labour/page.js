"use client";

import { useState } from "react";
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase";

export default function LabourPage() {
  const [mode, setMode] = useState("login");

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");

  const [verified, setVerified] = useState(false);

  const [forgotOtp, setForgotOtp] = useState("");
  const [generatedForgotOtp, setGeneratedForgotOtp] = useState("");

  const [forgotVerified, setForgotVerified] = useState(false);

  const [newPassword, setNewPassword] = useState("");

  const [name, setName] = useState("");
  const [village, setVillage] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [govtId, setGovtId] = useState("");

  const [hasBike, setHasBike] = useState(false);

  const sendOtp = async () => {
    const q = query(
      collection(db, "labours"),
      where("phone", "==", phone)
    );

    const existing = await getDocs(q);

    if (!existing.empty) {
      alert(
        "Account already exists. Please login or use Forgot Password."
      );
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

  const loginUser = async () => {
    const q = query(
      collection(db, "labours"),
      where("phone", "==", phone)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      alert("Account not found");
      return;
    }

    const labourDoc = snapshot.docs[0];

    const labourData = labourDoc.data();

    if (labourData.password !== password) {
      alert("Invalid Password");
      return;
    }

    localStorage.setItem(
      "labourId",
      labourDoc.id
    );

    window.location.href =
      "/labour/dashboard";
  };

  const sendForgotOtp = async () => {
    const q = query(
      collection(db, "labours"),
      where("phone", "==", phone)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      alert("Account not found");
      return;
    }

    const labourData =
      snapshot.docs[0].data();

    const otpCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    setGeneratedForgotOtp(otpCode);

    await fetch("/api/send-otp", {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        email: labourData.email,
        otp: otpCode,
      }),
    });

    alert(
      `OTP sent to ${labourData.email}`
    );
  };

  const verifyForgotOtp = () => {
    if (
      forgotOtp === generatedForgotOtp
    ) {
      setForgotVerified(true);
      alert("OTP Verified");
    } else {
      alert("Invalid OTP");
    }
  };

  const resetPassword = async () => {
    const q = query(
      collection(db, "labours"),
      where("phone", "==", phone)
    );

    const snapshot =
      await getDocs(q);

    if (snapshot.empty) {
      alert("Account not found");
      return;
    }

    const labourDoc =
      snapshot.docs[0];

    await updateDoc(
      doc(
        db,
        "labours",
        labourDoc.id
      ),
      {
        password: newPassword,
      }
    );

    alert(
      "Password Updated Successfully"
    );

    setMode("login");
    setForgotVerified(false);
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
    background:
      "rgba(255,255,255,.08)",
    backdropFilter: "blur(25px)",
    borderRadius: "30px",
    border:
      "1px solid rgba(255,255,255,.1)",
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
            marginBottom: "25px",
          }}
        >
          👷 Labour Portal
        </h1>

        {mode === "login" && (
          <>
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
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            <button
              style={buttonStyle}
              onClick={loginUser}
            >
              Login
            </button>

            <button
              style={buttonStyle}
              onClick={() =>
                setMode("register")
              }
            >
              Create Account
            </button>

            <button
              style={buttonStyle}
              onClick={() =>
                setMode("forgot")
              }
            >
              Forgot Password
            </button>
          </>
        )}

        {mode === "forgot" && (
          <>
            <input
              style={inputStyle}
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
            />

            {!forgotVerified && (
              <>
                <button
                  style={buttonStyle}
                  onClick={sendForgotOtp}
                >
                  Send OTP
                </button>

                <input
                  style={inputStyle}
                  placeholder="Enter OTP"
                  value={forgotOtp}
                  onChange={(e) =>
                    setForgotOtp(
                      e.target.value
                    )
                  }
                />

                <button
                  style={buttonStyle}
                  onClick={
                    verifyForgotOtp
                  }
                >
                  Verify OTP
                </button>
              </>
            )}

            {forgotVerified && (
              <>
                <input
                  style={inputStyle}
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) =>
                    setNewPassword(
                      e.target.value
                    )
                  }
                />

                <button
                  style={buttonStyle}
                  onClick={resetPassword}
                >
                  Update Password
                </button>
              </>
            )}

            <button
              style={buttonStyle}
              onClick={() =>
                setMode("login")
              }
            >
              Back To Login
            </button>
          </>
        )}

        {mode === "register" &&
          !verified && (
            <>
              <input
                style={inputStyle}
                placeholder="Email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
              />

              <input
                style={inputStyle}
                placeholder="Mobile Number"
                value={phone}
                onChange={(e) =>
                  setPhone(
                    e.target.value
                  )
                }
              />

              <input
                style={inputStyle}
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
                  setOtp(
                    e.target.value
                  )
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

        {mode === "register" &&
          verified && (
            <form
              onSubmit={
                registerLabour
              }
            >
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
                type="password"
                disabled
              />

              <input
                style={inputStyle}
                placeholder="Full Name"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
                required
              />

              <input
                style={inputStyle}
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
                style={inputStyle}
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
                  setGovtId(
                    e.target.value
                  )
                }
                required
              />

              <select
                style={inputStyle}
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
