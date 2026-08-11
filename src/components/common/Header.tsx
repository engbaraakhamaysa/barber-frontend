import { Link } from "react-router-dom";

import "./header.css";

export default function Header() {
  return (
    <header className="app-header">
      <Link to="/" className="app-logo">
        ✂ Barber App
      </Link>

      <nav className="app-nav">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
    </header>
  );
}
