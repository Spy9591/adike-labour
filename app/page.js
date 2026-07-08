export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#020617,#0f172a,#1e293b)",
        color: "white",
        padding: "40px",
        fontFamily: "Arial"
      }}
    >
      <h1
        style={{
          fontSize: "60px",
          color: "#22c55e"
        }}
      >
        🌴 ಅಡಿಕೆ ಕಾರ್ಮಿಕ
      </h1>

      <h2>
        ಅಡಿಕೆ ತೋಟಗಳಿಗೆ ಕಾರ್ಮಿಕರನ್ನು ತಕ್ಷಣ ಹುಡುಕಿ
      </h2>

      <p>
        ಚನ್ನಗಿರಿ ಪ್ರದೇಶದ ತೋಟ ಮಾಲೀಕರು ಮತ್ತು ಕಾರ್ಮಿಕರನ್ನು ಸಂಪರ್ಕಿಸುವ ವೇದಿಕೆ
      </p>

      <div style={{ marginTop: "30px" }}>
        /labour
          <button
            style={{
              background: "#22c55e",
              color: "white",
              padding: "15px 25px",
              border: "none",
              borderRadius: "10px",
              marginRight: "10px",
              cursor: "pointer"
            }}
          >
            👷 ನಾನು ಕಾರ್ಮಿಕ
          </button>
        </a>

        owner">
          <button
            style={{
              background: "#2563eb",
              color: "white",
              padding: "15px 25px",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer"
            }}
          >
            🏡 ನಾನು ಮಾಲೀಕ
          </button>
        </a>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
          marginTop: "50px"
        }}
      >
        <Card title="ಕಾರ್ಮಿಕರು" value="520+" />
        <Card title="ಮಾಲೀಕರು" value="130+" />
        <Card title="ಗ್ರಾಮಗಳು" value="35+" />
        <Card title="ದೈನಂದಿನ ಕೆಲಸ" value="85+" />
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div
      style={{
        background: "#1e293b",
        padding: "25px",
        borderRadius: "15px"
      }}
    >
      <h3>{title}</h3>

      <h1 style={{ color: "#22c55e" }}>
        {value}
      </h1>
    </div>
  );
}
