// import { Outlet, useNavigate, useLocation } from "react-router-dom";

// export default function AdminLayout() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const isActive = (path: string) => location.pathname.includes(path);

//   return (
//     <div
//       style={{
//         height: "100vh",
//         display: "flex",
//         flexDirection: "column",
//         background: "#f5f5f5",
//         fontFamily: "Arial",
//       }}
//     >
//       {/* Top Bar */}
//       <div
//         style={{
//           height: "50px",
//           background: "#111",
//           color: "white",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           fontWeight: "bold",
//         }}
//       >
//         Barber Admin
//       </div>

//       {/* Content */}
//       <div style={{ flex: 1, padding: "16px", overflowY: "auto" }}>
//         <Outlet />
//       </div>

//       {/* Bottom Navigation */}
//       <div
//         style={{
//           height: "60px",
//           background: "#fff",
//           borderTop: "1px solid #ddd",
//           display: "flex",
//           justifyContent: "space-around",
//           alignItems: "center",
//         }}
//       >
//         <button
//           onClick={() => navigate("/admin")}
//           style={{
//             background: "none",
//             border: "none",
//             color: isActive("/admin") ? "blue" : "#444",
//             fontSize: "16px",
//           }}
//         >
//           🏠
//         </button>

//         <button
//           onClick={() => navigate("/admin/users")}
//           style={{
//             background: "none",
//             border: "none",
//             color: isActive("/users") ? "blue" : "#444",
//             fontSize: "16px",
//           }}
//         >
//           👥
//         </button>

//         <button
//           onClick={() => navigate("/admin/appointments")}
//           style={{
//             background: "none",
//             border: "none",
//             color: isActive("/appointments") ? "blue" : "#444",
//             fontSize: "16px",
//           }}
//         >
//           📅
//         </button>
//       </div>
//     </div>
//   );
// }

import { Outlet, useNavigate, useLocation } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#f5f5f5",
        fontFamily: "Arial",
      }}
    >
      {/* Top Bar */}
      <div
        style={{
          height: "50px",
          background: "#111",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
        }}
      >
        Barber Admin
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: "16px", overflowY: "auto" }}>
        <Outlet />
      </div>

      {/* Bottom Navigation */}
      <div
        style={{
          height: "60px",
          background: "#fff",
          borderTop: "1px solid #ddd",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <button
          onClick={() => navigate("/admin")}
          style={{
            background: "none",
            border: "none",
            color: isActive("/admin") ? "blue" : "#444",
            fontSize: "16px",
          }}
        >
          🏠
        </button>

        <button
          onClick={() => navigate("/admin/users")}
          style={{
            background: "none",
            border: "none",
            color: isActive("/admin/users") ? "blue" : "#444",
            fontSize: "16px",
          }}
        >
          👥
        </button>

        <button
          onClick={() => navigate("/admin/booking")}
          style={{
            background: "none",
            border: "none",
            color: isActive("/admin/booking") ? "blue" : "#444",
            fontSize: "16px",
          }}
        >
          📅
        </button>
      </div>
    </div>
  );
}
