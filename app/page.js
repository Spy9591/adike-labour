import Link from "next/link";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1
        style={{
          color: "#22c55e",
          fontSize: "50px",
        }}
      >
        🌴 ಅಡಿಕೆ ಕಾರ್ಮಿಕ
      </h1>

      <h2>ಚನ್ನಗಿರಿಯ ಅಡಿಕೆ ತೋಟಗಳಿಗಾಗಿ ಕಾರ್ಮಿಕರ ವೇದಿಕೆ</h2>

      <p>
        ಕಾರ್ಮಿಕರು ಮತ್ತು ತೋಟದ ಮಾಲೀಕರನ್ನು ಸಂಪರ್ಕಿಸುವ ಡಿಜಿಟಲ್ ವೇದಿಕೆ
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
              padding: "15px 25px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            👷 ನಾನು ಕಾರ್ಮಿಕ
          </button>
        </Link>

        /owner
          <button
            style={{
              background: "#2563eb",
              color: "white",
              border: "none",
              padding: "15px 25px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            🏡 ನಾನು ಮಾಲೀಕ
          </button>
        </Link>
      </div>
    </div>
  );
}
