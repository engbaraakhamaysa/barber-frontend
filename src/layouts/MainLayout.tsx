import { Outlet } from "react-router-dom";

import Header from "../components/common/Header";
import BottomNav from "../components/common/BottomNav";

import "./styles/main-layout.css";
import { useAuthContext } from "../app/providers/AuthProvider";

export default function MainLayout() {
  const { isAuthenticated } = useAuthContext();

  return (
    <div className="main-layout">
      <Header />

      <main className="main-content">
        <Outlet />
      </main>
      {isAuthenticated && <BottomNav />}
    </div>
  );
}
