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
            <h3>
              👷 {labour.name}
            </h3>

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

            <p>
              📞{" "}
              {labour.mobile ||
                labour.phone ||
                "Not Available"}
            </p>

            {labour.requestStatus ===
            "pending" ? (
              <div>
                <button
                  className="primary-btn"
                  disabled
                  style={{
                    width: "100%",
                    opacity: 0.6,
                    cursor: "not-allowed",
                  }}
                >
                  ⏳ Waiting For Response
                </button>

                <p
                  style={{
                    marginTop: "10px",
                    color: "#fbbf24",
                    fontWeight: "bold",
                  }}
                >
                  Wait 1 Minute
                </p>
              </div>
            ) : (
              <button
                className="primary-btn"
                onClick={() =>
                  bookLabour(labour)
                }
              >
                📋 Send Request
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}