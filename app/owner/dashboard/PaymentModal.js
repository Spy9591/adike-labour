"use client";

import { useState } from "react";

export default function PaymentModal({
  job,
  onClose,
  onPay,
}) {
  const [amount, setAmount] =
    useState("");

  return (
    <div className="payment-modal-overlay">

      <div className="payment-modal">

        <div className="payment-modal-icon">
          💳
        </div>

        <h2>Enter Amount</h2>

        <p>
          Amount to pay for
          {" "}
          {job.labourName}
        </p>

        <input
          type="number"
          placeholder="₹ Enter Amount"
          value={amount}
          onChange={(e) =>
            setAmount(
              e.target.value
            )
          }
          className="payment-input"
        />

        <div className="payment-modal-buttons">

          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="pay-btn"
            onClick={() =>
              onPay(Number(amount))
            }
          >
            Pay ₹
            {amount || 0}
          </button>

        </div>

      </div>

    </div>
  );
}