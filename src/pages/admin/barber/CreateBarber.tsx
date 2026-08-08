import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useCreateBarber } from "../../../features/barber/hooks/useCreateBarber";

import "./styles/barbers.css";

export default function CreateBarber() {
  const navigate = useNavigate();

  const { shopId } = useParams();

  const { createBarber, loading, error } = useCreateBarber();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!shopId) {
      return;
    }

    await createBarber({
      shop_id: Number(shopId),
      name,
      email,
      password,
    });

    navigate(`/admin/shops/${shopId}/barbers`);
  }

  return (
    <div className="barber-form-page">
      <form className="barber-form" onSubmit={handleSubmit}>
        <h1>Create Barber</h1>

        {error && <p className="error">{error}</p>}

        <input
          type="text"
          placeholder="Barber name"
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

        <button disabled={loading}>
          {loading ? "Creating..." : "Create Barber"}
        </button>
      </form>
    </div>
  );
}
