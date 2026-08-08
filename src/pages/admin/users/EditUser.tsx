import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useGetUser } from "../../../features/users/hooks/useGetUser";
import { useUpdateUser } from "../../../features/users/hooks/useUpdateUser";
import { UserRole } from "../../../features/users/users.types";

export default function EditUser() {
  const navigate = useNavigate();

  const { id } = useParams();

  const { user, loading: getLoading, error: getError, getUser } = useGetUser();

  const {
    updateUser,
    loading: updateLoading,
    error: updateError,
  } = useUpdateUser();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [role, setRole] = useState<UserRole>("user");

  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (id) {
      getUser(Number(id));
    }
  }, [id]);

  useEffect(() => {
    if (user) {
      setName(user.name);

      setEmail(user.email);

      setRole(user.role);

      setIsActive(user.is_active);
    }
  }, [user]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!id) return;

    await updateUser(Number(id), {
      name,
      email,
      role,
      is_active: isActive,
    });

    navigate("/users");
  }

  if (getLoading) {
    return <p>Loading...</p>;
  }

  if (getError || updateError) {
    return <p>{getError || updateError}</p>;
  }

  return (
    <div className="user-form-page">
      <form className="user-form" onSubmit={handleSubmit}>
        <h1>Edit User</h1>

        <input value={name} onChange={(e) => setName(e.target.value)} />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value as UserRole)}
        >
          <option value="user">User</option>

          <option value="barber">Barber</option>

          <option value="admin">Admin</option>
        </select>

        <select
          value={isActive ? "active" : "inactive"}
          onChange={(e) => setIsActive(e.target.value === "active")}
        >
          <option value="active">Active</option>

          <option value="inactive">Inactive</option>
        </select>

        <button disabled={updateLoading}>
          {updateLoading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
}
