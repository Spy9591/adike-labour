"use client";

import {
  FaWallet,
  FaHistory,
  FaClock,
} from "react-icons/fa";

import "./dashboard.css";

export default function StatsCards({
  labour,
  pendingAmount,
}) {
  return (
    <div className="stats">

      <div className="stat">
        <FaHistory size={40} />

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
          color="#22c55e"
        />

        <h1>
          ₹
          {labour.monthlyEarnings || 0}
        </h1>

        <p>
          Monthly Earnings
        </p>
      </div>

      <div className="stat">
        <FaClock
          size={40}
          color="#facc15"
        />

        <h1>
          ₹{pendingAmount || 0}
        </h1>

        <p>
          Pending Payment
        </p>
      </div>

      <div className="stat">
        <h1>
          {labour.busy
            ? "🟡"
            : labour.onDuty
            ? "🟢"
            : "🔴"}
        </h1>

        <p>
          {labour.busy
            ? "Busy"
            : labour.onDuty
            ? "Available"
            : "Off Duty"}
        </p>

        <small>
          {labour.busy
            ? "Currently Working"
            : labour.onDuty
            ? "Ready For Booking"
            : "Not Receiving Jobs"}
        </small>
      </div>

    </div>
  );
}