import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useGetCustomer } from "../../hooks/customer/useGetCustomer";
import { useUpdateCustomer } from "../../hooks/customer/useUpdateCustomer";

import "./styles/customers.css";

export default function EditCustomer() {
  const navigate = useNavigate();

  const { id } = useParams();

  const {
    customer,
    loading: getLoading,
    error: getError,
    getCustomer,
  } = useGetCustomer();

  const {
    updateCustomer,
    loading: updateLoading,
    error: updateError,
  } = useUpdateCustomer();

  const [name, setName] = useState("");

  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (id) {
      getCustomer(Number(id));
    }
  }, [id]);

  useEffect(() => {
    if (customer) {
      setName(customer.name);

      setPhone(customer.phone || "");
    }
  }, [customer]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!id) {
      return;
    }

    const updated = await updateCustomer(Number(id), {
      name,
      phone: phone || null,
    });

    if (updated) {
      navigate("/barber/customers");
    }
  }

  if (getLoading) {
    return <p>Loading customer...</p>;
  }

  if (getError || updateError) {
    return <p className="error">{getError || updateError}</p>;
  }

  return (
    <div className="customers-page">
      <form className="customer-form" onSubmit={handleSubmit}>
        <h1>Edit Customer</h1>

        <input
          type="text"
          value={name}
          placeholder="Customer name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          value={phone}
          placeholder="Phone"
          onChange={(e) => setPhone(e.target.value)}
        />

        <button disabled={updateLoading}>
          {updateLoading ? "Updating..." : "Update Customer"}
        </button>

        <button type="button" onClick={() => navigate("/barber/customers")}>
          Cancel
        </button>
      </form>
    </div>
  );
}
