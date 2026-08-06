import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useGetBarber } from "../../hooks/barber/useGetBarber";

import "./styles/barbers.css";

export default function BarberDetails() {
  const navigate = useNavigate();

  const { shopId, id } = useParams();

  const { barber, loading, error, getBarber } = useGetBarber();

  useEffect(() => {
    if (id) {
      getBarber(Number(id));
    }
  }, [id]);

  if (loading) {
    return <p>Loading barber...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!barber) {
    return <p>Barber not found</p>;
  }

  return (
    <div className="barber-details-page">
      <h1>Barber Details</h1>

      <div className="barber-card details-card">
        <h3>{barber.name}</h3>

        <p>
          <strong>Email:</strong> {barber.email}
        </p>

        <p>
          <strong>Role:</strong> {barber.role}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          <span
            className={barber.is_active ? "status-active" : "status-inactive"}
          >
            {barber.is_active ? "Active" : "Inactive"}
          </span>
        </p>

        <p>
          <strong>Created:</strong>{" "}
          {new Date(barber.created_at).toLocaleDateString()}
        </p>

        <div className="barber-actions">
          <button onClick={() => navigate(`/shops/${shopId}/barbers`)}>
            Back To Barbers
          </button>

          <button
            onClick={() => navigate(`/shops/${shopId}/barbers/${id}/edit`)}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
