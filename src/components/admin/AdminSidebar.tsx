import { NavLink } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <nav>
        <NavLink to="/admin">Dashboard</NavLink>

        <NavLink to="/admin/shops">Shops</NavLink>

        <NavLink to="/admin/users">Users</NavLink>

        <NavLink to="/admin/customers">Customers</NavLink>

        <NavLink to="/admin/bookings">Bookings</NavLink>
      </nav>
    </aside>
  );
}
