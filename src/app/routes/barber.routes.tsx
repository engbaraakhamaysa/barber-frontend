// Defines the barber route group.
import { Route } from "react-router-dom";

// Route guards.
import RoleBasedRoute from "../guards/RoleBasedRoute";
import ProtectedRoute from "../guards/ProtectedRoute";

// Shared barber layout.
import MainLayout from "../../layouts/MainLayout";

// Barber pages.
import Dashboard from "../../pages/barber/Dashboard";
import Customers from "../../pages/barber/Customers";
import CreateCustomer from "../../pages/barber/CreateCustomer";
import EditCustomer from "../../pages/barber/EditCustomer";
import Queue from "../../pages/barber/Queue";
import Booking from "../../pages/barber/Booking";

export default function barberRoutes() {
  return (
    // Protects all barber routes and checks the user's role.
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
      {/* Default page: /barber */}
      <Route index element={<Dashboard />} />

      {/* /barber/customers */}
      <Route path="customers" element={<Customers />} />

      {/* /barber/customer/create */}
      <Route path="customer/create" element={<CreateCustomer />} />

      {/* /barber/customer/:id/edit */}
      <Route path="customer/:id/edit" element={<EditCustomer />} />

      {/* /barber/queue */}
      <Route path="queue" element={<Queue />} />

      {/* /barber/bookings */}
      <Route path="bookings" element={<Booking />} />
    </Route>
  );
}
