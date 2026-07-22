"use client";

export default function CompletedJobs({
  jobs,
  payFullAmount,
  payCustomAmount,
}) {
  const pendingPayments =
    jobs.filter(
      (job) =>
        (job.remainingAmount ??
          0) > 0
    );

  const completedPayments =
    jobs.filter(
      (job) =>
        (job.remainingAmount ??
          0) === 0
    );

  return (
    <>
      <div className="glass-card">
        <h2>
          💳 Pending Payments
        </h2>

        {pendingPayments.map(
          (job) => (
            <div
              key={job.id}
              className="payment-processing-card"
            >
              <h3>
                👷 {job.labourName}
              </h3>

              <div className="payment-row">
                <span>Total</span>
                <span>
                  ₹{job.totalAmount}
                </span>
              </div>

              <div className="payment-row">
                <span>Paid</span>
                <span>
                  ₹
                  {job.receivedAmount ||
                    0}
                </span>
              </div>

              <div className="payment-row">
                <span>Due</span>
                <span>
                  ₹
                  {job.remainingAmount}
                </span>
              </div>

              <div className="loader-ring" />

              <div className="payment-actions">
                <button
                  className="primary-btn"
                  onClick={() =>
                    payFullAmount(
                      job
                    )
                  }
                >
                  ✅ Full Payment
                </button>

                <button
                  className="send-request-btn"
                  onClick={() =>
                    payCustomAmount(
                      job
                    )
                  }
                >
                  🟠 Other Amount
                </button>
              </div>
            </div>
          )
        )}
      </div>

      <div className="glass-card">
        <h2>
          ✅ Completed Payments
        </h2>

        {completedPayments.map(
          (job) => (
            <div
              key={job.id}
              className="glass-payment-success"
            >
              <div className="success-circle">
                ✓
              </div>

              <h3>
                Payment Completed
              </h3>

              <div className="payment-row">
                <span>Total</span>
                <span>
                  ₹{job.totalAmount}
                </span>
              </div>

              <div className="payment-row">
                <span>Paid</span>
                <span>
                  ₹
                  {job.receivedAmount}
                </span>
              </div>

              <div className="payment-row">
                <span>Due</span>
                <span>₹0</span>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
}