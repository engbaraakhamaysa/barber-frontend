// Defines the application's main route tree.
import { Routes } from "react-router-dom";

// Route groups.
import authRoutes from "./auth.routes";
import adminRoutes from "./admin.routes";
import barberRoutes from "./barber.routes";

export default function AppRoutes() {
  return (
    // Centralizes all application routes.
    <Routes>
      {/* Authentication routes */}
      {authRoutes()}

      {/* Admin routes */}
      {adminRoutes()}

      {/* Barber routes */}
      {barberRoutes()}
    </Routes>
  );
}
