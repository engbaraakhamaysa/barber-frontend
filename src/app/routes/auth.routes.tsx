// Defines the authentication route group.
import { Route } from "react-router-dom";

// Auth pages.
import Login from "../../pages/auth/Login";
import Register from "../../pages/auth/Register";

// Shared layout.
import MainLayout from "../../layouts/MainLayout";

function Home() {
  return <div>Home</div>;
}

export default function authRoutes() {
  return (
    // Uses MainLayout for all auth-related pages.
    <Route element={<MainLayout />}>
      {/* /login */}
      <Route path="/login" element={<Login />} />

      {/* /register */}
      <Route path="/register" element={<Register />} />

      {/* / */}
      <Route path="/" element={<Home />} />
    </Route>
  );
}
