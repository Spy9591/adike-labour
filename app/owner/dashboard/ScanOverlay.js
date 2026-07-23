"use client";

export default function ScanOverlay() {
  return (
    <div className="scan-overlay">
      <div className="scan-card">

        <div className="scanner-circle">
          📡
        </div>

        <h2>Finding Nearby Labour</h2>

        <p>
          Searching for available workers
          around your current location...
        </p>

        <div className="scan-loader"></div>

        <div className="scan-text">
          Please wait
        </div>

      </div>
    </div>
  );
}