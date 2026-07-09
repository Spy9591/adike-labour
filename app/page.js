"use client";

export default function Home() {
  return (
    <div className="page">
      <div className="overlay"></div>

      <div className="card">
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
            Labour Login
          </button>

          <button
            className="ownerBtn"
            onClick={() =>
              (window.location.href = "/owner")
            }
          >
            Owner Login
          </button>
        </div>
      </div>

      <style jsx>{`
        .page {
          min-height: 100vh;
          background: linear-gradient(
            135deg,
            #0b1120,
            #172554,
            #0f172a
          );
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

        .page::before {
          content: "";
          position: absolute;
          inset: 0;

          background:
            radial-gradient(
              circle at 20% 20%,
              rgba(59,130,246,.15),
              transparent 30%
            ),
            radial-gradient(
              circle at 80% 80%,
              rgba(34,197,94,.15),
              transparent 30%
            );
        }

        .overlay {
          position: absolute;
          width: 500px;
          height: 500px;

          background: rgba(255,255,255,.08);

          border-radius: 50%;

          filter: blur(120px);

          animation: pulse 6s infinite;
        }

        .card {
          position: relative;
          z-index: 2;

          width: 90%;
          max-width: 850px;

          padding: 60px;

          text-align: center;

          background: rgba(255,255,255,.1);

          backdrop-filter: blur(20px);

          border: 1px solid rgba(255,255,255,.15);

          border-radius: 30px;

          box-shadow:
            0 25px 60px rgba(0,0,0,.5),
            0 0 30px rgba(255,255,255,.08);
        }

        .title {
          color: white;

          font-size: 4rem;

          margin-bottom: 15px;

          text-shadow:
            0 0 15px rgba(255,255,255,.25);

          animation: slideUp 1s ease;
        }

        .subtitle {
          color: #d1d5db;

          font-size: 1.5rem;

          margin-bottom: 40px;

          animation: slideUp 1.5s ease;
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

          padding: 16px 35px;

          border-radius: 14px;

          color: white;

          font-size: 18px;

          font-weight: 700;

          cursor: pointer;

          transition: all 0.3s ease;
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

          box-shadow:
            0 15px 35px rgba(0,0,0,.3);
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(25px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }

          50% {
            transform: scale(1.1);
          }

          100% {
            transform: scale(1);
          }
        }

        @media (max-width: 768px) {
          .title {
            font-size: 2.3rem;
          }

          .subtitle {
            font-size: 1rem;
          }

          .card {
            padding: 35px;
          }
        }
      `}</style>
    </div>
  );
}
