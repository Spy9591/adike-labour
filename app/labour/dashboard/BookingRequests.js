"use client";

import {
  FaCheckCircle,
  FaTimesCircle,
  FaBell,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

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

              <p>
                <FaPhone />{" "}
                {booking.ownerPhone ||
                  "No Number"}
              </p>

              <p>
                <FaMapMarkerAlt />{" "}
                {booking.ownerVillage ||
                  "Village N/A"}
              </p>

              <p>
                📏{" "}
                {booking.distance || 0} KM
              </p>

              <p
                style={{
                  color: "#22C55E",
                  marginTop: "8px",
                  fontWeight: "600",
                }}
              >
                ₹
                {booking.totalAmount ||
                  700}
              </p>

              {booking.ownerLatitude &&
                booking.ownerLongitude && (
                  <a
                    href={`https://maps.google.com/?q=${booking.ownerLatitude},${booking.ownerLongitude}`}
                    target="_blank"
             )}
            </div>

            <div className="bookingBtns">
              <button
                className="acceptBtn"
                onClick={() =>
                  acceptBooking(
                    booking.id
                  )
                }
              >
                <FaCheckCircle />
                {" "}Accept
              </button>

              <button
                className="rejectBtn"
                onClick={() =>
                  rejectBooking(
                    booking.id
                  )
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