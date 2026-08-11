import { Route, Routes } from "react-router-dom";
import Login from "../../pages/auth/Login";
import Register from "../../pages/auth/Register";

import MainLayout from "../../layouts/MainLayout";

export default function AuthRoutes() {
  function Home() {
    return <div>Home</div>;
  }

  return (
    <Routes>
      {/* AUTH */}

      <Route element={<MainLayout />}>
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}
