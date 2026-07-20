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
            style={{
              marginBottom: "20px",
            }}
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
              💳 Payment Status:
              {" "}
              <strong>
                {job.paymentStatus ||
                  "Pending"}
              </strong>
            </p>

            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                marginTop: "15px",
              }}
            >
              <button
                className="primary-btn"
                onClick={() =>
                  payFullAmount(job)
                }
                disabled={
                  job.paymentStatus ===
                  "paid"
                }
              >
                📱 Pay Full Amount
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
                disabled={
                  job.paymentStatus ===
                  "paid"
                }
              >
                💵 Pay Cash
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
                disabled={
                  job.paymentStatus ===
                  "paid"
                }
              >
                ✏️ Custom Amount
              </button>
            </div>

            {job.paymentStatus ===
              "paid" && (
              <div
                style={{
                  marginTop: "15px",
                  padding: "10px",
                  borderRadius:
                    "10px",
                  background:
                    "rgba(34,197,94,0.2)",
                  color: "#22c55e",
                  fontWeight:
                    "bold",
                }}
              >
                ✅ Payment Completed
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
