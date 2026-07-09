"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container">
      <div className="overlay" />

      <div className="content">
        <div className="logo">🌴</div>

        <h1 className="title">
          ಅಡಿಕೆ ನಾಡಿಗೆ ಸ್ವಾಗತ
        </h1>

        <p className="subtitle">
          Adike Labour Platform
        </p>

        {showContent && (
          <div className="buttons">
            <button
              onClick={() =>
                (window.location.href = "/labour")
              }
              className="labour"
            >
              👷 Labour Login
            </button>

            <button
              onClick={() =>
                (window.location.href = "/owner")
              }
              className="owner"
            >
              🏡 Owner Login
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .container {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(
            135deg,
            #0f172a,
            #14532d,
            #022c22
          );
          overflow: hidden;
          position: relative;
        }

        .overlay {
          position: absolute;
          width: 600px;
          height: 600px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 50%;
          filter: blur(120px);
        }

        .content {
          text-align: center;
          z-index: 2;
        }

        .logo {
          font-size: 120px;
          animation: float 3s ease-in-out infinite;
        }

        .title {
          color: #facc15;
          font-size: 5rem;
          margin: 10px 0;
          animation: fadeUp 1.5s ease;
        }

        .subtitle {
          color: white;
          font-size: 1.5rem;
          margin-bottom: 40px;
          animation: fadeUp 2s ease;
        }

        .buttons {
          display: flex;
          justify-content: center;
          gap: 20px;
          animation: fadeUp 1s ease;
        }

        .labour,
        .owner {
          border: none;
          padding: 16px 35px;
          border-radius: 15px;
          font-size: 18px;
          color: white;
          cursor: pointer;
          transition: 0.3s;
        }

        .labour {
          background: #22c55e;
        }

        .owner {
          background: #2563eb;
        }

        .labour:hover,
        .owner:hover {
          transform: translateY(-5px);
        }

        @keyframes float {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
          100% {
            transform: translateY(0);
          }
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
