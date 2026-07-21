export default function Notifications({
  notifications,
}) {
  return (
    <div className="glass-card">
      <h2>🔔 Notifications</h2>

      {notifications.length === 0 ? (
        <p>No Notifications</p>
      ) : (
        notifications.map(
          (notification) => (
            <div
              key={notification.id}
              className="notification-card"
            >
              <h4>
                🔔{" "}
                {notification.title}
              </h4>

              <p>
                {notification.message}
              </p>

              <small>
                {notification.status}
              </small>
            </div>
          )
        )
      )}
    </div>
  );
}
