import { Outlet } from "react-router-dom";

import BottomNav from "../components/layout/BottomNav";

export default function MainLayout() {
  return (
    <div>
      <main>
        <Outlet />
      </main>

      <BottomNav />
    </div>
  );
}
