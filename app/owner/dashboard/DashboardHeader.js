"use client";

export default function DashboardHeader({
  owner,
  logout,
  scanNearbyLabours,
  soundEnabled,
  setSoundEnabled,
  notifications,
  showNotifications,
  setShowNotifications,
}) {
  return (
    <div className="glass-card header-card">
      <div className="owner-profile">
        <div className="profile-emoji">
          👨‍🌾
        </div>

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

          {(owner?.phone ||
            owner?.mobile) && (
            <p>
              📞{" "}
              {owner?.phone ||
                owner?.mobile}
            </p>
          )}
        </div>
      </div>

      <div className="header-buttons">
        <button
          className="glass-btn"
          onClick={scanNearbyLabours}
        >
          🔍 Scan Labour
        </button>

        <button
          className="notification-bell"
          onClick={() =>
            setShowNotifications(
              !showNotifications
            )
          }
        >
          🔔

          {notifications.length >
            0 && (
            <span className="notification-badge">
              {
                notifications.length
              }
            </span>
          )}
        </button>

        <button
          className="glass-btn"
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
          🚪 Logout
        </button>
      </div>

      {showNotifications && (
        <div className="notification-popup">
          <h3>
            🔔 Notifications
          </h3>

          {notifications.length ===
          0 ? (
            <p>
              No Notifications
            </p>
          ) : (
            notifications.map(
              (
                notification
              ) => (
                <div
                  key={
                    notification.id
                  }
                  className="popup-notification"
                >
                  <strong>
                    {
                      notification.title
                    }
                  </strong>

                  <p>
                    {
                      notification.message
                    }
                  </p>
                </div>
              )
            )
          )}
        </div>
      )}
    </div>
  );
}