const workers = [
  {
    name: "ರಮೇಶ್",
    village: "ಚನ್ನಗಿರಿ",
    work: "ಅಡಿಕೆ ಕೊಯ್ಲು",
    wage: "₹1000"
  },
  {
    name: "ಮಂಜುನಾಥ್",
    village: "ಸಂತೆಬೆನ್ನೂರು",
    work: "ಮರ ಹತ್ತುವುದು",
    wage: "₹1200"
  }
];

export default function OwnerPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "40px"
      }}
    >
      <h1 style={{ color: "#2563eb" }}>
        🏡 ಕಾರ್ಮಿಕರನ್ನು ಹುಡುಕಿ
      </h1>

      {workers.map((worker) => (
        <div
          key={worker.name}
          style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "15px",
            marginTop: "20px"
          }}
        >
          <h2>{worker.name}</h2>

          <p>📍 {worker.village}</p>

          <p>🔨 {worker.work}</p>

          <p>💰 {worker.wage}</p>

          <button
            style={{
              background: "#22c55e",
              color: "white",
              padding: "10px 15px",
              border: "none",
              borderRadius: "8px"
            }}
          >
            📞 ಕರೆ ಮಾಡಿ
          </button>
        </div>
      ))}
    </div>
  );
}
