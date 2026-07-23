"use client";

export default function CompletedJobs({
  jobs,
  payFullAmount,
  payCustomAmount,
}) {
  const monthlySpend = jobs.reduce(
    (total, job) =>
      total + (job.receivedAmount || 0),
    0
  );

  const askCustomAmount = (job) => {
    const amount = prompt(
      `Enter amount (Due: ₹${job.remainingAmount || 0})`
    );

    if (!amount) return;

    payCustomAmount(job, amount);
  };

  return (
    <div className="glass-card">

      <div className="monthly-spend-card">
        <div>
          <p>Monthly Spend</p>

          <h1>₹{monthlySpend}</h1>
        </div>

        <div className="monthly-spend-icon">
          💰
        </div>
      </div>

      <h2>💳 Payments</h2>

      {jobs.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            💳
          </div>

          <p>No Jobs Found</p>
        </div>
      ) : (
        jobs.map((job) => {

          const total =
            job.totalAmount || 0;

          const paid =
            job.receivedAmount || 0;

          const due =
            job.remainingAmount || 0;

          const isCompleted =
            due === 0 &&
            job.status ===
              "completed";

          return (
            <div
              key={job.id}
              className={
                isCompleted
                  ? "glass-payment-success"
                  : "glass-payment-warning"
              }
            >
              {!isCompleted ? (
                <>
                  <h2>
                    💰 Payment Pending
                  </h2>

                  <div className="payment-row">
                    <span>
                      Labour
                    </span>

                    <span>
                      {job.labourName ||
                        "-"}
                    </span>
                  </div>

                  <div className="payment-row">
                    <span>
                      Total Amount
                    </span>

                    <span>
                      ₹{total}
                    </span>
                  </div>

                  <div className="payment-row paid-row">
                    <span>
                      Paid Amount
                    </span>

                    <span>
                      ₹{paid}
                    </span>
                  </div>

                  <div className="payment-row due-row">
                    <span>
                      Due Amount
                    </span>

                    <span>
                      ₹{due}
                    </span>
                  </div>

                  {job.paymentStatus ===
                  "processing" ? (
                    <div
                      className="jobStatusBadge"
                      style={{
                        marginTop:
                          "15px",
                      }}
                    >
                      ⏳ Waiting Labour
                      Approval
                    </div>
                  ) : (
                    <div className="payment-actions">

                      <button
                        className="glass-btn"
                        onClick={() =>
                          payFullAmount(
                            job
                          )
                        }
                      >
                        ✅ Full Payment
                      </button>

                      <button
                        className="glass-btn"
                        onClick={() =>
                          askCustomAmount(
                            job
                          )
                        }
                      >
                        💳 Other Amount
                      </button>

                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="success-circle">
                    ✓
                  </div>

                  <h2>
                    ✅ Payment Completed
                  </h2>

                  <div className="payment-row">
                    <span>
                      Total Amount
                    </span>

                    <span>
                      ₹{total}
                    </span>
                  </div>

                  <div className="payment-row">
                    <span>
                      Paid Amount
                    </span>

                    <span>
                      ₹{paid}
                    </span>
                  </div>

                  <div className="payment-row">
                    <span>
                      Due Amount
                    </span>

                    <span>₹0</span>
                  </div>

                  <div className="jobStatusBadge">
                    ✅ Fully Paid
                  </div>
                </>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}