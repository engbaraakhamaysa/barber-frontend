import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCreateUser } from "../../hooks/users/useCreateUser";
import { UserRole } from "../../types/users";

export default function CreateUser() {
  const navigate = useNavigate();

  const { createUser, loading, error } = useCreateUser();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("user");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await createUser({
      name,
      email,
      password,
      role,
    });

    navigate("/users");
  }

  return (
    <div className="user-form-page">
      <form className="user-form" onSubmit={handleSubmit}>
        <h1>Create User</h1>

        {error && <p className="error">{error}</p>}

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value as UserRole)}
        >
          <option value="user">User</option>

          <option value="barber">Barber</option>

          <option value="admin">Admin</option>
        </select>

        <button disabled={loading}>
          {loading ? "Creating..." : "Create User"}
        </button>
      </form>
    </div>
  );
}
