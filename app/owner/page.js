"use client";

export default function OwnerPage() {
  const handleSubmit = (e) => {
    e.preventDefault();

    alert("✅ Owner Registration Submitted Successfully");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0f172a,#1e3a8a,#2563eb)",
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
          maxWidth: "650px",
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
            color: "#3b82f6",
            marginBottom: "25px",
          }}
        >
          🏡 ಮಾಲೀಕರ ನೋಂದಣಿ
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
          pattern="[0-9]{10}"
          title="Enter 10 digit mobile number"
          required
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Village"
          required
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Location"
          required
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Farm Location"
          required
          style={inputStyle}
        />

        <input
          type="number"
          placeholder="Workers Required"
          min="1"
          required
          style={inputStyle}
        />

        <label>📷 Profile Photo *</label>
        <input
          type="file"
          accept="image/*"
          required
          style={fileStyle}
        />

        <input
          type="text"
          placeholder="Government ID Number"
          minLength={6}
          maxLength={20}
          required
          style={inputStyle}
        />

        <label>🪪 Government ID Photo *</label>
        <input
          type="file"
          accept="image/*"
          required
          style={fileStyle}
        />

        <button
          type="submit"
          style={buttonStyle}
        >
          ✅ Register Owner
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
  marginTop: "10px",
  marginBottom: "15px",
};

const buttonStyle = {
  width: "100%",
  padding: "15px",
  background: "#2563eb",
  border: "none",
  borderRadius: "12px",
  color: "white",
  fontSize: "18px",
  fontWeight: "bold",
  cursor: "pointer",
  marginTop: "15px",
};
