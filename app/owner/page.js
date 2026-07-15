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

export default function OwnerPage() {
  const [mode, setMode] = useState("login");

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] =
    useState("");

  const [verified, setVerified] =
    useState(false);

  const [forgotOtp, setForgotOtp] =
    useState("");

  const [
    generatedForgotOtp,
    setGeneratedForgotOtp,
  ] = useState("");

  const [forgotVerified,
    setForgotVerified] =
    useState(false);

  const [newPassword,
    setNewPassword] =
    useState("");

  const [name, setName] = useState("");
  const [village, setVillage] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [farmLocation,
    setFarmLocation] =
    useState("");

  const [workersRequired,
    setWorkersRequired] =
    useState("");

  const [govtId, setGovtId] =
    useState("");

  const sendOtp = async () => {
    try {
      if (!email || !phone) {
        alert(
          "Enter Email and Mobile Number"
        );
        return;
      }

      const phoneQuery = query(
        collection(db, "owners"),
        where("phone", "==", phone)
      );

      const phoneExists =
        await getDocs(phoneQuery);

      if (!phoneExists.empty) {
        alert(
          "Account already exists. Please Login or use Forgot Password."
        );

        setMode("login");
        return;
      }

      const emailQuery = query(
        collection(db, "owners"),
        where("email", "==", email)
      );

      const emailExists =
        await getDocs(emailQuery);

      if (!emailExists.empty) {
        alert(
          "Email already registered."
        );

        setMode("login");
        return;
      }

      const otpCode = Math.floor(
        100000 +
          Math.random() * 900000
      ).toString();

      setGeneratedOtp(otpCode);

      await fetch("/api/send-otp", {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          email,
          otp: otpCode,
        }),
      });

      alert("OTP Sent Successfully");
    } catch (error) {
      console.log(error);
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

  const loginUser = async () => {
    const q = query(
      collection(db, "owners"),
      where("phone", "==", phone)
    );

    const snapshot =
      await getDocs(q);

    if (snapshot.empty) {
      alert(
        "Account not found. Please Create Account."
      );
      return;
    }

    const ownerDoc =
      snapshot.docs[0];

    const ownerData =
      ownerDoc.data();

    if (
      ownerData.password !==
      password
    ) {
      alert("Invalid Password");
      return;
    }

    localStorage.setItem(
      "ownerId",
      ownerDoc.id
    );

    window.location.href =
      "/owner/dashboard";
  };

  const sendForgotOtp =
    async () => {
      const q = query(
        collection(
          db,
          "owners"
        ),
        where(
          "phone",
          "==",
          phone
        )
      );

      const snapshot =
        await getDocs(q);

      if (
        snapshot.empty
      ) {
        alert(
          "Account not found"
        );
        return;
      }

      const ownerData =
        snapshot.docs[0].data();

      const otpCode =
        Math.floor(
          100000 +
            Math.random() *
              900000
        ).toString();

      setGeneratedForgotOtp(
        otpCode
      );

      await fetch(
        "/api/send-otp",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email:
              ownerData.email,
            otp: otpCode,
          }),
        }
      );

      alert(
        `OTP sent to ${ownerData.email}`
      );
    };

  const verifyForgotOtp =
    () => {
      if (
        forgotOtp ===
        generatedForgotOtp
      ) {
        setForgotVerified(
          true
        );

        alert(
          "OTP Verified"
        );
      } else {
        alert(
          "Invalid OTP"
        );
      }
    };

  const resetPassword =
    async () => {
      const q = query(
        collection(
          db,
          "owners"
        ),
        where(
          "phone",
          "==",
          phone
        )
      );

      const snapshot =
        await getDocs(q);

      if (
        snapshot.empty
      ) {
        alert(
          "Account not found"
        );
        return;
      }

      await updateDoc(
        doc(
          db,
          "owners",
          snapshot.docs[0].id
        ),
        {
          password:
            newPassword,
        }
      );

      alert(
        "Password Updated Successfully"
      );

      setMode("login");
      setForgotVerified(
        false
      );
    };

  const registerOwner =
    async (e) => {
      e.preventDefault();

      const phoneQuery =
        query(
          collection(
            db,
            "owners"
          ),
          where(
            "phone",
            "==",
            phone
          )
        );

      const phoneExists =
        await getDocs(
          phoneQuery
        );

      if (
        !phoneExists.empty
      ) {
        alert(
          "Account already exists."
        );

        setMode("login");
        return;
      }

      const docRef =
        await addDoc(
          collection(
            db,
            "owners"
          ),
          {
            email,
            phone,
            password,

            name,
            village,
            location,

            farmLocation,

            workersRequired,

            govtId,

            createdAt:
              new Date(),
          }
        );

      localStorage.setItem(
        "ownerId",
        docRef.id
      );

      window.location.href =
        "/owner/dashboard";
    };

  const pageStyle = {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(135deg,#0f172a,#1e3a8a,#2563eb)",
    padding: "20px",
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "850px",
    background:
      "rgba(255,255,255,.08)",
    backdropFilter:
      "blur(25px)",
    borderRadius: "30px",
    padding: "40px",
    border:
      "1px solid rgba(255,255,255,.1)",
  };

  const inputStyle = {
    width: "100%",
    padding: "15px",
    marginBottom: "15px",
    border: "none",
    borderRadius: "15px",
    background:
      "rgba(255,255,255,.12)",
    color: "white",
  };

  const buttonStyle = {
    width: "100%",
    padding: "15px",
    border: "none",
    borderRadius: "15px",
    background:
      "linear-gradient(90deg,#2563eb,#1d4ed8)",
    color: "white",
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
          🏡 Owner Portal
        </h1>

        {mode === "login" && (
          <>
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
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
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
                setMode(
                  "register"
                )
              }
            >
              Create Account
            </button>

            <button
              style={buttonStyle}
              onClick={() =>
                setMode(
                  "forgot"
                )
              }
            >
              Forgot Password
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
                registerOwner
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
                placeholder="Farm Location"
                value={farmLocation}
                onChange={(e) =>
                  setFarmLocation(
                    e.target.value
                  )
                }
                required
              />

              <input
                style={inputStyle}
                placeholder="Workers Required"
                value={workersRequired}
                onChange={(e) =>
                  setWorkersRequired(
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
