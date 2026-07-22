"use client";

import AvailableLabours from "./AvailableLabours";
import RunningJobs from "./RunningJobs";
import CompletedJobs from "./CompletedJobs";
import CancelledJobs from "./CancelledJobs";
import LiveTracking from "./LiveTracking";

export default function DashboardContent({
  selectedView,
  availableLabours,
  hasScanned,
  runningJobs,
  completedJobs,
  cancelledJobs,
  bookLabour,
  calculateAmount,
  openPhonePe,
  payCash,
  payCustomAmount,
}) {
  if (
    selectedView === "available" &&
    !hasScanned
  ) {
    return (
      <div className="glass-card">
        <h2>🔍 Scan Nearby Labour</h2>

        <p>
          Click Scan Labour to find
          nearby available workers.
        </p>
      </div>
    );
  }

  return (
    <>
      {selectedView === "available" && (
        <AvailableLabours
          labours={availableLabours}
          bookLabour={bookLabour}
        />
      )}

      {selectedView === "running" && (
        <>
          <RunningJobs
            jobs={runningJobs}
            calculateAmount={calculateAmount}
          />

          <LiveTracking
            runningJobs={runningJobs}
          />
        </>
      )}

      {selectedView === "completed" && (
        <CompletedJobs
          jobs={completedJobs}
          openPhonePe={openPhonePe}
          payCash={payCash}
          payCustomAmount={payCustomAmount}
        />
      )}

      {selectedView === "cancelled" && (
        <CancelledJobs
          jobs={cancelledJobs}
        />
      )}
    </>
  );
}