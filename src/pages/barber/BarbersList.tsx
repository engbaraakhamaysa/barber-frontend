import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useGetBarbersByShop } from "../../hooks/barber/useGetBarbersByShop";
import { useDeleteBarber } from "../../hooks/barber/useDeleteBarber";

import "./styles/barbers.css";

export default function BarbersList() {
  const navigate = useNavigate();

  const { shopId } = useParams();

  const { barbers, loading, error, getBarbersByShop } = useGetBarbersByShop();

  const {
    deleteBarber,
    loading: deleteLoading,
    error: deleteError,
  } = useDeleteBarber();

  useEffect(() => {
    if (shopId) {
      getBarbersByShop(Number(shopId));
    }
  }, [shopId]);

  async function handleDelete(id: number) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this barber?",
    );

    if (!confirmDelete) return;

    await deleteBarber(id);

    if (shopId) {
      await getBarbersByShop(Number(shopId));
    }
  }

  if (loading) {
    return <p>Loading barbers...</p>;
  }

  if (error || deleteError) {
    return <p className="error">{error || deleteError}</p>;
  }

  return (
    <div className="barbers-page">
      <div className="barbers-header">
        <h1>Barbers</h1>

        <button onClick={() => navigate(`/shops/${shopId}/barbers/create`)}>
          Add Barber
        </button>
      </div>

      <div className="barbers-grid">
        {barbers.map((barber) => (
          <div className="barber-card" key={barber.id}>
            <h3>{barber.name}</h3>

            <p>Email: {barber.email}</p>

            <p>Role: {barber.role}</p>

            <p>
              Status:{" "}
              <span
                className={
                  barber.is_active ? "status-active" : "status-inactive"
                }
              >
                {barber.is_active ? "Active" : "Inactive"}
              </span>
            </p>

            <div className="barber-actions">
              <button
                onClick={() =>
                  navigate(`/shops/${shopId}/barbers/${barber.id}`)
                }
              >
                Details
              </button>

              <button
                onClick={() =>
                  navigate(`/shops/${shopId}/barbers/${barber.id}/edit`)
                }
              >
                Edit
              </button>

              <button
                disabled={deleteLoading}
                onClick={() => handleDelete(barber.id)}
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
