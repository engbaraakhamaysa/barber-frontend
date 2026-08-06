import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./styles/shops.css";
import { useGetShop } from "../../../hooks/shop/useGetShop";
import { useUpdateShop } from "../../../hooks/shop/useUpdateShop";

export default function EditShop() {
  const navigate = useNavigate();

  const { id } = useParams();

  const { shop, loading: getLoading, error: getError, getShop } = useGetShop();

  const {
    updateShop,
    loading: updateLoading,
    error: updateError,
  } = useUpdateShop();

  const [name, setName] = useState("");

  const [location, setLocation] = useState("");

  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (id) {
      getShop(Number(id));
    }
  }, [id]);

  useEffect(() => {
    if (shop) {
      setName(shop.name);

      setLocation(shop.location);

      setIsActive(shop.is_active);
    }
  }, [shop]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!id) return;

    await updateShop(Number(id), {
      name,
      location,
      is_active: isActive,
    });

    navigate("/shops");
  }

  if (getLoading) {
    return <p>Loading shop...</p>;
  }

  if (getError || updateError) {
    return <p className="error">{getError || updateError}</p>;
  }

  return (
    <div className="shop-form-page">
      <form className="shop-form" onSubmit={handleSubmit}>
        <h1>Edit Shop</h1>

        <input
          type="text"
          value={name}
          placeholder="Shop name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          value={location}
          placeholder="Location"
          onChange={(e) => setLocation(e.target.value)}
        />

        <select
          value={String(isActive)}
          onChange={(e) => setIsActive(e.target.value === "true")}
        >
          <option value="true">Active</option>

          <option value="false">Inactive</option>
        </select>

        <button disabled={updateLoading}>
          {updateLoading ? "Updating..." : "Update Shop"}
        </button>
      </form>
    </div>
  );
}
