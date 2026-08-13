// Protects routes from unauthenticated users.
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

import { useAuthContext } from "../providers/AuthProvider";

// Props for protected content.
interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuthContext();

  // Wait for authentication state.
  if (loading) {
    return <div>Loading...</div>;
  }

  // Redirect unauthenticated users.
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Render protected content.
  return <>{children}</>;
}
