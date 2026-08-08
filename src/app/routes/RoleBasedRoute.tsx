import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

import { useAuthContext } from "../providers/AuthProvider";
import type { UserRole } from "../../features/users/users.types";

interface RoleBasedRouteProps {
  children: ReactNode;
  allowedRoles: UserRole[];
}

export default function RoleBasedRoute({
  children,
  allowedRoles,
}: RoleBasedRouteProps) {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
