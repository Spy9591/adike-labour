export default function CompletedJobs({
  jobs
}) {
  return (
    <div className="glass-card">
      <h2>✅ Completed Jobs</h2>

      {jobs.length === 0 ? (
        <p>No Completed Jobs</p>
      ) : (
        jobs.map((job) => (
          <div
            key={job.id}
            className="job-card"
          >
            <h3>{job.labourName}</h3>

            <p>
              ₹
              {job.totalAmount ||
                700}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
