"use client";

export default function Dashboard() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg,#021b12,#14532d,#064e3b)",
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
        <h3>Welcome to Adike Labour Platform</h3>

        <button
          style={{
            background: "#16a34a",
            color: "white",
            border: "none",
            padding: "15px 25px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          🟢 GO ON DUTY
        </button>
      </div>
    </div>
  );
}
