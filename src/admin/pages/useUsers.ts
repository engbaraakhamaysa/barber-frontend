import { useState } from "react";
import type { User } from "../../types/User";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedBarber, setSelectedBarber] = useState("أحمد");
  const [name, setName] = useState("");

  const addUser = () => {
    if (!name.trim()) return;

    const newUser: User = {
      id: Date.now(),
      name,
      barber: selectedBarber,
      createdAt: Date.now(),
    };

    setUsers((prev) => [...prev, newUser]);
    setName("");
  };

  const deleteUser = (id: number) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const filteredUsers = users
    .filter((u) => u.barber === selectedBarber)
    .sort((a, b) => a.createdAt - b.createdAt);

  return {
    users: filteredUsers,
    name,
    setName,
    selectedBarber,
    setSelectedBarber,
    addUser,
    deleteUser,
  };
}
