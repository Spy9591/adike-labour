"use client";

export default function LabourPage() {
  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Labour Registration Submitted Successfully ✅");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0f172a,#14532d,#064e3b)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: "600px",
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(15px)",
          padding: "30px",
          borderRadius: "25px",
          boxShadow:
            "0 20px 50px rgba(0,0,0,0.5)",
          color: "white",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#22c55e",
            marginBottom: "25px",
          }}
        >
          👷 ಕಾರ್ಮಿಕರ ನೋಂದಣಿ
        </h1>

        <input
          type="text"
          placeholder="Full Name"
          required
          style={inputStyle}
        />

        <input
          type="tel"
          placeholder="Phone Number"
          required
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Location"
          required
          style={inputStyle}
        />

        <label>Profile Photo *</label>
        <input
          type="file"
          accept="image/*"
          required
          style={fileStyle}
        />

        <input
          type="text"
          placeholder="Government ID Number"
          required
          style={inputStyle}
        />

        <label>Government ID Photo *</label>
        <input
          type="file"
          accept="image/*"
          required
          style={fileStyle}
        />

        <button type="submit" style={buttonStyle}>
          Register Labour
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  margin: "10px 0",
  borderRadius: "10px",
  border: "none",
};

const fileStyle = {
  marginBottom: "15px",
  marginTop: "10px",
};

const buttonStyle = {
  width: "100%",
  padding: "15px",
  background: "#22c55e",
  border: "none",
  borderRadius: "12px",
  color: "white",
  fontSize: "18px",
  cursor: "pointer",
  marginTop: "15px",
};
