"use client";

import { FaCheckCircle, FaTimesCircle, FaBell } from "react-icons/fa";
import "./dashboard.css";

export default function BookingRequests({
  bookings,
  acceptBooking,
  rejectBooking,
}) {
  return (
    <div className="card">
      <h2 className="cardTitle">
        <FaBell /> Booking Requests
      </h2>

      {bookings.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "40px 20px",
            color: "#cbd5e1",
          }}
        >
          <h3>No Booking Requests</h3>
          <p>You're all caught up 🎉</p>
        </div>
      ) : (
        bookings.map((booking) => (
          <div
            className="booking"
            key={booking.id}
          >
            <div>
              <h3 className="bookingName">
                {booking.ownerName}
              </h3>

              <p
                style={{
                  color: "#CBD5E1",
                  marginTop: "6px",
                }}
              >
                📍 New Service Request
              </p>

              <p
                style={{
                  color: "#22C55E",
                  marginTop: "5px",
                  fontWeight: "600",
                }}
              >
                ₹700 Estimated Payment
              </p>
            </div>

            <div className="bookingBtns">
              <button
                className="acceptBtn"
                onClick={() =>
                  acceptBooking(booking.id)
                }
              >
                <FaCheckCircle />
                {" "}Accept
              </button>

              <button
                className="rejectBtn"
                onClick={() =>
                  rejectBooking(booking.id)
                }
              >
                <FaTimesCircle />
                {" "}Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
