"use client";

import { useState } from "react";

export default function LabourDashboard() {
  const [onDuty, setOnDuty] = useState(false);

  const toggleDuty = () => {
    if (!navigator.geolocation) {
      alert("Location not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      () => {
        setOnDuty(!onDuty);
      },
      () => {
        alert(
          "Please enable location services before going on duty."
        );
      }
    );
  };

  return (
    <div className="page">
      <div className="container">

        <div className="profileCard">
          <div>
            <h1>👷 Ramesh</h1>
            <p>✅ Verified Labour</p>
            <p>⭐ 4.8 Rating</p>
          </div>

          <div className="status">
            {onDuty ? "🟢 ON DUTY" : "🔴 OFF DUTY"}
          </div>
        </div>

        <div className="statsGrid">

          <div className="glassCard">
            <h3>💰 Wallet</h3>
            <h2>₹2,500</h2>
          </div>

          <div className="glassCard">
            <h3>📋 Jobs</h3>
            <h2>15</h2>
          </div>

          <div className="glassCard">
            <h3>⭐ Rating</h3>
            <h2>4.8</h2>
          </div>

          <div className="glassCard">
            <h3>🚲 Bike</h3>
            <h2>Yes</h2>
          </div>

        </div>

        <button
          className={onDuty ? "offBtn" : "onBtn"}
          onClick={toggleDuty}
        >
          {onDuty
            ? "🔴 GO OFF DUTY"
            : "🟢 GO ON DUTY"}
        </button>

        <div className="glassCard">
          <h2>📍 Travel Charges</h2>

          <p>
            Bike Charge:
            ₹10 per KM
          </p>

          <p>
            Example:
            10 KM = ₹100
          </p>
        </div>

        <div className="glassCard">
          <h2>📋 Work History</h2>

          <p>
            Adike Harvest
            - ₹900
          </p>

          <p>
            Loading Work
            - ₹650
          </p>

          <p>
            Plantation Work
            - ₹1200
          </p>
        </div>

        <div className="glassCard">
          <h2>🏠 Current Owner</h2>

          <p>
            Owner Name:
            Girish
          </p>

          <p>
            Phone:
            9876543210
          </p>

          <p>
            Location:
            Channagiri
          </p>
        </div>

      </div>

      <style jsx>{`
        .page {
          min-height: 100vh;
          background: linear-gradient(
            135deg,
            #0f172a,
            #14532d,
            #064e3b
          );
          padding: 25px;
        }

        .container {
          max-width: 1200px;
          margin: auto;
        }

        .profileCard {
          display: flex;
          justify-content: space-between;
          align-items: center;

          background: rgba(255,255,255,0.08);

          backdrop-filter: blur(20px);

          border-radius: 25px;

          padding: 25px;

          color: white;

          margin-bottom: 20px;
        }

        .status {
          font-size: 20px;
          font-weight: bold;
        }

        .statsGrid {
          display: grid;
          grid-template-columns:
            repeat(auto-fit, minmax(200px, 1fr));

          gap: 15px;

          margin-bottom: 20px;
        }

        .glassCard {
          background: rgba(255,255,255,0.08);

          backdrop-filter: blur(20px);

          border-radius: 20px;

          padding: 20px;

          color: white;

          margin-bottom: 20px;

          box-shadow:
            0 15px 35px rgba(0,0,0,.25);
        }

        .onBtn,
        .offBtn {
          width: 100%;

          padding: 18px;

          border: none;

          border-radius: 15px;

          font-size: 18px;

          color: white;

          cursor: pointer;

          margin-bottom: 20px;
        }

        .onBtn {
          background: #16a34a;
        }

        .offBtn {
          background: #dc2626;
        }

        h1,
        h2,
        h3 {
          margin: 0 0 10px;
        }
      `}</style>
    </div>
  );
}
