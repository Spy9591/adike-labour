"use client";

import { useState } from "react";

import {
  FaCheckCircle,
  FaTimesCircle,
  FaPhone,
  FaCalendarAlt,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

import "./dashboard.css";

export default function OrderHistory({
  orders,
}) {
  const [selectedOrder, setSelectedOrder] =
    useState(null);

  return (
    <div className="card">
      <h2 className="cardTitle">
        📋 Order History
        ({orders.length})
      </h2>

      {orders.length === 0 ? (
        <p
          style={{
            color: "#cbd5e1",
          }}
        >
          No Previous Orders
        </p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="booking"
            style={{
              cursor: "pointer",
            }}
            onClick={() =>
              setSelectedOrder(
                selectedOrder ===
                  order.id
                  ? null
                  : order.id
              )
            }
          >
            <div>
              <h3>
                {order.ownerName}
              </h3>

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

              <div>
                {selectedOrder ===
                order.id ? (
                  <FaChevronUp />
                ) : (
                  <FaChevronDown />
                )}
              </div>
            </div>

            {selectedOrder ===
              order.id && (
              <div
                style={{
                  width: "100%",
                  marginTop: "15px",
                }}
              >
                <p>
                  <FaPhone />
                  {" "}
                  {order.ownerPhone ||
                    "No Number"}
                </p>

                <p>
                  Village:
                  {" "}
                  {order.ownerVillage ||
                    "N/A"}
                </p>

                <p>
                  Payment Method:
                  {" "}
                  {order.paymentMethod ||
                    "Cash"}
                </p>

                <p>
                  Total Amount:
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
                  Status:
                  {" "}
                  {order.status}
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
            )}
          </div>
        ))
      )}
    </div>
  );
}