import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import UsersList from "../pages/users/UsersList";
import CreateUser from "../pages/users/CreateUser";
import UserDetails from "../pages/users/UserDetails";
import EditUser from "../pages/users/EditUser";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ShopsList from "../pages/shop/ShopsList";
import CreateShop from "../pages/shop/CreateShop";
import EditShop from "../pages/shop/EditShop";
import ShopDetails from "../pages/shop/ShopDetails";

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
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/users" element={<UsersList />} />

        <Route path="/users/create" element={<CreateUser />} />

        <Route path="/users/:id" element={<UserDetails />} />

        <Route path="/users/:id/edit" element={<EditUser />} />

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

        <Route path="/shops" element={<ShopsList />} />

        <Route path="/shops/create" element={<CreateShop />} />

        <Route path="/shops/:id/edit" element={<EditShop />} />

        <Route path="/shops/:id" element={<ShopDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
