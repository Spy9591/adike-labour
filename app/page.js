export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0f172a",
        color: "white",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>🌴 Adike Labour</h1>

      <p>Find labourers in Channagiri</p>

      <div style={{ marginTop: "20px" }}>
        <button
          style={{
            padding: "12px 20px",
            marginRight: "10px",
            background: "green",
            color: "white",
            border: "none",
            borderRadius: "8px",
          }}
        >
          Labour Page
        </button>

        <button
          style={{
            padding: "12px 20px",
            background: "blue",
            color: "white",
            border: "none",
            borderRadius: "8px",
          }}
        >
          Owner Page
        </button>
      </div>
    </div>
  );
}
