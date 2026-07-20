export default function CancelledJobs({
  jobs
}) {
  return (
    <div className="glass-card">
      <h2>❌ Cancelled Jobs</h2>

      {jobs.length === 0 ? (
        <p>No Cancelled Jobs</p>
      ) : (
        jobs.map((job) => (
          <div
            key={job.id}
            className="job-card"
          >
            <h3>{job.labourName}</h3>

            <p>{job.status}</p>
          </div>
        ))
      )}
    </div>
  );
}
