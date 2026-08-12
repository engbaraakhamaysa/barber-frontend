import { Route } from "react-router-dom";

import Login from "../../pages/auth/Login";
import Register from "../../pages/auth/Register";

import MainLayout from "../../layouts/MainLayout";

function Home() {
  return <div>Home</div>;
}

export default function AuthRoutes() {
  return (
    <Route element={<MainLayout />}>
      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/" element={<Home />} />
    </Route>
  );
}
