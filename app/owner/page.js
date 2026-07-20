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
  const [password, setPassword] =
    useState("");

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

  const sendOtp = async () => {
    const otpCode = Math.floor(
      100000 + Math.random() * 900000
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
    try {
      const q = query(
        collection(db, "owners"),
        where("phone", "==", phone)
      );

      const snapshot =
        await getDocs(q);

      if (snapshot.empty) {
        alert(
          "Account not found"
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
        alert(
          "Invalid Password"
        );
        return;
      }

      localStorage.setItem(
        "ownerId",
        ownerDoc.id
      );

      window.location.href =
        "/owner/dashboard";
    } catch (error) {
      console.log(error);
    }
  };

  const sendForgotOtp =
    async () => {
      const q = query(
        collection(db, "owners"),
        where("phone", "==", phone)
      );

      const snapshot =
        await getDocs(q);

      if (snapshot.empty) {
        alert("Account not found");
        return;
      }

      const owner =
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
              owner.email,
            otp: otpCode,
          }),
        }
      );

      alert(
        "OTP Sent Successfully"
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

      if (snapshot.empty)
        return;

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
        "Password Updated"
      );

      setMode("login");
    };

  const registerOwner =
    async (e) => {
      e.preventDefault();

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
            createdAt:
              new Date(),
          }
        );

      localStorage.setItem(
        "ownerId",
        docRef.id
      );

      alert(
        "Account Created Successfully"
      );

      window.location.href =
        "/owner/dashboard";
    };

  const inputStyle = {
    width: "100%",
    padding: "18px",
    marginBottom: "20px",
    border: "none",
    borderRadius: "20px",
    background:
      "rgba(255,255,255,.12)",
    color: "white",
  };

  const buttonStyle = {
    width: "100%",
    padding: "18px",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    color: "white",
    background:
      "linear-gradient(135deg,#2563eb,#1d4ed8)",
    marginBottom: "20px",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent:
          "center",
        alignItems:
          "center",
        padding: "20px",
        background:
          "linear-gradient(135deg,#1e3a8a,#2563eb,#1d4ed8)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "900px",
          background:
            "rgba(255,255,255,.09)",
          backdropFilter:
            "blur(30px)",
          padding: "40px",
          borderRadius:
            "30px",
        }}
      >
        <h1
          style={{
            textAlign:
              "center",
            color: "white",
            marginBottom:
              "30px",
          }}
        >
          🏡 Owner Portal
        </h1>

        {mode ===
          "login" && (
          <>
            <input
              style={
                inputStyle
              }
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) =>
                setPhone(
                  e.target.value
                )
              }
            />

            <input
              style={
                inputStyle
              }
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
              style={
                buttonStyle
              }
              onClick={
                loginUser
              }
            >
              Login
            </button>

            <button
              style={
                buttonStyle
              }
              onClick={() =>
                setMode(
                  "register"
                )
              }
            >
              Create Account
            </button>

            <button
              style={
                buttonStyle
              }
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

        {/* Register */}
        {mode ===
          "register" &&
          !verified && (
            <>
              <input
                style={
                  inputStyle
                }
                placeholder="Email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
              />

              <input
                style={
                  inputStyle
                }
                placeholder="Mobile Number"
                value={phone}
                onChange={(e) =>
                  setPhone(
                    e.target.value
                  )
                }
              />

              <input
                style={
                  inputStyle
                }
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
                style={
                  buttonStyle
                }
                onClick={
                  sendOtp
                }
              >
                Send OTP
              </button>

              <input
                style={
                  inputStyle
                }
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) =>
                  setOtp(
                    e.target.value
                  )
                }
              />

              <button
                style={
                  buttonStyle
                }
                onClick={
                  verifyOtp
                }
              >
                Verify OTP
              </button>
            </>
          )}

        {mode ===
          "register" &&
          verified && (
            <form
              onSubmit={
                registerOwner
              }
            >
              <input
                style={
                  inputStyle
                }
                placeholder="Owner Name"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
              />

              <input
                style={
                  inputStyle
                }
                placeholder="Village"
                value={village}
                onChange={(e) =>
                  setVillage(
                    e.target.value
                  )
                }
              />

              <button
                style={
                  buttonStyle
                }
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
