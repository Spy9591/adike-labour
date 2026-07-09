"use client";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#064e3b,#14532d,#166534)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        textAlign: "center",
        fontFamily: "Arial",
      }}
    >
      <h1
        style={{
          fontSize: "4rem",
          color: "#facc15",
        }}
      >
        🌴 ಅಡಿಕೆ ನಾಡಿಗೆ ಸ್ವಾಗತ 🌴
      </h1>

      <p
        style={{
          fontSize: "1.2rem",
          marginBottom: "30px",
        }}
      >
        Welcome to Adike Labour Platform
      </p>

      <div
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        <button
          onClick={() => {
            window.location.href = "/labour";
          }}
          style={{
            background: "#22c55e",
            color: "white",
            padding: "15px 30px",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          👷 Labour Login
        </button>

        <button
          onClick={() => {
            window.location.href = "/owner";
          }}
          style={{
            background: "#2563eb",
            color: "white",
            padding: "15px 30px",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          🏡 Owner Login
        </button>
      </div>
    </div>
  );
}
