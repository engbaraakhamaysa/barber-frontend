import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./styles/shops.css";
import { useCreateShop } from "../../hooks/shop/useCreateShop";

export default function CreateShop() {
  const navigate = useNavigate();

  const { createShop, loading, error } = useCreateShop();

  const [name, setName] = useState("");

  const [location, setLocation] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await createShop({
      name,
      location,
    });

    navigate("/shops");
  }

  return (
    <div className="shop-form-page">
      <form className="shop-form" onSubmit={handleSubmit}>
        <h1>Create Shop</h1>

        {error && <p className="error">{error}</p>}

        <input
          type="text"
          placeholder="Shop name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <button disabled={loading}>
          {loading ? "Creating..." : "Create Shop"}
        </button>
      </form>
    </div>
  );
}
