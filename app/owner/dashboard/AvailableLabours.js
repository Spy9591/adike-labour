export default function AvailableLabours({
  labours,
  bookLabour,
}) {
  return (
    <div className="glass-card">
      <h2>🟢 Available Labour</h2>

      {labours.length === 0 ? (
        <p>No Labour Found</p>
      ) : (
        labours.map((labour) => (
          <div
            key={labour.id}
            className="job-card"
          >
            <h3>👷 {labour.name}</h3>

            <p>
              📍 {labour.village || "N/A"}
            </p>

            <p>
              ⭐ {labour.rating || 5}
            </p>

            {labour.distance && (
              <p>
                📏 {labour.distance} KM Away
              </p>
            )}

            {labour.mobile && (
              <a
                href={`tel:${labour.mobile}`}
                className="primary-btn"
                style={{
                  display: "inline-block",
                  marginRight: "     bookLabour(labour)
              }
            >
              📋 Book Labour
            </button>
          </div>
        ))
      )}
    </div>
  );
}
