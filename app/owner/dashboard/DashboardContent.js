"use client";

import AvailableLabours from "./AvailableLabours";
import RunningJobs from "./RunningJobs";
import CompletedJobs from "./CompletedJobs";
import CancelledJobs from "./CancelledJobs";
import LiveTracking from "./LiveTracking";

export default function DashboardContent({
  selectedView,
  availableLabours,
  runningJobs,
  completedJobs,
  cancelledJobs,
  bookLabour,
  calculateAmount,
  payFullAmount,
  payCustomAmount,
}) {
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
          payFullAmount={payFullAmount}
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