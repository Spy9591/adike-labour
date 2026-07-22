"use client";

export default function CompletedJobs({
  jobs,
  payFullAmount,
  payCustomAmount,
}) {
  const pendingPayments = jobs.filter(
    (job) => job.paymentStatus !== "paid"
  );

  const completedPayments = jobs.filter(
    (job) => job.paymentStatus === "paid"
  );

  return (
    <>
      <div className="glass-card">
        <h2>💳 Pending Payments</h2>

        {pendingPayments.length === 0 ? (
          <p>No Pending Payments</p>
        ) : (
          pendingPayments.map((job) => (
            <div
              key={job.id}
              className="job-card"
            >
              <h3>
                👷 {job.labourName}
              </h3>

              <p>
                Total Amount : ₹
                {job.totalAmount || 700}
              </p>

              <p>
                Amount Due : ₹
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
                  ✅ Full Payment
                </button>

                <button
                  className="primary-btn"
                  style={{
                    background: "#8b5cf6",
                  }}
                  onClick={() =>
                    payCustomAmount(job)
                  }
                >
                  ✏️ Other Amount
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="glass-card">
        <h2>
          ✅ Completed Payments
        </h2>

        {completedPayments.length === 0 ? (
          <p>
            No Completed Payments
          </p>
        ) : (
          completedPayments.map((job) => (
            <div
              key={job.id}
              className="job-card"
            >
              <h3>
                👷 {job.labourName}
              </h3>

              <p>
                Total Amount : ₹
                {job.totalAmount || 0}
              </p>

              <p>
                Paid Amount : ₹
                {job.receivedAmount || 0}
              </p>

              <p
                style={{
                  color: "#22c55e",
                  fontWeight: "bold",
                }}
              >
                ✅ Payment Completed
              </p>
            </div>
          ))
        )}
      </div>
    </>
  );
}