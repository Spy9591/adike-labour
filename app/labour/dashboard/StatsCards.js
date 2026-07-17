"use client";

import {
  FaWallet,
  FaHistory,
  FaStar,
  FaCheckCircle,
} from "react-icons/fa";

import "./dashboard.css";

export default function StatsCards({
  labour,
}) {
  return (
    <div className="stats">

      <div className="stat">
        <FaHistory
          size={40}
          color="#38BDF8"
        />

        <h1>
          {labour.completedJobs || 0}
        </h1>

        <p>
          Completed Jobs
        </p>
      </div>

      <div className="stat">
        <FaWallet
          size={40}
          color="#22C55E"
        />

        <h1>
          ₹
          {labour.walletBalance || 0}
        </h1>

        <p>
          Wallet Balance
        </p>
      </div>

      <div className="stat">
        <FaStar
          size={40}
          color="gold"
        />

        <h1>
          {labour.rating || 0}
        </h1>

        <p>
          Rating
        </p>
      </div>

      <div className="stat">
        <FaCheckCircle
          size={40}
          color="#10B981"
        />

        <h1>
          {labour.onDuty
            ? "ONLINE"
            : "OFFLINE"}
        </h1>

        <p>
          Current Status
        </p>
      </div>

    </div>
  );
}
