import { Routes, Route } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import AdminLayout from "../../layouts/AdminLayout";
import BarberLayout from "../../layouts/BarberLayout";

import ProtectedRoute from "./ProtectedRoute";
import RoleBasedRoute from "./RoleBasedRoute";

import Dashboard from "../../pages/admin/Dashboard";

import ShopsList from "../../pages/admin/shop/ShopsList";
import CreateShop from "../../pages/admin/shop/CreateShop";
import EditShop from "../../pages/admin/shop/EditShop";
import ShopDetails from "../../pages/admin/shop/ShopDetails";

import UsersList from "../../pages/admin/users/UsersList";
import CreateUser from "../../pages/admin/users/CreateUser";
import UserDetails from "../../pages/admin/users/UserDetails";
import EditUser from "../../pages/admin/users/EditUser";

import BarbersList from "../../pages/admin/barber/BarbersList";
import CreateBarber from "../../pages/admin/barber/CreateBarber";
import EditBarber from "../../pages/admin/barber/EditBarber";
import BarberDetails from "../../pages/admin/barber/BarberDetails";

import DashboardBarber from "../../pages/barber/Dashboard";
import Customers from "../../pages/barber/Customers";
import Bookings from "../../pages/barber/Bookings";
import CreateCustomer from "../../pages/barber/CreateCustomer";
import EditCustomer from "../../pages/barber/EditCustomer";
import Queue from "../../pages/barber/Queue";

function Profile() {
  return <div>Profile</div>;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* BARBER */}

      <Route
        path="/barber"
        element={
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={["barber"]}>
              <BarberLayout />
            </RoleBasedRoute>
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardBarber />} />

        <Route path="customers" element={<Customers />} />

        <Route path="customers/create" element={<CreateCustomer />} />

        <Route path="customers/:id/edit" element={<EditCustomer />} />

        <Route path="queue" element={<Queue />} />

        <Route path="bookings" element={<Bookings />} />
      </Route>

      {/* ADMIN PANEL */}

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
        <Route index element={<Dashboard />} />

        {/* SHOPS */}

        <Route path="shops" element={<ShopsList />} />

        <Route path="shops/create" element={<CreateShop />} />

        <Route path="shops/:id/edit" element={<EditShop />} />

        <Route path="shops/:id" element={<ShopDetails />} />

        {/* USERS */}

        <Route path="users" element={<UsersList />} />

        <Route path="users/create" element={<CreateUser />} />

        <Route path="users/:id" element={<UserDetails />} />

        <Route path="users/:id/edit" element={<EditUser />} />

        {/* BARBERS */}

        <Route path="shops/:shopId/barbers" element={<BarbersList />} />

        <Route path="shops/:shopId/barbers/create" element={<CreateBarber />} />

        <Route path="shops/:shopId/barbers/:id" element={<BarberDetails />} />

        <Route path="shops/:shopId/barbers/:id/edit" element={<EditBarber />} />
      </Route>

      {/* NORMAL USER */}

      <Route
        element={
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={["user"]}>
              <MainLayout />
            </RoleBasedRoute>
          </ProtectedRoute>
        }
      >
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}
