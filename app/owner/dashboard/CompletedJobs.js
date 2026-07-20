export default function CompletedJobs({
  jobs,
  payFullAmount,
  payCash,
  payCustomAmount,
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
            <h3>👷 {job.labourName}</h3>

            <p>
              Total Amount :
              ₹{job.totalAmount || 700}
            </p>

            <p>
              Paid :
              ₹{job.paidAmount || 0}
            </p>

            <p>
              Remaining :
              ₹
              {job.remainingAmount ??
                job.totalAmount ??
                700}
            </p>

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "15px",
                flexWrap: "wrap",
              }}
            >
              <button
                className="primary-btn"
                onClick={() =>
                  payFullAmount(job)
                }
              >
                📱 Pay Full
              </button>

              <button
                className="primary-btn"
                style={{
                  background:
                    "linear-gradient(135deg,#f59e0b,#d97706)",
                }}
                onClick={() =>
                  payCash(job)
                }
              >
                💵 Cash
              </button>

              <button
                className="primary-btn"
                style={{
                  background:
                    "linear-gradient(135deg,#8b5cf6,#7c3aed)",
                }}
                onClick={() =>
                  payCustomAmount(job)
                }
              >
                ✏️ Custom Amount
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
