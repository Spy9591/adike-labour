"use client";

import { useState } from "react";

import {
  FaUser,
  FaPhone,
  FaCheckCircle,
  FaTimesCircle,
  FaMoneyBillWave,
} from "react-icons/fa";

import "./dashboard.css";

export default function PendingPayments({
  payments,
  acceptPayment,
  rejectPayment,
}) {
  const [showDetails, setShowDetails] =
    useState(true);

  return (
    <div className="glass-card">

      <h2
        className="cardTitle"
        onClick={() =>
          setShowDetails(!showDetails)
        }
        style={{
          cursor: "pointer",
        }}
      >
        💳 Amount Sent (
        {payments.length})
        {" "}
        {showDetails ? "▲" : "▼"}
      </h2>

      {showDetails && (
        <>
          {payments.length === 0 ? (
            <div className="empty-state">
              <h3>
                No Amount Sent
              </h3>
            </div>
          ) : (
            payments.map((item) => (
              <div
                key={item.id}
                className="amount-sent-card"
              >
                <h3>
                  <FaMoneyBillWave />
                  {" "}
                  Amount Sent
                </h3>

                <div className="payment-row">
                  <span>
                    <FaUser />
                    {" "}
                    Owner
                  </span>
                  <span>
                    {item.ownerName ||
                      "Farm Owner"}
                  </span>
                </div>

                <div className="payment-row">
                  <span>
                    <FaPhone />
                    {" "}
                    Mobile
                  </span>
                  <span>
                    {item.ownerPhone ||
                      "No Number"}
                  </span>
                </div>

                <div className="payment-row">
                  <span>
                    Total Amount
                  </span>
                  <span>
                    ₹{item.totalAmount || 0}
                  </span>
                </div>

                <div className="payment-row paid-row">
                  <span>
                    Paid Amount
                  </span>
                  <span>
                    ₹
                    {item.receivedAmount ||
                      0}
                  </span>
                </div>

                <div className="payment-row due-row">
                  <span>
                    Due Amount
                  </span>
                  <span>
                    ₹
                    {item.remainingAmount ||
                      0}
                  </span>
                </div>

                <div className="payment-row">
                  <span>
                    Amount Sent
                  </span>
                  <span>
                    ₹
                    {item.requestedPaymentAmount ||
                      0}
                  </span>
                </div>

                <div className="payment-row">
                  <span>
                    Sent Date
                  </span>
                  <span>
                    {item.paymentRequestDate ||
                      "-"}
                  </span>
                </div>

                <div className="payment-row">
                  <span>
                    Sent Time
                  </span>
                  <span>
                    {item.paymentRequestTime ||
                      "-"}
                  </span>
                </div>

                <div className="paymentActionBtns">

                  <button
                    className="acceptBtn"
                    onClick={() =>
                      acceptPayment(item)
                    }
                  >
                    <FaCheckCircle />
                    {" "}
                    Accept Amount
                  </button>

                  <button
                    className="rejectBtn"
                    onClick={() =>
                      rejectPayment(item)
                    }
                  >
                    <FaTimesCircle />
                    {" "}
                    Reject Amount
                  </button>

                </div>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
}