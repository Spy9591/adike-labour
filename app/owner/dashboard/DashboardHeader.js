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
<<<<<<< HEAD
        <div className="profile-emoji">
          👨‍🌾
        </div>
=======
        <div className="profile-emoji">👨‍🌾</div>
>>>>>>> fe87b43 (Fix dashboard build errors)

        <div>
          <h1 className="owner-name">
            {owner?.name || "Owner"}
          </h1>

          <p className="owner-location">
            📍{" "}
            {owner?.village ||
              owner?.location ||
              "Location Not Available"}
          </p>
        </div>
      </div>

      <div className="header-buttons">
        <button
          className="primary-btn"
          onClick={scanNearbyLabours}
        >
          🔍 Scan Labour
        </button>

        <button
          className="primary-btn"
          onClick={() =>
            setSoundEnabled(!soundEnabled)
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
          🚪 Logout
        </button>
      </div>
    </div>
  );
}