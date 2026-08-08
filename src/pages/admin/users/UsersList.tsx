import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./styles/users.css";

import { useDeleteUser } from "../../../features/users/hooks/useDeleteUser";
import { useGetUsers } from "../../../features/users/hooks/useGetUsers";

export default function UsersList() {
  const navigate = useNavigate();

  const { users, loading, error, getUsers } = useGetUsers();

  const {
    deleteUser,
    loading: deleteLoading,
    error: deleteError,
  } = useDeleteUser();

  useEffect(() => {
    getUsers();
  }, []);

  async function handleDelete(id: number) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?",
    );

    if (!confirmDelete) return;

    await deleteUser(id);

    await getUsers();
  }

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error || deleteError) {
    return <p className="error">{error || deleteError}</p>;
  }

  return (
    <div className="users-page">
      <div className="users-header">
        <h1>Users</h1>

        <button onClick={() => navigate("/admin/users/create")}>
          Add User
        </button>
      </div>

      <div className="users-grid">
        {users.map((user) => (
          <div className="user-card" key={user.id}>
            <h3>{user.name}</h3>

            <p>{user.email}</p>

            <p>Role: {user.role}</p>

            <p>
              Status:
              <span
                className={user.is_active ? "status-active" : "status-inactive"}
              >
                {user.is_active ? " Active" : " Inactive"}
              </span>
            </p>

            <div className="user-actions">
              <button onClick={() => navigate(`/admin/users/${user.id}/edit`)}>
                Edit
              </button>

              <button
                disabled={deleteLoading}
                onClick={() => handleDelete(user.id)}
              >
                {deleteLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
