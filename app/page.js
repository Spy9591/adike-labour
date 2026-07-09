"use client";

export default function Home() {
  return (
    <div className="container">
      <div className="blob blob1"></div>
      <div className="blob blob2"></div>

      <div className="card">
        <div className="heroLogo">
          <div className="treeTrunk"></div>

          <div className="treeTop">
            <div className="leaf leaf1"></div>
            <div className="leaf leaf2"></div>
            <div className="leaf leaf3"></div>
            <div className="leaf leaf4"></div>
          </div>

          <div className="nut nut1"></div>
          <div className="nut nut2"></div>
          <div className="nut nut3"></div>

          <div className="climber">🧑</div>
        </div>

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
        .container {
          min-height: 100vh;
          background: linear-gradient(
            135deg,
            #020617,
            #0f172a,
            #1e293b
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
          border-radius: 999px;
          filter: blur(100px);
        }

        .blob1 {
          width: 300px;
          height: 300px;
          background: rgba(34, 197, 94, 0.3);
          top: 10%;
          left: 10%;
          animation: move1 10s infinite alternate;
        }

        .blob2 {
          width: 350px;
          height: 350px;
          background: rgba(59, 130, 246, 0.3);
          bottom: 10%;
          right: 10%;
          animation: move2 12s infinite alternate;
        }

        .card {
          width: 100%;
          max-width: 900px;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(20px);
          border-radius: 35px;
          text-align: center;
          padding: 50px;
          color: white;

          box-shadow:
            0 25px 70px rgba(0, 0, 0, 0.6),
            0 0 40px rgba(255, 215, 0, 0.15);
        }

        .heroLogo {
          position: relative;
          width: 220px;
          height: 220px;
          margin: 0 auto 20px auto;
          animation: float 4s infinite ease-in-out;
        }

        .treeTrunk {
          position: absolute;
          width: 24px;
          height: 140px;
          background: linear-gradient(
            to bottom,
            #b08968,
            #7f5539
          );
          left: 50%;
          bottom: 20px;
          transform: translateX(-50%);
          border-radius: 30px;
        }

        .treeTop {
          position: absolute;
          top: 35px;
          left: 50%;
          transform: translateX(-50%);
        }

        .leaf {
          position: absolute;
          width: 70px;
          height: 28px;

          background: linear-gradient(
            90deg,
            #16a34a,
            #4ade80
          );

          border-radius: 100px 0 100px 0;
        }

        .leaf1 {
          transform: rotate(0deg);
        }

        .leaf2 {
          transform: rotate(60deg);
        }

        .leaf3 {
          transform: rotate(120deg);
        }

        .leaf4 {
          transform: rotate(180deg);
        }

        .nut {
          position: absolute;

          width: 16px;
          height: 16px;

          background: #d97706;
          border-radius: 50%;
          top: 72px;
        }

        .nut1 {
          left: 95px;
        }

        .nut2 {
          left: 118px;
        }

        .nut3 {
          left: 106px;
          top: 90px;
        }

        .climber {
          position: absolute;
          left: 112px;
          top: 115px;
          font-size: 30px;

          animation: climb 3s infinite ease-in-out;
        }

        .title {
          font-size: 4rem;
          color: #ffd700;

          text-shadow:
            0 0 10px #ffd700,
            0 0 30px #f59e0b;
        }

        .subtitle {
          font-size: 1.6rem;
          color: #e5e7eb;
          margin-top: 15px;
          margin-bottom: 35px;
        }

        .buttons {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .labourBtn,
        .ownerBtn {
          border: none;
          padding: 18px 35px;
          border-radius: 15px;
          color: white;
          font-size: 18px;
          font-weight: 700;
          cursor: pointer;
          transition: 0.3s;
        }

        .labourBtn {
          background: #16a34a;
          box-shadow:
            0 10px 25px rgba(22,163,74,.45);
        }

        .ownerBtn {
          background: #2563eb;
          box-shadow:
            0 10px 25px rgba(37,99,235,.45);
        }

        .labourBtn:hover,
        .ownerBtn:hover {
          transform: translateY(-6px) scale(1.05);
        }

        @keyframes float {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
          100% {
            transform: translateY(0);
          }
        }

        @keyframes climb {
          0% {
            transform: translateY(20px);
          }

          50% {
            transform: translateY(-20px);
          }

          100% {
            transform: translateY(20px);
          }
        }

        @keyframes move1 {
          from {
            transform: translate(0, 0);
          }

          to {
            transform: translate(80px, -50px);
          }
        }

        @keyframes move2 {
          from {
            transform: translate(0, 0);
          }

          to {
            transform: translate(-80px, 50px);
          }
        }

        @media (max-width: 768px) {
          .title {
            font-size: 2.5rem;
          }

          .subtitle {
            font-size: 1.1rem;
          }

          .card {
            padding: 30px;
          }
        }
      `}</style>
    </div>
  );
}
