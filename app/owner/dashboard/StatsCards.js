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
          setSelectedView("available")
        }
        style={{ cursor: "pointer" }}
      >
        <h3>
          {availableLabours}
        </h3>

        <span>
          Available Labour
        </span>
      </div>

      <div
        className="stat-card"
        onClick={() =>
          setSelectedView("running")
        }
        style={{ cursor: "pointer" }}
      >
        <h3>{runningJobs}</h3>

        <span>
          Running Jobs
        </span>
      </div>

      <div
        className="stat-card"
        onClick={() =>
          setSelectedView("completed")
        }
        style={{ cursor: "pointer" }}
      >
        <h3>
          {completedJobs}
        </h3>

        <span>
          Completed Jobs
        </span>
      </div>

      <div
        className="stat-card"
        onClick={() =>
          setSelectedView("cancelled")
        }
        style={{ cursor: "pointer" }}
      >
        <h3>
          {cancelledJobs}
        </h3>

        <span>
          Cancelled Jobs
        </span>
      </div>
    </div>
  );
}
