import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import AdminLayout from "./admin/layout/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";
import Users from "./admin/pages/Users";
import Booking from "./admin/pages/Booking";

import Login from "./pages/auth/Login";
import Regester from "./pages/auth/Regester";
import Home from "./pages/public/Home";
import AddUser from "./pages/public/AddUser";
import ShowTime from "./pages/public/ShowTime";
import { AddTime } from "./pages/public/AddTime";
import MainLayout from "./layouts/MainLayout";

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

      {/* صفحات مع Bottom Nav */}
      <Route element={<MainLayout />}>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/regester" element={<Regester />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/adduser" element={<AddUser />}></Route>
        <Route path="/showtime" element={<ShowTime />}></Route>
        <Route path="/addtime" element={<AddTime />}></Route>
      </Route>
    </Routes>
  );
}
