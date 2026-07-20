export default function LiveTracking({
  runningJobs,
}) {
  return (
    <div className="glass-card">
      <h2>📍 Track Labour</h2>

      {runningJobs.length === 0 ? (
        <p>No Active Labour Found</p>
      ) : (
        runningJobs.map((job) => (
          <div
            key={job.id}
            className="job-card"
          >
            <h3>
              👷 {job.labourName}
            </h3>

            {job.latitude &&
            job.longitude ? (
              <a
                href={/?q=${job.latitude},${job.longitude}`}
            ) : (
              <p>
                Location Not Available
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );
}
