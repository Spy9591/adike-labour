"use client";

import { useState } from "react";

import {
  FaUser,
  FaPhone,
  FaRupeeSign,
} from "react-icons/fa";

import "./dashboard.css";

export default function PendingPayments({
  payments,
  receivePayment,
}) {
  const [showDetails, setShowDetails] =
    useState(false);

  return (
    <div className="card">
      <h2
        className="cardTitle"
        style={{ cursor: "pointer" }}
        onClick={() =>
          setShowDetails(!showDetails)
        }
      >
        💳 Pending Payments (
        {payments.length})
        {" "}
        {showDetails ? "▲" : "▼"}
      </h2>

      {showDetails && (
        <>
          {payments.length === 0 ? (
            <p>No Pending Payments</p>
          ) : (
            payments.map((item) => (
              <div
                key={item.id}
                className="booking"
              >
                <div>
                  <h3>
                    <FaUser />{" "}
                    {item.ownerName}
                  </h3>

                  <p>
                    <FaPhone />{" "}
                    {item.ownerPhone ||
                      "No Number"}
                  </p>

                  <p>
                    Payment Mode:
                    {" "}
                    {item.paymentMethod ||
                      "Cash"}
                  </p>

                  <p>
                    Amount:
                    ₹
                    {item.totalAmount ||
                      0}
                  </p>

                  <p
                    style={{
                      color: "#facc15",
                    }}
                  >
                    Pending:
                    ₹
                    {item.remainingAmount ||
                      0}
                  </p>
                </div>

                <button
                  className="acceptBtn"
                  onClick={() =>
                    receivePayment(item)
                  }
                >
                  <FaRupeeSign />
                  {" "}
                  Payment Received
                </button>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
}