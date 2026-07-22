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

      {runningBooking ? (
        <>
          <div
            style={{
              marginTop: "20px",
              lineHeight: "32px",
            }}
          >
            <p>
              <strong>Owner:</strong>{" "}
              {runningBooking.ownerName ||
                "Farm Owner"}
            </p>

            <p>
              <FaPhone />{" "}
              {runningBooking.ownerPhone ||
                "No Number"}
            </p>

            <p>
              <FaMapMarkerAlt />{" "}
              {runningBooking.ownerVillage ||
                "Location N/A"}
            </p>

            <p>
              <FaMoneyBillWave /> ₹
              {runningBooking.totalAmount ||
                700}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {runningBooking.paymentStatus ===
              "pending"
                ? "💳 Payment Pending"
                : "🟡 Busy"}
            </p>

            <p>
              <FaClock /> Work In Progress
            </p>
          </div>

          <div className="runningBtns">
            <button
              className="completeBtn"
              onClick={completeWork}
            >
              <FaCheckCircle /> Complete Work
            </button>

            <button
              className="cancelBtn"
              onClick={cancelOrder}
            >
              <FaTimesCircle /> Cancel Order
            </button>

            <button
              className="acceptBtn"
              onClick={markReady}
              style={{
                background: "#22c55e",
                color: "#fff",
              }}
            >
              ✅ Remove Busy Status
            </button>
          </div>
        </>
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "20px",
          }}
        >
          <p>No Running Job</p>

          <button
            className="acceptBtn"
            onClick={markReady}
            style={{
              background: "#22c55e",
              color: "#fff",
              marginTop: "15px",
            }}
          >
            ✅ Remove Busy Status
          </button>
        </div>
      )}
    </div>
  );
}