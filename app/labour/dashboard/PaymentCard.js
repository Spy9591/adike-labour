"use client";

import {
  FaMoneyBillWave,
  FaCheckCircle,
} from "react-icons/fa";

import "./dashboard.css";

export default function PaymentCard({
  completedPayments,
}) {

  if (
    !completedPayments ||
    completedPayments.length === 0
  ) {
    return null;
  }

  return (
    <div className="glass-card">

      <h2 className="cardTitle">
        ✅ Completed Payments (
        {completedPayments.length})
      </h2>

      {completedPayments.map((item) => (
        <div
          key={item.id}
          className="completed-payment-card"
        >

          <div className="successCircle">
            ✓
          </div>

          <h3>
            <FaMoneyBillWave />
            {" "}
            Payment Completed
          </h3>

          <div className="payment-row">
            <span>
              Total Amount
            </span>

            <span>
              ₹
              {item.totalAmount || 0}
            </span>
          </div>

          <div className="payment-row paid-row">
            <span>
              Paid Amount
            </span>

            <span>
              ₹
              {item.receivedAmount || 0}
            </span>
          </div>

          <div className="payment-row due-row">
            <span>
              Due Amount
            </span>

            <span>₹0</span>
          </div>

          <div className="payment-row">
            <span>
              Completed Date
            </span>

            <span>
              {item.paymentApprovedDate ||
                item.completedDate ||
                "-"}
            </span>
          </div>

          <div className="payment-row">
            <span>
              Completed Time
            </span>

            <span>
              {item.paymentApprovedTime ||
                item.completedTime ||
                "-"}
            </span>
          </div>

          <div className="jobStatusBadge">
            ✅ Fully Paid
          </div>

        </div>
      ))}

    </div>
  );
}