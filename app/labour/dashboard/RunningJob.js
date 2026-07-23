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
              lineHeight: "34px",
            }}
          >
            <p>
              <strong>
                Owner:
              </strong>{" "}
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

            <div className="jobStatusBadge">
              🚜 Running Job
            </div>

            <div className="liveBadge">
              🔴 Live Job
            </div>

            <div
              className="amountBox"
              style={{
                marginTop: "20px",
              }}
            >
              <div className="payment-row">
                <span>
                  Total Amount
                </span>

                <span>
                  ₹
                  {runningBooking.totalAmount ||
                    700}
                </span>
              </div>

              <div className="payment-row paid-row">
                <span>
                  Paid Amount
                </span>

                <span>
                  ₹
                  {runningBooking.receivedAmount ||
                    0}
                </span>
              </div>

              <div className="payment-row due-row">
                <span>
                  Due Amount
                </span>

                <span>
                  ₹
                  {runningBooking.remainingAmount ||
                    runningBooking.totalAmount ||
                    700}
                </span>
              </div>
            </div>

            <p
              style={{
                marginTop: "15px",
              }}
            >
              <FaClock /> Work In Progress
            </p>

            <p>
              <FaMoneyBillWave /> Payment Status:
              {" "}
              {runningBooking.paymentStatus ||
                "Pending"}
            </p>
          </div>

          <div className="runningBtns">

            <button
              className="completeBtn"
              onClick={completeWork}
            >
              <FaCheckCircle />
              {" "}
              Complete Work
            </button>

            <button
              className="cancelBtn"
              onClick={cancelOrder}
            >
              <FaTimesCircle />
              {" "}
              Cancel Order
            </button>

            <button
              className="acceptBtn"
              onClick={markReady}
            >
              ✅ Remove Busy Status
            </button>

          </div>
        </>
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "25px",
          }}
        >
          <h3>
            No Running Job
          </h3>

          <button
            className="acceptBtn"
            onClick={markReady}
            style={{
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