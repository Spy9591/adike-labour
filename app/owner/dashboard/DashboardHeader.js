export default function DashboardHeader({
  owner,
  logout,
  scanNearbyLabours,
  soundEnabled,
  setSoundEnabled,
}) {
  return (
    <div className="glass-card header-card">
      <div className="owner-profile">
        {owner?.photoURL ? (
          {owner.photoURL}
        ) : (
          <div className="profile-emoji">
            👨‍🌾
          </div>
        )}

        <div>
          <h1>🏡 Farm Owner Dashboard</h1>

          <h3>
            {owner?.name || "Owner"}
          </h3>

          <p>
            📍{" "}
            {owner?.village ||
              owner?.location ||
              "Location Not Available"}
          </p>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <button
          className="primary-btn"
          onClick={scanNearbyLabours}
        >
          🔍 Scan Labour
        </button>

        <button
          className="primary-btn"
          onClick={() =>
            setSoundEnabled(
              !soundEnabled
            )
          }
        >
          {soundEnabled
            ? "🔔 Sound ON"
            : "🔕 Sound OFF"}
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
