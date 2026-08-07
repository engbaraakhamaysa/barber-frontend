import { NavLink } from "react-router-dom";

import "../styles/bottom-nav.css";
export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/barber">Home</NavLink>

      <NavLink to="/barber/customers">Customers</NavLink>

      <NavLink to="/barber/bookings">Bookings</NavLink>

      <NavLink to="/barber/queue">Queue</NavLink>
    </nav>
  );
}
