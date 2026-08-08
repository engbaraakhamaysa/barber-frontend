import { Outlet } from "react-router-dom";

import AuthHeader from "../components/auth/AuthHeader";

import "./styles/auth-layout.css";

export default function AuthLayout() {
  return (
    <div className="auth-layout">
      <AuthHeader />

      <main className="auth-container">
        <div className="auth-wrapper">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
