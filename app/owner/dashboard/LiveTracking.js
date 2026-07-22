export default function LiveTracking({
  runningJobs,
}) {
  return (
    <div className="glass-card">
      <h2>📍 Live Tracking</h2>

      {runningJobs.length === 0 ? (
        <p>
          No Active Labour Found
        </p>
      ) : (
        runningJobs.map((job) => (
          <div
            className="job-card"
            key={job.id}
          >
            <h3>
              👷 {job.labourName}
            </h3>

            <p>
              Latitude:
              {" "}
              {job.latitude || "N/A"}
            </p>

            <p>
              Longitude:
              {" "}
              {job.longitude || "N/A"}
            </p>

            {job.latitude &&
              job.longitude && (
                {`https://maps.google.com/maps?q=${job.latitude},${job.longitude}&z=15&output=embed`}
              )}
          </div>
        ))
      )}
    </div>
  );
}
