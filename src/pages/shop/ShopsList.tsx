import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./styles/shops.css";

import { useGetShops } from "../../hooks/shop/useGetShops";
import { useDeleteShop } from "../../hooks/shop/useDeleteShop";

export default function ShopsList() {
  const navigate = useNavigate();

  const { shops, loading, error, getShops } = useGetShops();

  const {
    deleteShop,
    loading: deleteLoading,
    error: deleteError,
  } = useDeleteShop();

  useEffect(() => {
    getShops();
  }, []);

  async function handleDelete(id: number) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this shop?",
    );

    if (!confirmDelete) return;

    await deleteShop(id);

    await getShops();
  }

  if (loading) {
    return <p>Loading shops...</p>;
  }

  if (error || deleteError) {
    return <p className="error">{error || deleteError}</p>;
  }

  return (
    <div className="shops-page">
      <div className="shops-header">
        <h1>Shops</h1>

        <button onClick={() => navigate("/shops/create")}>Add Shop</button>
      </div>

      <div className="shops-grid">
        {shops.map((shop) => (
          <div className="shop-card" key={shop.id}>
            <h3>{shop.name}</h3>

            <p>Location: {shop.location}</p>

            <p>
              Status:{" "}
              <span
                className={shop.is_active ? "status-active" : "status-inactive"}
              >
                {shop.is_active ? "Active" : "Inactive"}
              </span>
            </p>

            <div className="shop-actions">
              <button onClick={() => navigate(`/shops/${shop.id}`)}>
                View Shop
              </button>

              <button onClick={() => navigate(`/shops/${shop.id}/edit`)}>
                Edit
              </button>

              <button
                disabled={deleteLoading}
                onClick={() => handleDelete(shop.id)}
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
