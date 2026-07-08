const workers = [
  {
    name: "ರಮೇಶ್",
    village: "ಚನ್ನಗಿರಿ",
    work: "ಅಡಿಕೆ ಕೊಯ್ಲು",
    wage: "₹1000",
    distance: "2 KM"
  },
  {
    name: "ಮಂಜುನಾಥ್",
    village: "ಸಂತೆಬೆನ್ನೂರು",
    work: "ಮರ ಹತ್ತುವುದು",
    wage: "₹1200",
    distance: "4 KM"
  },
  {
    name: "ಕಿರಣ್",
    village: "ದೇವರಹಳ್ಳಿ",
    work: "ಔಷಧ ಸಿಂಪಡಣೆ",
    wage: "₹900",
    distance: "3 KM"
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

      <input
        style={input}
        placeholder="ಕೆಲಸದ ವಿಧ"
      />

      <input
        style={input}
        placeholder="ವ್ಯಾಪ್ತಿ (5 KM)"
      />

      <button style={button}>
        🔍 ಹುಡುಕಿ
      </button>

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

          <p>📏 {worker.distance}</p>

          <div>
            <button
              style={{
                ...small,
                background: "#22c55e"
              }}
            >
              📞 ಕರೆ ಮಾಡಿ
            </button>

            <button
              style={{
                ...small,
                background: "#25D366",
                marginLeft: "10px"
              }}
            >
              WhatsApp
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

const input = {
  width: "100%",
  maxWidth: "500px",
  padding: "15px",
  marginTop: "15px",
  borderRadius: "8px"
};

const button = {
  padding: "15px 25px",
  marginTop: "15px",
  background: "#2563eb",
  border: "none",
  color: "white",
  borderRadius: "10px"
};

const small = {
  padding: "10px 15px",
  border: "none",
  color: "white",
  borderRadius: "8px"
};
