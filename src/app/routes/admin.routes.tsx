// Defines the admin route group.
import { Route } from "react-router-dom";

// Admin layout.
import AdminLayout from "../../layouts/AdminLayout";

// Route guards.
import ProtectedRoute from "../guards/ProtectedRoute";
import RoleBasedRoute from "../guards/RoleBasedRoute";

// Admin dashboard.
import Dashboard from "../../pages/admin/Dashboard";

// Shop pages.
import ShopsList from "../../pages/admin/shop/ShopsList";
import CreateShop from "../../pages/admin/shop/CreateShop";
import EditShop from "../../pages/admin/shop/EditShop";
import ShopDetails from "../../pages/admin/shop/ShopDetails";

// User pages.
import UsersList from "../../pages/admin/users/UsersList";
import CreateUser from "../../pages/admin/users/CreateUser";
import UserDetails from "../../pages/admin/users/UserDetails";
import EditUser from "../../pages/admin/users/EditUser";

// Barber pages.
import BarbersList from "../../pages/admin/barber/BarbersList";
import CreateBarber from "../../pages/admin/barber/CreateBarber";
import EditBarber from "../../pages/admin/barber/EditBarber";
import BarberDetails from "../../pages/admin/barber/BarberDetails";

export default function adminRoutes() {
  return (
    // Protects all admin routes and checks the user's role.
    <Route
      path="/admin"
      element={
        <ProtectedRoute>
          <RoleBasedRoute allowedRoles={["admin"]}>
            <AdminLayout />
          </RoleBasedRoute>
        </ProtectedRoute>
      }
    >
      {/* Default admin page: /admin */}
      <Route index element={<Dashboard />} />

      {/* Shop routes */}
      <Route path="shops" element={<ShopsList />} />
      <Route path="shops/create" element={<CreateShop />} />
      <Route path="shops/:id/edit" element={<EditShop />} />
      <Route path="shops/:id" element={<ShopDetails />} />

      {/* User routes */}
      <Route path="users" element={<UsersList />} />
      <Route path="users/create" element={<CreateUser />} />
      <Route path="users/:id" element={<UserDetails />} />
      <Route path="users/:id/edit" element={<EditUser />} />

      {/* Barber routes */}
      <Route path="shops/:shopId/barbers" element={<BarbersList />} />
      <Route path="shops/:shopId/barbers/create" element={<CreateBarber />} />
      <Route path="shops/:shopId/barbers/:id" element={<BarberDetails />} />
      <Route path="shops/:shopId/barbers/:id/edit" element={<EditBarber />} />
    </Route>
  );
}
