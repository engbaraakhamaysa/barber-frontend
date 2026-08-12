import { Routes } from "react-router-dom";

import AuthRoutes from "./Auth.routes";
import AdminRoutes from "./Admin.routes";
import BarberRoutes from "./Barber.routes";

export default function AppRoutes() {
  return (
    <Routes>
      <AuthRoutes />
      <AdminRoutes />
      <BarberRoutes />
    </Routes>
  );
}
