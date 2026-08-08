import { Link } from "react-router-dom";

import "../styles/auth-header.css";

export default function AuthHeader() {
  return (
    <header className="auth-header">
      <Link to="/" className="auth-logo">
        ✂ Barber App
      </Link>

      <nav className="auth-nav">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
    </header>
  );
}
