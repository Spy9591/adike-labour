"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function OwnerLoginPage() {
  const router = useRouter();

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    // Firebase Login Logic Here

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
      <form
        onSubmit={handleLogin}
        style={{
          width: "100%",
          maxWidth: "650px",
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(15px)",
          WebkitBackdropFilter: "blur(15px)",
          border: "1px solid rgba(255,255,255,0.15)",
          padding: "35px",
          borderRadius: "25px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#fff",
            marginBottom: "30px",
            fontSize: "42px",
          }}
        >
          🏡 Owner Portal
        </h1>

        <input
          type="tel"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />

        <button
          type="submit"
          style={loginButton}
        >
          Login
        </button>

        <button
          type="button"
          style={createButton}
          onClick={() =>
            router.push("/owner/register")
          }
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
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "18px",
  marginBottom: "20px",
  borderRadius: "14px",
  border: "none",
  outline: "none",
  background: "rgba(255,255,255,0.12)",
  color: "white",
  fontSize: "16px",
};

const loginButton = {
  width: "100%",
  padding: "16px",
  border: "none",
  borderRadius: "14px",
  background: "#22c55e",
  color: "#fff",
  fontSize: "20px",
  cursor: "pointer",
  marginBottom: "15px",
  fontWeight: "bold",
};

const createButton = {
  width: "100%",
  padding: "16px",
  border: "none",
  borderRadius: "14px",
  background: "#16a34a",
  color: "#fff",
  fontSize: "20px",
  cursor: "pointer",
  marginBottom: "15px",
  fontWeight: "bold",
};

const forgotButton = {
  width: "100%",
  padding: "16px",
  border: "none",
  borderRadius: "14px",
  background: "#15803d",
  color: "#fff",
  fontSize: "20px",
  cursor: "pointer",
  fontWeight: "bold",
};
