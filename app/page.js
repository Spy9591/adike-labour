"use client";

export default function Home() {
  return (
    <div className="page">
      <div className="overlay"></div>

      <div className="card">
        <div className="logo">
          <div className="trunk"></div>

          <div className="leaf leaf1"></div>
          <div className="leaf leaf2"></div>
          <div className="leaf leaf3"></div>
          <div className="leaf leaf4"></div>
          <div className="leaf leaf5"></div>

          <div className="nut nut1"></div>
          <div className="nut nut2"></div>
          <div className="nut nut3"></div>
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
        .page {
          min-height: 100vh;
          background: linear-gradient(
            135deg,
            #08121f,
            #10253d,
            #17314f
          );
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          overflow: hidden;
          padding: 20px;
        }

        .page::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 70px,
              rgba(255, 255, 255, 0.03) 72px,
              rgba(255, 255, 255, 0.03) 75px
            );
        }

        .overlay {
          position: absolute;
          width: 500px;
          height: 500px;
          background: rgba(34, 197, 94, 0.15);
          border-radius: 50%;
          filter: blur(120px);
          animation: pulse 6s infinite;
        }

        .card {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 850px;
          padding: 50px;
          border-radius: 30px;

          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(20px);

          border: 1px solid rgba(255,255,255,.15);

          text-align: center;

          box-shadow:
            0 25px 60px rgba(0,0,0,.5),
            0 0 30px rgba(255,255,255,.1);
        }

        .logo {
          position: relative;
          width: 180px;
          height: 180px;
          margin: 0 auto 25px auto;
          animation: float 4s ease-in-out infinite;
        }

        .trunk {
          width: 22px;
          height: 110px;
          background: #8b5a2b;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: 15px;
          border-radius: 20px;
        }

        .leaf {
          position: absolute;
          width: 80px;
          height: 20px;
          background: #22c55e;
          border-radius: 50px;
          top: 30px;
          left: 50%;
          transform-origin: left center;
        }

        .leaf1 {
          transform: translateX(-50%) rotate(0deg);
        }

        .leaf2 {
          transform: translateX(-50%) rotate(40deg);
        }

        .leaf3 {
          transform: translateX(-50%) rotate(80deg);
        }

        .leaf4 {
          transform: translateX(-50%) rotate(120deg);
        }

        .leaf5 {
          transform: translateX(-50%) rotate(160deg);
        }

        .nut {
          position: absolute;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #d97706;
          top: 65px;
        }

        .nut1 {
          left: 82px;
        }

        .nut2 {
          left: 102px;
        }

        .nut3 {
          left: 92px;
          top: 80px;
        }

        .title {
          color: white;
          font-size: 4rem;
          margin-bottom: 10px;

          text-shadow:
            0 0 15px rgba(255,255,255,.3);
        }

        .subtitle {
          color: #d1d5db;
          font-size: 1.5rem;
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
          padding: 16px 32px;
          border: none;
          border-radius: 14px;
          color: white;
          cursor: pointer;
          font-size: 18px;
          font-weight: 700;
          transition: 0.3s;
        }

        .labourBtn {
          background: #16a34a;
        }

        .ownerBtn {
          background: #2563eb;
        }

        .labourBtn:hover,
        .ownerBtn:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0,0,0,.3);
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

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.15);
          }
          100% {
            transform: scale(1);
          }
        }

        @media (max-width: 768px) {
          .title {
            font-size: 2.4rem;
          }

          .subtitle {
            font-size: 1rem;
          }

          .card {
            padding: 30px;
          }
        }
      `}</style>
    </div>
  );
}
