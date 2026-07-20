export default function CompletedJobs({
  jobs,
  openPhonePe,
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
            <h3>
              👷 {job.labourName}
            </h3>

            <p>
              💰 Total Amount: ₹
              {job.totalAmount || 700}
            </p>

            <p>
              ✅ Paid Amount: ₹
              {job.paidAmount || 0}
            </p>

            <p>
              ⏳ Remaining Amount: ₹
              {job.remainingAmount ??
                job.totalAmount ??
                700}
            </p>

            <p>
              Payment Status:
              <strong>
                {" "}
                {job.paymentStatus ||
                  "Pending"}
              </strong>
            </p>

            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                marginTop: "15px",
              }}
            >
              <button
                className="primary-btn"
                onClick={openPhonePe}
              >
                📱 Open PhonePe
              </button>

              <button
                className="primary-btn"
                style={{
                  background:
                    "#f59e0b",
                }}
                onClick={() =>
                  payCash(job)
                }
              >
                💵 Cash Payment
              </button>

              <button
                className="primary-btn"
                style={{
                  background:
                    "#8b5cf6",
                }}
                onClick={() =>
                  payCustomAmount(
                    job
                  )
                }
              >
                ✏️ Partial Payment
              </button>
            </div>

            {job.paymentStatus ===
              "paid" && (
              <div
                style={{
                  marginTop:
                    "15px",
                  color:
                    "#22c55e",
                  fontWeight:
                    "bold",
                }}
              >
                ✅ Fully Paid
              </div>
            )}

            {job.paymentStatus ===
              "partial" && (
              <div
                style={{
                  marginTop:
                    "15px",
                  color:
                    "#f59e0b",
                  fontWeight:
                    "bold",
                }}
              >
                ⚠ Remaining ₹
                {job.remainingAmount}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
