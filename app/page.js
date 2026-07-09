"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "50px",
        textAlign: "center",
      }}
    >
      <h1>🌴 ಅಡಿಕೆ ನಾಡಿಗೆ ಸ್ವಾಗತ</h1>

      <p>Welcome to Adike Labour Platform</p>

      <div
        style={{
          marginTop: "40px",
          display: "flex",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        /labour
          <button
            style={{
              padding: "15px 30px",
              background: "green",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            👷 Labour Login
          </button>
        </Link>

        /owner
          <button
            style={{
              padding: "15px 30px",
              background: "blue",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            🏡 Owner Login
          </button>
        </Link>
      </div>
    </div>
  );
}
