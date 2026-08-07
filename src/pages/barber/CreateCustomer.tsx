import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCreateCustomer } from "../../hooks/customer/useCreateCustomer";

import "./styles/customers.css";

export default function CreateCustomer() {
  const navigate = useNavigate();

  const { createCustomer, loading, error } = useCreateCustomer();

  const [name, setName] = useState("");

  const [phone, setPhone] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const customer = await createCustomer({
      name: name || "Guest Customer",
      phone: phone || null,
    });

    if (customer) {
      navigate("/barber/customers");
    }
  }

  return (
    <div className="customers-page">
      <form className="customer-form" onSubmit={handleSubmit}>
        <h1>Add Customer</h1>

        {error && <p className="error">{error}</p>}

        <input
          type="text"
          placeholder="Customer name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Phone (optional)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button disabled={loading}>
          {loading ? "Creating..." : "Add Customer"}
        </button>

        <button type="button" onClick={() => navigate("/barber/customers")}>
          Cancel
        </button>
      </form>
    </div>
  );
}
