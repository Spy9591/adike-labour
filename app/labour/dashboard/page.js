"use client";

import { useState } from "react";

export default function Dashboard() {
  const [onDuty, setOnDuty] = useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg,#0f172a,#14532d,#064e3b)",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "20px",
          textAlign: "center",
          width: "90%",
          maxWidth: "500px",
        }}
      >
        <h1>👷 Labour Dashboard</h1>

        <h2>
          {onDuty
            ? "🟢 Available For Work"
            : "🔴 Not Available"}
        </h2>

        <button
          onClick={() => setOnDuty(!onDuty)}
          style={{
            padding: "15px 20px",
            border: "none",
            borderRadius: "10px",
            background: onDuty
              ? "#dc2626"
              : "#16a34a",
            color: "white",
            cursor: "pointer",
            fontSize: "18px",
          }}
        >
          {onDuty
            ? "GO OFF DUTY"
            : "GO ON DUTY"}
        </button>
      </div>
    </div>
  );
}
