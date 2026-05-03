import React, { useState } from "react";
import "../home.css";

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="home">
      <header className="header">
        <div className="logo">MyApp</div>

        {/* زر الموبايل */}
        <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        {/* القائمة */}
        <nav className={`nav ${menuOpen ? "active" : ""}`}>
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Services</a>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </header>

      <div className="content">
        <h1>Welcome 👋</h1>
        <p>This is your home page</p>
      </div>
    </div>
  );
};

export default Home;
