"use client";

import { FaUserCircle, FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import "./dashboard.css";

export default function DashboardHeader({
  labour,
  toggleDuty,
  logout,
}) {
  return (
    <>
      <div className="header">
        <div className="profile">
          <div className="avatar">
            <FaUserCircle size={40} />
          </div>

          <div>
            <h1 className="name">{labour.name}</h1>

            <p className="location">
              <FaMapMarkerAlt /> {labour.village}
            </p>

            <p className="rating">
              <FaStar /> {labour.rating || 0}
            </p>
          </div>
        </div>

        <button
          className="logoutBtn"
          onClick={logout}
        >
          <FiLogOut />
          {" "}Logout
        </button>
      </div>

      <button
        onClick={toggleDuty}
        className={`dutyBtn ${
          labour.onDuty
            ? "dutyOn"
            : "dutyOff"
        }`}
      >
        {labour.onDuty
          ? "🔴 Go Off Duty"
          : "🟢 Go On Duty"}
      </button>
    </>
  );
}
