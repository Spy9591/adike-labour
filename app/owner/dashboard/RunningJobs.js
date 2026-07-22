export default function RunningJobs({
  jobs,
  calculateAmount,
}) {
  return (
    <div className="glass-card">
      <h2>🟠 Running Jobs</h2>

      {jobs.length === 0 ? (
        <p>No Running Jobs</p>
      ) : (
        jobs.map((job) => (
          <div
            key={job.id}
            className="job-card running-job-card"
          >
            <h3>
              👷 {job.labourName}
            </h3>

            <p>
              ✅ Status :
              Accepted
            </p>

            <p>
              📞 {job.labourPhone}
            </p>

            <p>
              📍{" "}
              {job.labourVillage ||
                "N/A"}
            </p>

            {job.startTime && (
              <p>
                💰 Current Amount : ₹
                {calculateAmount(
                  job.startTime
                )}
              </p>
            )}

            <div
              style={{
                marginTop: "10px",
                color: "#22c55e",
                fontWeight: "bold",
              }}
            >
              🔴 Live Tracking Active
            </div>
          </div>
        ))
      )}
    </div>
  );
}