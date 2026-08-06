import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetUser } from "../../../hooks/users/useGetUser";

export default function UserDetails() {
  const { id } = useParams();

  const { user, loading, error, getUser } = useGetUser();

  useEffect(() => {
    if (id) {
      getUser(Number(id));
    }
  }, [id]);

  if (loading) {
    return <p>Loading user...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <div className="user-details">
      <h1>User Details</h1>

      <div className="user-card">
        <p>
          <strong>Name:</strong> {user.name}
        </p>

        <p>
          <strong>Email:</strong> {user.email}
        </p>

        <p>
          <strong>Role:</strong> {user.role}
        </p>
      </div>
    </div>
  );
}
