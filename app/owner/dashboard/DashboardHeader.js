export default function DashboardHeader({
  owner,
  logout,
  scanNearbyLabours,
}) {
  return (
    <div className="glass-card header-card">
      <div>
        <h1>🏡 Farm Owner Dashboard</h1>

        <h3>
          Welcome,{" "}
          {owner?.name || "Owner"}
        </h3>

        <p>
          📍{" "}
          {owner?.village ||
            owner?.location ||
            "Location Not Available"}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        <button
          className="primary-btn"
          onClick={scanNearbyLabours}
        >
          🔍 Scan Labour
        </button>

        <button
          className="danger-btn"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
