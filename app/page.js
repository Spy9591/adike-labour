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
      <>
        <div
          style={{
            height: "100vh",
            background:
              "linear-gradient(135deg, #064e3b, #166534, #14532d)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            textAlign: "center",
          }}
        >
          <div className="tree">🌴</div>

          <h1
            style={{
              fontSize: "70px",
              color: "#facc15",
              marginBottom: "10px",
            }}
          >
            ಅಡಿಕೆ ನಾಡಿಗೆ ಸ್ವಾಗತ
          </h1>

          <p
            style={{
              fontSize: "24px",
              color: "#ffffff",
            }}
          >
            Welcome to Adike Labour Platform
          </p>
        </div>

        <style jsx>{`
          .tree {
            font-size: 120px;
            animation: float 2s infinite ease-in-out;
          }

          @keyframes float {
            0% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-20px);
            }
            100% {
              transform: translateY(0);
            }
          }
        `}</style>
      </>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#020617,#0f172a,#111827)",
        color: "white",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Header */}

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

        <div>
          <span style={{ marginRight: "25px" }}>
            Home
          </span>

          <span style={{ marginRight: "25px" }}>
            Services
          </span>

          <span>Contact</span>
        </div>
      </div>

      {/* Hero Section */}

      <div
        style={{
          padding: "80px 50px",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <div style={{ maxWidth: "600px" }}>
          <h1
            style={{
              fontSize: "60px",
              lineHeight: "1.2",
              marginBottom: "20px",
            }}
          >
            Find Skilled
            <br />
            <span style={{ color: "#22c55e" }}>
              Arecanut Labourers
            </span>
          </h1>

          <p
            style={{
              color: "#cbd5e1",
              fontSize: "20px",
              lineHeight: "1.6",
            }}
          >
            Channagiri's dedicated platform for
            connecting plantation owners and
            skilled arecanut workers.
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
                  fontSize: "18px",
                  cursor: "pointer",
                }}
              >
                👷 Labour Login
              </button>
            </Link>

            owner">
              <button
                style={{
                  background: "#2563eb",
                  color: "white",
                  border: "none",
                  padding: "15px 30px",
                  borderRadius: "12px",
                  fontSize: "18px",
                  cursor: "pointer",
                }}
              >
                🏡 Owner Login
              </button>
            </Link>
          </div>
        </div>

        <div
          style={{
            width: "380px",
            background: "#111827",
            borderRadius: "25px",
            padding: "25px",
            boxShadow:
              "0 0 30px rgba(34,197,94,.25)",
            marginTop: "25px",
          }}
        >
          <h3>📊 Platform Statistics</h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "15px",
              marginTop: "20px",
            }}
          >
            <StatCard
              title="Workers"
              value="520+"
              color="#22c55e"
            />

            <StatCard
              title="Owners"
              value="130+"
              color="#3b82f6"
            />

            <StatCard
              title="Villages"
              value="35+"
              color="#f59e0b"
            />

            <StatCard
              title="Jobs"
              value="85+"
              color="#a855f7"
            />
          </div>
        </div>
      </div>

      <div
        style={{
          padding: "50px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "35px",
          }}
        >
          Why Choose Adike Labour?
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "20px",
          }}
        >
          <Feature
            icon="⚡"
            title="Fast Hiring"
            description="Find workers instantly."
          />

          <Feature
            icon="📍"
            title="Local Network"
            description="Workers near Channagiri."
          />

          <Feature
            icon="📱"
            title="Direct Contact"
            description="Call or WhatsApp instantly."
          />

          <Feature
            icon="✅"
            title="Available Workers"
            description="Check labour availability."
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div
      style={{
        background: "#1f2937",
        padding: "20px",
        borderRadius: "15px",
      }}
    >
      <p style={{ color: "#9ca3af" }}>{title}</p>
      <h2 style={{ color }}>{value}</h2>
    </div>
  );
}

function Feature({ icon, title, description }) {
  return (
    <div
      style={{
        background: "#111827",
        padding: "25px",
        borderRadius: "20px",
        border: "1px solid #374151",
      }}
    >
      <div style={{ fontSize: "40px" }}>
        {icon}
      </div>

      <h3>{title}</h3>

      <p style={{ color: "#cbd5e1" }}>
        {description}
      </p>
    </div>
  );
}
