export default function AvailableLabours({
  labours,
  bookLabour
}) {
  return (
    <div className="glass-card">
      <h2>🟢 Available Labour</h2>

      {labours.length === 0 ? (
        <p>No Labour Available</p>
      ) : (
        labours.map((labour) => (
          <div
            key={labour.id}
            className="job-card"
          >
            <h3>{labour.name}</h3>

            <p>
              📍 {labour.village}
            </p>

            <p>
              ⭐ {labour.rating || 5}
            </p>

            <p>
              🚲{" "}
              {labour.hasBike
                ? "Bike Available"
                : "No Bike"}
            </p>

            <button
              className="primary-btn"
              onClick={() =>
                bookLabour(labour)
              }
            >
              Book Labour
            </button>
          </div>
        ))
      )}
    </div>
  );
}
