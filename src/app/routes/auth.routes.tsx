import { Route, Routes } from "react-router-dom";
import Login from "../../pages/auth/Login";
import Register from "../../pages/auth/Register";
import AuthLayout from "../../layouts/AuthLayout";

export default function AuthRoutes() {
  function Home() {
    return <div>Home</div>;
  }

  return (
    <Routes>
      {/* AUTH */}

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}
