import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../../context/AuthContext";

import "../styles/bottom-nav.css";

export default function BottomNav() {
  const navigate = useNavigate();

  const { logout } = useAuthContext();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bottom-nav">
      <button onClick={() => navigate("/")}>Home</button>

      <button onClick={() => navigate("/profile")}>Profile</button>

      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}
