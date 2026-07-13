"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore";

import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

import { db, auth } from "../firebase";

export default function LabourPage() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] =
    useState(null);

  const [otpVerified, setOtpVerified] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const [showRegistration, setShowRegistration] =
    useState(false);

  const [name, setName] = useState("");
  const [village, setVillage] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [govtId, setGovtId] = useState("");
  const [photo, setPhoto] = useState(null);

  const sendOtp = async () => {
    if (phone.length !== 10) {
      alert("Enter valid mobile number");
      return;
    }

    try {
      setLoading(true);

      window.recaptchaVerifier =
        new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          {
            size: "normal",
          }
        );

      const result =
        await signInWithPhoneNumber(
          auth,
          `+91${phone}`,
          window.recaptchaVerifier
        );

      setConfirmationResult(result);

      alert("OTP Sent Successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp) {
      alert("Enter OTP");
      return;
    }

    try {
      setLoading(true);

      await confirmationResult.confirm(otp);

      setOtpVerified(true);

      const q = query(
        collection(db, "labours"),
        where("phone", "==", phone)
      );

      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        localStorage.setItem(
          "labourPhone",
          phone
        );

        alert("Login Successful");

        router.push("/labour/dashboard");
        return;
      }

      setShowRegistration(true);
    } catch (error) {
      console.error(error);
      alert("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const createAccount = async (e) => {
    e.preventDefault();

    if (!photo) {
      alert("Photo is mandatory");
      return;
    }

    try {
      setLoading(true);

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

      localStorage.setItem(
        "labourPhone",
        phone
      );

      alert("Account Created Successfully");

      router.push("/labour/dashboard");
    } catch (error) {
      console.error(error);
      alert("Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="card">

        <h1>
          👷 Labour Login / Registration
        </h1>

        {!otpVerified && (
          <>
            <input
              type="tel"
              placeholder="Enter Mobile Number"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              maxLength={10}
            />

            <button
              onClick={sendOtp}
              disabled={loading}
            >
              {loading
                ? "Sending OTP..."
                : "Send OTP"}
            </button>

            <div
              id="recaptcha-container"
              style={{ marginTop: 20 }}
            />

            {confirmationResult && (
              <>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value)
                  }
                />

                <button
                  onClick={verifyOtp}
                  disabled={loading}
                >
                  Verify OTP
                </button>
              </>
            )}
          </>
        )}

        {showRegistration && (
          <form onSubmit={createAccount}>
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
              placeholder="Experience"
              value={experience}
              onChange={(e) =>
                setExperience(e.target.value)
              }
              required
            />

            <input
              type="text"
              placeholder="Government ID"
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

            <button
              type="submit"
              disabled={loading}
            >
              Create Account
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
          background: linear-gradient(
            135deg,
            #0f172a,
            #14532d,
            #064e3b
          );
          padding: 20px;
        }

        .card {
          width: 100%;
          max-width: 700px;
          padding: 35px;
          border-radius: 25px;
          background: rgba(255,255,255,.08);
          backdrop-filter: blur(20px);
          box-shadow:
            0 25px 60px rgba(0,0,0,.5);
        }

        h1 {
          color: #22c55e;
          text-align: center;
          margin-bottom: 25px;
        }

        input {
          width: 100%;
          padding: 16px;
          margin-bottom: 15px;
          border-radius: 12px;
          border: none;
          outline: none;
          background: rgba(255,255,255,.12);
          color: white;
        }

        button {
          width: 100%;
          padding: 15px;
          border: none;
          border-radius: 12px;
          background: #16a34a;
          color: white;
          font-size: 17px;
          cursor: pointer;
          margin-bottom: 15px;
        }
      `}</style>
    </div>
  );
}
