export default function RunningJobs({
  jobs,
  calculateAmount
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
            className="job-card"
          >
            <h3>{job.labourName}</h3>

            <p>
              Status : {job.status}
            </p>

            {job.startTime && (
              <p>
                Current Amount :
                ₹
                {calculateAmount(
                  job.startTime
                )}
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );
}
