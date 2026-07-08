export default function LabourPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "40px"
      }}
    >
      <h1 style={{ color: "#22c55e" }}>
        👷 ಕಾರ್ಮಿಕ ನೋಂದಣಿ
      </h1>

      <div
        style={{
          maxWidth: "600px",
          background: "#1e293b",
          padding: "25px",
          borderRadius: "15px"
        }}
      >
        <input
          style={input}
          placeholder="ಹೆಸರು"
        />

        <input
          style={input}
          placeholder="ಮೊಬೈಲ್ ಸಂಖ್ಯೆ"
        />

        <input
          style={input}
          placeholder="ಗ್ರಾಮ"
        />

        <select style={input}>
          <option>ಅಡಿಕೆ ಕೊಯ್ಲು</option>
          <option>ಮರ ಹತ್ತುವುದು</option>
          <option>ಔಷಧ ಸಿಂಪಡಣೆ</option>
          <option>ತೋಟ ಸ್ವಚ್ಛತೆ</option>
        </select>

        <input
          style={input}
          placeholder="ದಿನಗೂಲಿ"
        />

        <button style={button}>
          ನೋಂದಣಿ ಮಾಡಿ
        </button>
      </div>
    </div>
  );
}

const input = {
  width: "100%",
  padding: "15px",
  marginTop: "12px",
  borderRadius: "8px"
};

const button = {
  width: "100%",
  padding: "15px",
  marginTop: "20px",
  background: "#22c55e",
  color: "white",
  border: "none",
  borderRadius: "10px"
};
