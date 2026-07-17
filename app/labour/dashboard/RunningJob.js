"use client";

import {
  FaBriefcase,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
} from "react-icons/fa";

import "./dashboard.css";

export default function RunningJob({
  runningBooking,
  completeWork,
  cancelOrder,
}) {
  if (!runningBooking) return null;

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
          <strong>Customer :</strong>{" "}
          {runningBooking.ownerName}
        </p>

        <p>
          <strong>Status :</strong>{" "}
          <span
            style={{
              color: "#BBF7D0",
            }}
          >
            In Progress
          </span>
        </p>

        <p>
          <strong>Payment :</strong>{" "}
          ₹700
        </p>

        <p>
          <FaClock />
          {" "}
          Work is currently active.
        </p>
      </div>

      <div className="runningBtns">

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

      </div>

    </div>
  );
}
