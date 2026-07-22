export default function RunningJobs({
  jobs,
  calculateAmount,
}) {
  return (
    <div className="glass-card">
      <h2>🚜 Running Jobs</h2>

      {jobs.length === 0 ? (
        <p>No Running Jobs</p>
      ) : (
        jobs.map((job) => (
          <div
            key={job.id}
            className="running-job-card"
          >
            <h3>
              👷 {job.labourName}
            </h3>

            <p>
              ✅ Accepted
            </p>

            <p>
              📞 {job.labourPhone}
            </p>

            {job.startTime && (
              <p>
                💰 Current Amount ₹
                {calculateAmount(
                  job.startTime
                )}
              </p>
            )}

            <div className="live-badge">
              🔴 Live Tracking
            </div>
          </div>
        ))
      )}
    </div>
  );
}