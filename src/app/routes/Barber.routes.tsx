import { Route } from "react-router-dom";

import RoleBasedRoute from "./RoleBasedRoute";
import ProtectedRoute from "./ProtectedRoute";

import MainLayout from "../../layouts/MainLayout";

import Dashboard from "../../pages/barber/Dashboard";
import Customers from "../../pages/barber/Customers";
import CreateCustomer from "../../pages/barber/CreateCustomer";
import EditCustomer from "../../pages/barber/EditCustomer";
import Queue from "../../pages/barber/Queue";
import Booking from "../../pages/barber/Booking";

export default function BarberRoutes() {
  return (
    <Route
      path="/barber"
      element={
        <ProtectedRoute>
          <RoleBasedRoute allowedRoles={["barber"]}>
            <MainLayout />
          </RoleBasedRoute>
        </ProtectedRoute>
      }
    >
      <Route index element={<Dashboard />} />

      <Route path="customer" element={<Customers />} />

      <Route path="customer/create" element={<CreateCustomer />} />

      <Route path="customer/:id/edit" element={<EditCustomer />} />

      <Route path="queue" element={<Queue />} />

      <Route path="bookings" element={<Booking />} />
    </Route>
  );
}
