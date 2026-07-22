"use client";

import {
  FaBriefcase,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaPhone,
  FaMapMarkerAlt,
  FaMoneyBillWave,
} from "react-icons/fa";

import "./dashboard.css";

export default function RunningJob({
  runningBooking,
  completeWork,
  cancelOrder,
  markReady,
}) {
  if (!runningBooking) return null;

  const isCompleted =
    runningBooking.status === "completed";

  return (
    <div className="runningCard">
      <h2
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <FaBriefcase />
        Running Job
      </h2>

      <div
        style={{
          marginTop: "20px",
          lineHeight: "32px",
        }}
      >
        <p>
          <strong>Owner:</strong>{" "}
          {runningBooking.ownerName || "Farm Owner"}
        </p>

        <p>
          <FaPhone />{" "}
          {runningBooking.ownerPhone || "No Number"}
        </p>

        <p>
          <FaMapMarkerAlt />{" "}
          {runningBooking.ownerVillage || "Location N/A"}
        </p>

        <p>
          <FaMoneyBillWave /> ₹
          {runningBooking.totalAmount || 700}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          {runningBooking.paymentStatus === "pending"
            ? "💳 Payment Pending"
            : isCompleted
            ? "✅ Completed"
            : "🟡 In Progress"}
        </p>

        <p>
          <FaClock />{" "}
          {isCompleted
            ? "Work Completed"
            : "Work In Progress"}
        </p>
      </div>

      <div className="runningBtns">
        {!isCompleted && (
          <>
            <button
              className="completeBtn"
              onClick={completeWork}
            >
              <FaCheckCircle />
              {" "}Complete Work
            </button>

            <button
              className="cancelBtn"
              onClick={cancelOrder}
            >
              <FaTimesCircle />
              {" "}Cancel Order
            </button>
          </>
        )}

        <button
          className="acceptBtn"
          onClick={markReady}
        >
          ✅ Remove Busy Status
        </button>
      </div>
    </div>
  );
}