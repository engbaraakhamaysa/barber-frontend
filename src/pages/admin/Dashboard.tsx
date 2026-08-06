import "./styles/dashboard.css";

export default function Dashboard() {
  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>

        <p>Welcome to Barber Management System</p>
      </div>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Shops</h3>

          <span>0</span>

          <p>Total barber shops</p>
        </div>

        <div className="dashboard-card">
          <h3>Barbers</h3>

          <span>0</span>

          <p>Total barbers</p>
        </div>

        <div className="dashboard-card">
          <h3>Customers</h3>

          <span>0</span>

          <p>Registered customers</p>
        </div>

        <div className="dashboard-card">
          <h3>Bookings</h3>

          <span>0</span>

          <p>Total bookings</p>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Quick Actions</h2>

        <div className="quick-actions">
          <button>Add Shop</button>

          <button>Add Barber</button>

          <button>View Bookings</button>
        </div>
      </div>
    </div>
  );
}
