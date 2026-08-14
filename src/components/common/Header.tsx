import { Link } from "react-router-dom";

import "./header.css";
import { useAuthContext } from "../../app/providers/AuthProvider";

export default function Header() {
  const { isAuthenticated, logout, user } = useAuthContext();

  return (
    <header className="app-header">
      <Link to="/" className="app-logo">
        ✂ Barber App
      </Link>

      <nav className="app-nav">
        {isAuthenticated ? (
          <>
            <Link to="/">Home</Link>

            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
