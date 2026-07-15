"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OwnerPage() {
  const router = useRouter();

  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    // Firebase Login Logic Here

    router.push("/owner/dashboard");
  };

  const handleRegister = (e) => {
    e.preventDefault();

    // Firebase Save Logic Here

    alert("✅ Owner Registration Submitted Successfully");

    router.push("/owner/dashboard");
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
      {!showRegister ? (
        <form onSubmit={handleLogin} style={glassCard}>
          <h1 style={heading}>
            🏡 Owner Portal
          </h1>

          <input
            type="tel"
            placeholder="Mobile Number"
            required
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Password"
            required
            style={inputStyle}
          />

          <button type="submit" style={loginButton}>
            Login
          </button>

          <button
            type="button"
            style={createButton}
            onClick={() => setShowRegister(true)}
          >
            Create Account
          </button>

          <button
            type="button"
            style={forgotButton}
          >
            Forgot Password
          </button>
        </form>
      ) : (
        <form onSubmit={handleRegister} style={glassCard}>
          <h1 style={heading}>
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
            required
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Password"
            required
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            required
            style={inputStyle}
          />

          <label style={labelStyle}>
            📷 Profile Photo
          </label>

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

          <label style={labelStyle}>
            🪪 Government ID Photo
          </label>

          <input
            type="file"
            accept="image/*"
            required
            style={fileStyle}
          />

          <button
            type="submit"
            style={loginButton}
          >
            Register Owner
          </button>

          <button
            type="button"
            style={backButton}
            onClick={() => setShowRegister(false)}
          >
            Back To Login
          </button>
        </form>
      )}
    </div>
  );
}

const glassCard = {
  width: "100%",
  maxWidth: "650px",
  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.15)",
  padding: "30px",
  borderRadius: "25px",
  boxShadow: "0 20px 50px rgba(0,0,0,0.45)",
  color: "white",
};

const heading = {
  textAlign: "center",
  color: "#fff",
  marginBottom: "25px",
};

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "14px",
  borderRadius: "12px",
  border: "none",
  outline: "none",
  background: "rgba(255,255,255,0.1)",
  color: "white",
  fontSize: "16px",
};

const labelStyle = {
  display: "block",
  marginBottom: "8px",
  marginTop: "10px",
};

const fileStyle = {
  width: "100%",
  marginBottom: "15px",
  color: "white",
};

const loginButton = {
  width: "100%",
  padding: "15px",
  background: "#22c55e",
  border: "none",
  borderRadius: "12px",
  color: "white",
  fontSize: "18px",
  fontWeight: "bold",
  cursor: "pointer",
  marginTop: "10px",
};

const createButton = {
  width: "100%",
  padding: "15px",
  background: "#16a34a",
  border: "none",
  borderRadius: "12px",
  color: "white",
  fontSize: "18px",
  fontWeight: "bold",
  cursor: "pointer",
  marginTop: "15px",
};

const forgotButton = {
  width: "100%",
  padding: "15px",
  background: "#15803d",
  border: "none",
  borderRadius: "12px",
  color: "white",
  fontSize: "18px",
  fontWeight: "bold",
  cursor: "pointer",
  marginTop: "15px",
};

const backButton = {
  width: "100%",
  padding: "15px",
  background: "#334155",
  border: "none",
  borderRadius: "12px",
  color: "white",
  fontSize: "18px",
  fontWeight: "bold",
  cursor: "pointer",
  marginTop: "15px",
};
