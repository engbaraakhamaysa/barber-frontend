import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import AdminLayout from "./admin/layout/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";
import Users from "./admin/pages/Users";
import Booking from "./admin/pages/Booking";

import Login from "./pages/auth/Login";
import Regester from "./pages/auth/Regester";
import Home from "./pages/public/Home";

type Barber = {
  id: number;
  name: string;
  availableTimes: string[];
};

export default function App() {
  const [users, setUsers] = useState<any[]>([]);

  const [barbers, setBarbers] = useState<Barber[]>([
    { id: 1, name: "أحمد", availableTimes: [] },
    { id: 2, name: "محمد", availableTimes: [] },
    { id: 3, name: "علي", availableTimes: [] },
  ]);

  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        {/* 📊 Dashboard */}
        <Route
          index
          element={<Dashboard users={users} setUsers={setUsers} />}
        />

        {/* 👥 Users */}
        <Route
          path="users"
          element={<Users users={users} setUsers={setUsers} />}
        />

        {/* 📅 Booking (إدارة الأوقات) */}
        <Route
          path="booking"
          element={<Booking barbers={barbers} setBarbers={setBarbers} />}
        />
      </Route>

      <Route path="/login" element={<Login />}></Route>
      <Route path="/regester" element={<Regester />}></Route>
      <Route path="/" element={<Home />}></Route>
    </Routes>
  );
}
