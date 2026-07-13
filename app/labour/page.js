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
  const [phone, setPhone] = useState("");
  const [checked, setChecked] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [village, setVillage] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [govtId, setGovtId] = useState("");
  const [photo, setPhoto] = useState(null);

  const checkUser = async () => {
    if (phone.length !== 10) {
      alert("Enter valid 10 digit phone number");
      return;
    }

    try {
      setLoading(true);

      const q = query(
        collection(db, "labours"),
        where("phone", "==", phone)
      );

      const result = await getDocs(q);

      if (!result.empty) {
        alert("✅ Account Already Exists");

        window.location.href = "/labour/dashboard";
        return;
      }

      setChecked(true);
      setIsNewUser(true);
    } catch (error) {
      console.error(error);
      alert("Failed to verify account");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
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

      alert("✅ Account Created Successfully");

      window.location.href = "/labour/dashboard";
    } catch (error) {
      console.error(error);
      alert("Failed to save data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h1>👷 Labour Login / Registration</h1>

        <input
          type="tel"
          placeholder="Enter Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        {!checked && (
          <button
            type="button"
            onClick={checkUser}
            disabled={loading}
          >
            {loading ? "Checking..." : "Continue"}
          </button>
        )}

        {isNewUser && (
          <form onSubmit={handleSubmit}>
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
              onChange={(e) =>
                setPhoto(e.target.files[0])
              }
              required
            />

            <button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
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
            #021b12,
            #14532d,
            #064e3b
          );
        }

        .card {
          width: 100%;
          max-width: 700px;
          padding: 40px;
          border-radius: 30px;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(25px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow:
            0 20px 60px rgba(0, 0, 0, 0.5),
            0 0 50px rgba(34, 197, 94, 0.2);
        }

        h1 {
          text-align: center;
          color: #22c55e;
          margin-bottom: 30px;
          font-size: 2rem;
        }

        input {
          width: 100%;
          padding: 16px;
          margin-bottom: 15px;
          border-radius: 14px;
          border: none;
          outline: none;
          font-size: 16px;
          background: rgba(255, 255, 255, 0.15);
          color: white;
          box-shadow:
            inset 0 2px 5px rgba(255,255,255,0.1),
            0 8px 20px rgba(0,0,0,0.25);
        }

        input::placeholder {
          color: #d1d5db;
        }

        button {
          width: 100%;
          padding: 16px;
          border: none;
          border-radius: 14px;
          background: linear-gradient(
            90deg,
            #22c55e,
            #16a34a
          );
          color: white;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
          box-shadow:
            0 15px 30px rgba(34, 197, 94, 0.4);
        }

        button:hover {
          transform: translateY(-2px);
        }

        button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .card {
            padding: 25px;
          }

          h1 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
