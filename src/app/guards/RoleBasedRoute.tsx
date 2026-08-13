// Redirects users based on their role.
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

import { useAuthContext } from "../providers/AuthProvider";
import type { UserRole } from "../../features/users/users.types";

// Props required by the route guard.
interface RoleBasedRouteProps {
  children: ReactNode;
  allowedRoles: UserRole[];
}

export default function RoleBasedRoute({
  children,
  allowedRoles,
}: RoleBasedRouteProps) {
  const { user, loading } = useAuthContext();

  // Wait for authentication state.
  if (loading) {
    return <div>Loading...</div>;
  }

  // Redirect unauthenticated users.
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect users without the required role.
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // Render the protected content.
  return <>{children}</>;
}
