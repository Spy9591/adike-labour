"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (showWelcome) {
    return (
      <div
        style={{
          height: "100vh",
          background:
            "linear-gradient(135deg,#064e3b,#166534,#14532d)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
        }}
      >
        <div
          style={{
            fontSize: "100px",
            animation: "bounce 2s infinite",
          }}
        >
          🌴
        </div>

        <h1
          style={{
            fontSize: "65px",
            color: "#facc15",
            textAlign: "center",
          }}
        >
          ಅಡಿಕೆ ನಾಡಿಗೆ ಸ್ವಾಗತ
        </h1>

        <h3>Welcome to Adike Labour Platform</h3>

        <style jsx>{`
          @keyframes bounce {
            0%,
            100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-20px);
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#020617,#0f172a,#111827)",
        color: "white",
        fontFamily: "Arial,sans-serif",
      }}
    >
      <div
        style={{
          padding: "20px 50px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ color: "#22c55e" }}>
          🌴 Adike Labour
        </h2>
      </div>

      <div
        style={{
          padding: "80px 50px",
        }}
      >
        <h1
          style={{
            fontSize: "60px",
          }}
        >
          Find Skilled
          <br />
          <span style={{ color: "#22c55e" }}>
            Arecanut Labourers
          </span>
        </h1>

        <p style={{ color: "#cbd5e1" }}>
          Connect Plantation Owners and Skilled
          Workers.
        </p>

        <div
          style={{
            marginTop: "30px",
            display: "flex",
            gap: "15px",
          }}
        >
          /labour
            <button
              style={{
                background: "#22c55e",
                color: "white",
                border: "none",
                padding: "15px 30px",
                borderRadius: "12px",
                cursor: "pointer",
              }}
            >
              👷 Labour Login
            </button>
          </Link>

          /owner
            <button
              style={{
                background: "#2563eb",
                color: "white",
                border: "none",
                padding: "15px 30px",
                borderRadius: "12px",
                cursor: "pointer",
              }}
            >
              🏡 Owner Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
