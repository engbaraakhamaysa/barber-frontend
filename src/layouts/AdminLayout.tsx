import { Outlet } from "react-router-dom";

import AdminHeader from "../components/admin/AdminHeader";
import AdminSidebar from "../components/admin/AdminSidebar";

import "./styles/admin-layout.css";

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <AdminHeader />

      <div className="admin-body">
        <AdminSidebar />

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
