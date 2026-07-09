export default function OwnerPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "40px",
      }}
    >
      <h1 style={{ color: "#2563eb" }}>
        🏡 Owner Registration
      </h1>

      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          maxWidth: "500px",
        }}
      >
        <input
          placeholder="Name"
          style={inputStyle}
        />

        <input
          placeholder="Phone Number"
          style={inputStyle}
        />

        <input
          placeholder="Location"
          style={inputStyle}
        />

        <label>Profile Photo</label>
        <input type="file" />

        <input
          placeholder="Government ID Number"
          style={inputStyle}
        />

        <label>Government ID Photo</label>
        <input type="file" />

        <button
          style={{
            padding: "15px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "10px",
          }}
        >
          Register Owner
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  padding: "12px",
  borderRadius: "8px",
};
