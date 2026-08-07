import { Outlet } from "react-router-dom";

import BottomNav from "../components/barber/BottomNav";

import "./styles/barber-layout.css";

export default function BarberLayout() {
  return (
    <div className="barber-app">
      <header className="barber-header">
        <h2>Barber App</h2>
      </header>

      <main className="barber-content">
        <Outlet />
      </main>

      <BottomNav />
    </div>
  );
}
