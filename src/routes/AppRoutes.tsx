import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import AdminLayout from "../layouts/AdminLayout";

import Dashboard from "../pages/admin/Dashboard";

import ShopsList from "../pages/admin/shop/ShopsList";
import CreateShop from "../pages/admin/shop/CreateShop";
import EditShop from "../pages/admin/shop/EditShop";
import ShopDetails from "../pages/admin/shop/ShopDetails";

import UsersList from "../pages/admin/users/UsersList";
import CreateUser from "../pages/admin/users/CreateUser";
import UserDetails from "../pages/admin/users/UserDetails";
import EditUser from "../pages/admin/users/EditUser";

import BarbersList from "../pages/admin/barber/BarbersList";
import CreateBarber from "../pages/admin/barber/CreateBarber";
import EditBarber from "../pages/admin/barber/EditBarber";
import BarberDetails from "../pages/admin/barber/BarberDetails";

function Home() {
  return <h1>Home</h1>;
}

function Profile() {
  return <h1>Profile</h1>;
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* AUTH */}

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* ADMIN PANEL */}

        <Route path="/admin" element={<AdminLayout />}>
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

          <Route
            path="shops/:shopId/barbers/create"
            element={<CreateBarber />}
          />

          <Route path="shops/:shopId/barbers/:id" element={<BarberDetails />} />

          <Route
            path="shops/:shopId/barbers/:id/edit"
            element={<EditBarber />}
          />
        </Route>

        {/* NORMAL USER LAYOUT */}

        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Home />} />

          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
