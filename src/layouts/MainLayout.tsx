import { Outlet } from "react-router-dom";

import Header from "../components/common/Header";
import BottomNav from "../components/common/BottomNav";

import "./styles/main-layout.css";

export default function MainLayout() {
  return (
    <div className="main-layout">
      <Header />

      <main className="main-content">
        <Outlet />
      </main>

      <BottomNav />
    </div>
  );
}
