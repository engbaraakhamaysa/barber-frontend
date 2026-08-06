import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useGetBarber } from "../../../hooks/barber/useGetBarber";
import { useUpdateBarber } from "../../../hooks/barber/useUpdateBarber";

import "./styles/barbers.css";

export default function EditBarber() {
  const navigate = useNavigate();

  const { shopId, id } = useParams();

  const {
    barber,
    loading: getLoading,
    error: getError,
    getBarber,
  } = useGetBarber();

  const {
    updateBarber,
    loading: updateLoading,
    error: updateError,
  } = useUpdateBarber();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (id) {
      getBarber(Number(id));
    }
  }, [id]);

  useEffect(() => {
    if (barber) {
      setName(barber.name);

      setEmail(barber.email);

      setIsActive(barber.is_active);
    }
  }, [barber]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!id) {
      return;
    }

    await updateBarber(Number(id), {
      name,

      email,

      ...(password ? { password } : {}),

      is_active: isActive,
    });

    navigate(`/admin/shops/${shopId}/barbers/${id}`);
  }

  if (getLoading) {
    return <p>Loading barber...</p>;
  }

  if (getError || updateError) {
    return <p className="error">{getError || updateError}</p>;
  }

  return (
    <div className="barber-form-page">
      <form className="barber-form" onSubmit={handleSubmit}>
        <h1>Edit Barber</h1>

        <input
          type="text"
          value={name}
          placeholder="Barber name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          value={password}
          placeholder="New password (optional)"
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          value={String(isActive)}
          onChange={(e) => setIsActive(e.target.value === "true")}
        >
          <option value="true">Active</option>

          <option value="false">Inactive</option>
        </select>

        <button disabled={updateLoading}>
          {updateLoading ? "Updating..." : "Update Barber"}
        </button>
      </form>
    </div>
  );
}
