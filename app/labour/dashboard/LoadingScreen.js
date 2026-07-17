"use client";

import "./dashboard.css";

export default function LoadingScreen() {
  return (
    <div className="dashboard">
      <div className="loading"></div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
          marginTop: "25px",
        }}
      >
        <div className="loading"></div>
        <div className="loading"></div>
        <div className="loading"></div>
        <div className="loading"></div>
      </div>
    </div>
  );
}
