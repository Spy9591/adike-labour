"use client";

export default function AvailableLabours({
  labours,
  bookLabour,
}) {
  return (
    <div className="glass-card">
      <h2>👷 Available Labour</h2>

      {labours.length === 0 ? (
        <p>No Labour Found</p>
      ) : (
        labours.map((labour) => (
          <div
            key={labour.id}
            className="modern-labour-card"
          >
            <div className="labour-header">
              <div className="labour-avatar">
                👷
              </div>

              <div>
                <h3>{labour.name}</h3>
                <p>📍 {labour.village}</p>
              </div>
            </div>

            <div className="labour-meta">
              <span>
                ⭐ {labour.rating || 5}
              </span>

              <span>
                📏 {labour.distance} KM
              </span>
            </div>

            <button
              className="glass-btn"
              onClick={() => bookLabour(labour)}
            >
              🚀 Send Request
            </button>
          </div>
        ))
      )}
    </div>
  );
}