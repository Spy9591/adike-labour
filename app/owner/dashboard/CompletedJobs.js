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
          job.totalAmount ??
          700) > 0
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
          🟠 Pending Payments
        </h2>

        {pendingPayments.length ===
        0 ? (
          <p>
            No Pending Payments
          </p>
        ) : (
          pendingPayments.map(
            (job) => (
              <div
                key={job.id}
                className="payment-card payment-partial"
              >
                <div className="payment-header">
                  <h3>
                    👷{" "}
                    {job.labourName}
                  </h3>
                </div>

                <div className="payment-row">
                  <span>
                    Total Amount
                  </span>

                  <span>
                    ₹
                    {job.totalAmount ||
                      700}
                  </span>
                </div>

                <div className="payment-row">
                  <span>
                    Paid Amount
                  </span>

                  <span className="paid-amount">
                    ₹
                    {job.receivedAmount ||
                      0}
                  </span>
                </div>

                <div className="payment-row">
                  <span>
                    Due Amount
                  </span>

                  <span className="due-amount">
                    ₹
                    {job.remainingAmount ??
                      job.totalAmount ??
                      700}
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap:
                      "wrap",
                    marginTop:
                      "15px",
                  }}
                >
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
                    className="primary-btn"
                    style={{
                      background:
                        "#9333ea",
                    }}
                    onClick={() =>
                      payCustomAmount(
                        job
                      )
                    }
                  >
                    🟠 Partial
                    Payment
                  </button>
                </div>
              </div>
            )
          )
        )}
      </div>

      <div className="glass-card">
        <h2>
          ✅ Completed Payments
        </h2>

        {completedPayments.length ===
        0 ? (
          <p>
            No Completed Payments
          </p>
        ) : (
          completedPayments.map(
            (job) => (
              <div
                key={job.id}
                className="payment-card payment-success"
              >
                <h3>
                  👷{" "}
                  {job.labourName}
                </h3>

                <div className="payment-row">
                  <span>
                    Total Amount
                  </span>

                  <span>
                    ₹
                    {job.totalAmount}
                  </span>
                </div>

                <div className="payment-row">
                  <span>
                    Paid Amount
                  </span>

                  <span className="paid-amount">
                    ₹
                    {job.receivedAmount}
                  </span>
                </div>

                <div className="payment-row">
                  <span>
                    Due Amount
                  </span>

                  <span>
                    ₹0
                  </span>
                </div>

                <div
                  style={{
                    marginTop:
                      "10px",
                    fontSize:
                      "18px",
                    fontWeight:
                      "bold",
                  }}
                >
                  ✅ Payment
                  Completed
                </div>
              </div>
            )
          )
        )}
      </div>
    </>
  );
}