export default function StatsCards({
  availableLabours,
  runningJobs,
  completedJobs,
  cancelledJobs,
  setSelectedView,
}) {
  return (
    <div className="stats-grid">
      <div
        className="stat-card"
        onClick={() =>
          setSelectedView(
            "available"
          )
        }
      >
        <h2>{availableLabours}</h2>
        <p>👷 Available Labour</p>
      </div>

      <div
        className="stat-card"
        onClick={() =>
          setSelectedView(
            "running"
          )
        }
      >
        <h2>{runningJobs}</h2>
        <p>🚜 Running Jobs</p>
      </div>

      <div
        className="stat-card"
        onClick={() =>
          setSelectedView(
            "completed"
          )
        }
      >
        <h2>{completedJobs}</h2>
        <p>✅ Completed Jobs</p>
      </div>

      <div
        className="stat-card"
        onClick={() =>
          setSelectedView(
            "cancelled"
          )
        }
      >
        <h2>{cancelledJobs}</h2>
        <p>❌ Cancelled Jobs</p>
      </div>
    </div>
  );
}
