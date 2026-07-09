"use client";

export default function Home() {
  return (
    <div className="page">
      <div className="blob blob1"></div>
      <div className="blob blob2"></div>

      <div className="card">
        <div className="tree">🌴</div>

        <h1 className="title">
          ಅಡಿಕೆ ನಾಡಿಗೆ ಸ್ವಾಗತ
        </h1>

        <p className="subtitle">
          ಚನ್ನಗಿರಿ ರೈತರು ಮತ್ತು ಕಾರ್ಮಿಕರ ಸೇತುವೆ
        </p>

        <div className="buttons">
          <button
            className="labourBtn"
            onClick={() =>
              (window.location.href = "/labour")
            }
          >
            👷 Labour Login
          </button>

          <button
            className="ownerBtn"
            onClick={() =>
              (window.location.href = "/owner")
            }
          >
            🏡 Owner Login
          </button>
        </div>
      </div>

      <style jsx>{`
        .page {
          min-height: 100vh;
          background: linear-gradient(
            135deg,
            #021b0f,
            #064e3b,
            #0f172a
          );
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          position: relative;
          padding: 20px;
        }

        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          animation: move 10s infinite alternate;
        }

        .blob1 {
          width: 350px;
          height: 350px;
          background: rgba(34, 197, 94, 0.4);
          top: 10%;
          left: 10%;
        }

        .blob2 {
          width: 350px;
          height: 350px;
          background: rgba(37, 99, 235, 0.4);
          bottom: 10%;
          right: 10%;
        }

        .card {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(20px);
          padding: 50px;
          border-radius: 30px;
          text-align: center;
          color: white;
          z-index: 1;
          box-shadow:
            0 25px 60px rgba(0, 0, 0, 0.4),
            0 0 30px rgba(34, 197, 94, 0.3);
          max-width: 850px;
          width: 100%;
        }

        .tree {
          font-size: 100px;
          animation: float 3s ease-in-out infinite;
        }

        .title {
          font-size: 4rem;
          margin: 0;
          color: #facc15;
          text-shadow:
            0 0 15px #facc15,
            0 0 30px #f59e0b;
          animation: fadeIn 1.5s ease;
        }

        .subtitle {
          font-size: 1.6rem;
          margin-top: 15px;
          color: #e5e7eb;
          animation: slideUp 2s ease;
        }

        .buttons {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-top: 40px;
          flex-wrap: wrap;
        }

        .labourBtn,
        .ownerBtn {
          border: none;
          padding: 16px 32px;
          font-size: 18px;
          color: white;
          cursor: pointer;
          border-radius: 15px;
          transition: all 0.3s ease;
          font-weight: bold;
        }

        .labourBtn {
          background: #22c55e;
        }

        .ownerBtn {
          background: #2563eb;
        }

        .labourBtn:hover,
        .ownerBtn:hover {
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
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

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes move {
          from {
            transform: translate(0, 0);
          }
          to {
            transform: translate(50px, -50px);
          }
        }
      `}</style>
    </div>
  );
}
