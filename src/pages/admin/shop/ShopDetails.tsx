import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./styles/shops.css";

import { useGetShop } from "../../../hooks/shop/useGetShop";

export default function ShopDetails() {
  const navigate = useNavigate();

  const { id } = useParams();

  const { shop, loading, error, getShop } = useGetShop();

  useEffect(() => {
    if (id) {
      getShop(Number(id));
    }
  }, [id]);

  if (loading) {
    return <p>Loading shop...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!shop) {
    return <p>Shop not found</p>;
  }

  return (
    <div className="shop-details-page">
      <h1>Shop Details</h1>

      <div className="shop-card details-card">
        <h3>{shop.name}</h3>

        <p>
          <strong>Location:</strong> {shop.location}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          <span
            className={shop.is_active ? "status-active" : "status-inactive"}
          >
            {shop.is_active ? "Active" : "Inactive"}
          </span>
        </p>

        <p>
          <strong>Created:</strong>{" "}
          {new Date(shop.created_at).toLocaleDateString()}
        </p>

        <button onClick={() => navigate(`/admin/shops/${shop.id}/barbers`)}>
          Manage Barbers
        </button>
      </div>
    </div>
  );
}
