"use client";

export default function CompletedJobs({
  jobs,
  payFullAmount,
  payCustomAmount,
}) {
  return (
    <div className="glass-card">
      <h2>💳 Payments</h2>

      {jobs.length === 0 ? (
        <p>No Jobs Found</p>
      ) : (
        jobs.map((job) => (
          <div
            key={job.id}
            className={
              (job.remainingAmount || 0) > 0
                ? "glass-payment-warning"
                : "glass-payment-success"
            }
          >
            {(job.remainingAmount || 0) > 0 ? (
              <>
                <h2>
                  💰 Pending Payment
                </h2>

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

                <div className="payment-actions">
                  <button
                    className="glass-btn"
                    onClick={() =>
                      payFullAmount(job)
                    }
                  >
                    ✅ Full Payment
                  </button>

                  <button
                    className="glass-btn"
                    onClick={() =>
                      payCustomAmount(job)
                    }
                  >
                    💳 Other Amount
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="success-circle">
                  ✓
                </div>

                <h2>
                  Payment Completed
                </h2>

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
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}