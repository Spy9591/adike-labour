export default function DashboardHeader({
  owner,
  logout
}) {
  return (
    <div className="glass-card header-card">
      <div>
        <h1>🏡 Farm Owner Dashboard</h1>
        <p>Welcome {owner?.name}</p>
      </div>

      <button
        className="danger-btn"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}
