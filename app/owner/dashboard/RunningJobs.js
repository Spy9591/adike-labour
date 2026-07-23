"use client";

export default function RunningJobs({
  jobs,
  calculateAmount,
}) {
  return (
    <div className="glass-card">
      <h2>🚜 Running Jobs</h2>

      {jobs.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            🚜
          </div>

          <p>No Running Jobs</p>
        </div>
      ) : (
        jobs.map((job) => (
          <div
            key={job.id}
            className="running-job-card"
          >
            <div className="running-job-header">
              <div className="labour-avatar">
                👷
              </div>

              <div>
                <h3>
                  {job.labourName}
                </h3>

                <p>
                  📞 {job.labourPhone}
                </p>
              </div>
            </div>

            <div className="job-status-pill">
              ✅ Running
            </div>

            {job.startTime && (
              <div className="running-payment-box">
                <span>
                  Current Amount
                </span>

                <h2>
                  ₹
                  {calculateAmount(
                    job.startTime
                  )}
                </h2>
              </div>
            )}

            <div className="live-badge">
              🔴 Live Job
            </div>
          </div>
        ))
      )}
    </div>
  );
}