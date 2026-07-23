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
        <FaBell />
        {" "}
        Booking Requests (
        {bookings.length})
      </h2>

      {bookings.length === 0 ? (
        <p>
          No Booking Requests
        </p>
      ) : (
        bookings.map((booking) => (
          <div
            key={booking.id}
            className="booking"
          >

            <div>

              <h3>
                {booking.ownerName}
              </h3>

              <p>
                <FaPhone />
                {" "}
                {booking.ownerPhone ||
                  "No Number"}
              </p>

              <p>
                <FaMapMarkerAlt />
                {" "}
                {booking.ownerVillage ||
                  "Village N/A"}
              </p>

              <p>
                📏{" "}
                {booking.distance ||
                  0}
                {" "}KM
              </p>

              <div
                className="jobStatusBadge"
              >
                💰 ₹
                {booking.totalAmount ||
                  700}
              </div>

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
                {" "}
                Accept
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
                {" "}
                Reject
              </button>

            </div>

          </div>
        ))
      )}

    </div>
  );
}