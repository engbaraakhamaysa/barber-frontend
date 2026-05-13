// import { Outlet, useNavigate } from "react-router-dom";
// import * as FaIcons from "react-icons/fa";
// import "../styles/layout.css";

// const FaHomeIcon = FaIcons.FaHome as any;
// const FaUserPlusIcon = FaIcons.FaUserPlus as any;
// const FaClockIcon = FaIcons.FaClock as any;
// const FaCalendarAltIcon = FaIcons.FaCalendarAlt as any;
// const FaSignOutAltIcon = FaIcons.FaSignOutAlt as any;

// const MainLayout = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   return (
//     <div>
//       {/* الصفحة نفسها */}
//       <Outlet />

//       {/* Bottom Nav يظهر بكل الصفحات */}
//       <nav className="bottom-nav">
//         <button className="nav-item" onClick={() => navigate("/")}>
//           <FaHomeIcon />
//         </button>

//         <button className="nav-item" onClick={() => navigate("/adduser")}>
//           <FaUserPlusIcon />
//         </button>

//         <button className="nav-item" onClick={() => navigate("/addtime")}>
//           <FaClockIcon />
//         </button>

//         <button className="nav-item" onClick={() => navigate("/showtime")}>
//           <FaCalendarAltIcon />
//         </button>

//         <button className="nav-item logout" onClick={handleLogout}>
//           <FaSignOutAltIcon />
//         </button>
//       </nav>
//     </div>
//   );
// };

// export default MainLayout;

import { Outlet, useNavigate, useLocation } from "react-router-dom";

import * as FaIcons from "react-icons/fa";
import "../styles/layout.css";

const FaHomeIcon = FaIcons.FaHome as any;
const FaUserPlusIcon = FaIcons.FaUserPlus as any;
const FaClockIcon = FaIcons.FaClock as any;
const FaCalendarAltIcon = FaIcons.FaCalendarAlt as any;
const FaSignOutAltIcon = FaIcons.FaSignOutAlt as any;

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const titles: Record<string, string> = {
    "/": "Dashboard",
    "/adduser": "Add User",
    "/addtime": "Add Time",
    "/showtime": "Bookings",
  };

  const pageTitle = titles[location.pathname] || "Barber App";

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="layout-container">
      {/* Top Header */}
      <header className="top-bar">
        <h2>{pageTitle}</h2>
      </header>

      {/* Page Content */}
      <main className="page-content">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <button
          className={`nav-item ${location.pathname === "/" ? "active" : ""}`}
          onClick={() => navigate("/")}
        >
          <FaHomeIcon />
        </button>

        <button
          className={`nav-item ${
            location.pathname === "/adduser" ? "active" : ""
          }`}
          onClick={() => navigate("/adduser")}
        >
          <FaUserPlusIcon />
        </button>

        <button
          className={`nav-item ${
            location.pathname === "/addtime" ? "active" : ""
          }`}
          onClick={() => navigate("/addtime")}
        >
          <FaClockIcon />
        </button>

        <button
          className={`nav-item ${
            location.pathname === "/showtime" ? "active" : ""
          }`}
          onClick={() => navigate("/showtime")}
        >
          <FaCalendarAltIcon />
        </button>

        <button className="nav-item logout" onClick={handleLogout}>
          <FaSignOutAltIcon />
        </button>
      </nav>
    </div>
  );
};

export default MainLayout;
