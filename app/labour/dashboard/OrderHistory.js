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
        onClick={() =>
          setShowOrders(!showOrders)
        }
        style={{
          cursor: "pointer",
        }}
      >
        📋 Order History (
        {orders.length})
        {" "}
        {showOrders ? "▲" : "▼"}
      </h2>

      {showOrders && (
        <>
          {orders.length === 0 ? (
            <p>
              No Previous Orders
            </p>
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
                    <FaPhone />
                    {" "}
                    {order.ownerPhone ||
                      "No Number"}
                  </p>

                  <p>
                    Total :
                    ₹
                    {order.totalAmount || 0}
                  </p>

                  <p
                    style={{
                      color:"#22c55e",
                    }}
                  >
                    Paid :
                    ₹
                    {order.receivedAmount || 0}
                  </p>

                  <p
                    style={{
                      color:"#facc15",
                    }}
                  >
                    Due :
                    ₹
                    {order.remainingAmount || 0}
                  </p>

                  <p>
                    Payment Method :
                    {" "}
                    {order.paymentMethod ||
                      "Cash"}
                  </p>

                  <p>
                    <FaCalendarAlt />
                    {" "}
                    {order.completedDate ||
                      "N/A"}
                  </p>

                  <p>
                    ⏰{" "}
                    {order.completedTime ||
                      "-"}
                  </p>

                </div>

                <div>

                  {order.status ===
                  "completed" ? (
                    <span
                      style={{
                        color:"#22c55e",
                        fontWeight:"bold",
                      }}
                    >
                      <FaCheckCircle />
                      {" "}
                      Completed
                    </span>
                  ) : (
                    <span
                      style={{
                        color:"#ef4444",
                        fontWeight:"bold",
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