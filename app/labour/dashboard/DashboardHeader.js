"use client";

import {
  FaUserCircle,
  FaMapMarkerAlt,
  FaBell,
} from "react-icons/fa";

import { FiLogOut } from "react-icons/fi";

import "./dashboard.css";

export default function DashboardHeader({
  labour,
  toggleDuty,
  logout,
  notifications = [],
  showNotifications,
  setShowNotifications,
}) {
  return (
    <>
      <div className="header">

        <div className="profile">

          <div className="avatar">
            <FaUserCircle size={40} />
          </div>

          <div>

            <h1 className="name">
              {labour.name}
            </h1>

            <p className="location">
              <FaMapMarkerAlt />
              {" "}
              {labour.village}
            </p>

            <p>
              📞{" "}
              {labour.mobile ||
                labour.phone ||
                "Not Available"}
            </p>

          </div>

        </div>

        <div className="headerActions">

          <button
            className="notificationBell"
            onClick={() =>
              setShowNotifications(
                !showNotifications
              )
            }
          >
            <FaBell />

            {notifications.length >
              0 && (
              <span className="notificationCount">
                {
                  notifications.length
                }
              </span>
            )}
          </button>

          <button
            className="logoutBtn"
            onClick={logout}
          >
            <FiLogOut />
            {" "}
            Logout
          </button>

        </div>

        {showNotifications && (
          <div className="notificationPopup">

            <h3>
              🔔 Notifications
            </h3>

            {notifications
              .length === 0 ? (
              <div className="notificationItem">
                No Notifications
              </div>
            ) : (
              notifications.map(
                (item) => (
                  <div
                    key={
                      item.id
                    }
                    className="notificationItem"
                  >
                    {item.message}
                  </div>
                )
              )
            )}

          </div>
        )}

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