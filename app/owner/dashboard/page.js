"use client";

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "../../firebase";

export default function OwnerDashboard() {
  const [runningJobs, setRunningJobs] =
    useState([]);

  const [completedJobs, setCompletedJobs] =
    useState([]);

  const [cancelledJobs, setCancelledJobs] =
    useState([]);

  useEffect(() => {
    loadBookings();
  }, []);

  const calculateAmount = (
    startTime
  ) => {
    if (!startTime) return 700;

    const diff =
      new Date() -
      startTime.toDate();

    const hours =
      diff / 3600000;

    let amount = 700;

    if (hours > 9) {
      const extraMinutes =
        (hours - 9) * 60;

      const blocks =
        Math.ceil(
          extraMinutes / 30
        );

      amount += blocks * 50;
    }

    return amount;
  };

  const loadBookings =
    async () => {
      const ownerId =
        localStorage.getItem(
          "ownerId"
        );

      const snapshot =
        await getDocs(
          query(
            collection(
              db,
              "bookings"
            ),
            where(
              "ownerId",
              "==",
              ownerId
            )
          )
        );

      const running =
        [];

      const completed =
        [];

      const cancelled =
        [];

      snapshot.forEach(
        (doc) => {
          const booking =
            {
              id: doc.id,
              ...doc.data(),
            };

          if (
            booking.status ===
            "accepted"
          ) {
            running.push(
              booking
            );
          }

          if (
            booking.status ===
            "completed"
          ) {
            completed.push(
              booking
            );
          }

          if (
            booking.status ===
            "cancelled" ||
            booking.status ===
              "rejected"
          ) {
            cancelled.push(
              booking
            );
          }
        }
      );

      setRunningJobs(
        running
      );

      setCompletedJobs(
        completed
      );

      setCancelledJobs(
        cancelled
      );
    };

  const pageStyle = {
    minHeight: "100vh",
    padding: "20px",

    background:
      "linear-gradient(135deg,#0f172a,#1e3a8a,#2563eb)",
  };

  const cardStyle = {
    background:
      "rgba(255,255,255,.08)",

    backdropFilter:
      "blur(20px)",

    borderRadius: "20px",

    padding: "20px",

    color: "white",

    marginBottom:
      "15px",
  };

  return (
    <div style={pageStyle}>
      <div
        style={cardStyle}
      >
        <h1>
          🏡 Owner Dashboard
        </h1>
      </div>

      <div
        style={cardStyle}
      >
        <h2>
          🟠 Running Jobs
        </h2>

        {runningJobs.length ===
        0 ? (
          <p>
            No Running Jobs
          </p>
        ) : (
          runningJobs.map(
            (job) => (
              <div
                key={
                  job.id
                }
                style={{
                  marginTop:
                    "15px",
                }}
              >
                <p>
                  👷 Labour:
                  {" "}
                  {
                    job.labourName
                  }
                </p>

                <p>
                  Status:
                  {" "}
                  {
                    job.status
                  }
                </p>

                {job.startTime && (
                  <p>
                    💰 Current
                    Amount:
                    ₹
                    {calculateAmount(
                      job.startTime
                    )}
                  </p>
                )}

                <button
                  onClick={() =>
                    window.open(
                      `https://www.google.com/maps`
                    )
                  }
                  style={{
                    padding:
                      "10px",
                    border:
                      "none",
                    borderRadius:
                      "10px",
                    background:
                      "#22c55e",
                    color:
                      "white",
                  }}
                >
                  📍 Track
                  Labour
                </button>
              </div>
            )
          )
        )}
      </div>

      <div
        style={cardStyle}
      >
        <h2>
          ✅ Completed
          Jobs
        </h2>

        {completedJobs.length ===
        0 ? (
          <p>
            No Completed
            Jobs
          </p>
        ) : (
          completedJobs.map(
            (job) => (
              <div
                key={
                  job.id
                }
              >
                <p>
                  👷{" "}
                  {
                    job.labourName
                  }
                </p>

                <p>
                  ₹
                  {job.totalAmount ||
                    700}
                </p>
              </div>
            )
          )
        )}
      </div>

      <div
        style={cardStyle}
      >
        <h2>
          ❌ Cancelled
          Jobs
        </h2>

        {cancelledJobs.length ===
        0 ? (
          <p>
            No Cancelled
            Jobs
          </p>
        ) : (
          cancelledJobs.map(
            (job) => (
              <div
                key={
                  job.id
                }
              >
                <p>
                  👷{" "}
                  {
                    job.labourName
                  }
                </p>

                <p>
                  {
                    job.status
                  }
                </p>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}
