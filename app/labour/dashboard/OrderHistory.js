"use client";

import { useState } from "react";

import {
  FaCheckCircle,
  FaTimesCircle,
  FaPhone,
  FaCalendarAlt,
} from "react-icons/fa";

import "./dashboard.css";

export default function OrderHistory({
  orders,
}) {
  const [showOrders, setShowOrders] =
    useState(false);

  return (
    <div className="card">
      <h2
        className="cardTitle"
        style={{ cursor: "pointer" }}
        onClick={() =>
          setShowOrders(!showOrders)
        }
      >
        📋 Order History (
        {orders.length})
        {" "}
        {showOrders ? "▲" : "▼"}
      </h2>

      {showOrders && (
        <>
          {orders.length === 0 ? (
            <p>No Previous Orders</p>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="booking"
              >
                <div>
                  <h3>
                    {order.ownerName}
                  </h3>

                  <p>
                    <FaPhone />{" "}
                    {order.ownerPhone ||
                      "No Number"}
                  </p>

                  <p>
                    Amount:
                    ₹
                    {order.totalAmount ||
                      0}
                  </p>

                  <p>
                    Received:
                    ₹
                    {order.receivedAmount ||
                      0}
                  </p>

                  <p>
                    Pending:
                    ₹
                    {order.remainingAmount ||
                      0}
                  </p>

                  <p>
                    Payment Method:
                    {" "}
                    {order.paymentMethod ||
                      "Cash"}
                  </p>

                  <p>
                    <FaCalendarAlt />
                    {" "}
                    {order.completedAt
                      ? new Date(
                          order.completedAt
                            .seconds *
                            1000
                        ).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>

                <div>
                  {order.status ===
                  "completed" ? (
                    <span
                      style={{
                        color: "#22c55e",
                      }}
                    >
                      <FaCheckCircle />
                      {" "}
                      Completed
                    </span>
                  ) : (
                    <span
                      style={{
                        color: "#ef4444",
                      }}
                    >
                      <FaTimesCircle />
                      {" "}
                      Cancelled
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
}