import { useState } from "react";
import type { User } from "../../types/User";

type Props = {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
};

const barbers = ["أحمد", "محمد", "علي"];

export default function Users({ users, setUsers }: Props) {
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

  const filtered = users
    .filter((u) => u.barber === selectedBarber)
    .sort((a, b) => a.createdAt - b.createdAt);

  return (
    <div>
      <h2>👨‍✂️ الحجوزات</h2>

      {/* select barber */}
      <div style={{ display: "flex", gap: 10 }}>
        {barbers.map((b) => (
          <button key={b} onClick={() => setSelectedBarber(b)}>
            {b}
          </button>
        ))}
      </div>

      {/* add user */}
      <div style={{ marginTop: 10 }}>
        <input
          placeholder="اسم الزبون"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={addUser}>إضافة</button>
      </div>

      <h3>📋 Queue - {selectedBarber}</h3>

      {filtered.length === 0 ? (
        <p>لا يوجد زبائن</p>
      ) : (
        filtered.map((user, index) => (
          <div
            key={user.id}
            style={{
              padding: 10,
              margin: 5,
              background: index === 0 ? "#d4fcd4" : "#eee",
            }}
          >
            <p>
              {user.name} {index === 0 && "👈 الحالي"}
            </p>

            <button onClick={() => deleteUser(user.id)}>حذف</button>
          </div>
        ))
      )}
    </div>
  );
}
