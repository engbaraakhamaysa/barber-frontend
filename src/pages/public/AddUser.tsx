import { useState } from "react";
import "../../styles/addUser.css";

type User = {
  id: number;
  name: string;
  phone: string;
};

type UsersData = {
  baraa: User[];
  ahmad: User[];
};

export default function AddUser() {
  const [selectedUser, setSelectedUser] = useState<"baraa" | "ahmad">("baraa");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [users, setUsers] = useState<UsersData>({
    baraa: [],
    ahmad: [],
  });

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !phone) return;

    const newUser: User = {
      id: Date.now(),
      name,
      phone,
    };

    setUsers((prev) => ({
      ...prev,
      [selectedUser]: [...prev[selectedUser], newUser],
    }));

    setName("");
    setPhone("");
  };

  return (
    <div className="add-user-page">
      {/* اختيار المستخدم */}
      <div className="user-switch">
        <button
          className={selectedUser === "baraa" ? "active" : ""}
          onClick={() => setSelectedUser("baraa")}
        >
          Baraa
        </button>

        <button
          className={selectedUser === "ahmad" ? "active" : ""}
          onClick={() => setSelectedUser("ahmad")}
        >
          Ahmad
        </button>
      </div>

      {/* الفورم */}
      <form className="user-form" onSubmit={handleAddUser}>
        <h2>Add Customer for {selectedUser}</h2>

        <input
          type="text"
          placeholder="Customer name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button type="submit">Add</button>
      </form>

      {/* الجدول */}
      <div className="table-container">
        <h2>{selectedUser} Customers List</h2>

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Phone</th>
            </tr>
          </thead>

          <tbody>
            {users[selectedUser].length === 0 ? (
              <tr>
                <td colSpan={3}>No customers yet</td>
              </tr>
            ) : (
              users[selectedUser].map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.phone}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
