import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useGetCustomers } from "../../hooks/customer/useGetCustomers";
import { useDeleteCustomer } from "../../hooks/customer/useDeleteCustomer";

import "./styles/customers.css";

export default function Customers() {
  const navigate = useNavigate();

  const { customers, loading, error, getCustomers } = useGetCustomers();

  const {
    deleteCustomer,
    loading: deleteLoading,
    error: deleteError,
  } = useDeleteCustomer();

  useEffect(() => {
    getCustomers();
  }, []);

  async function handleDelete(id: number) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?",
    );

    if (!confirmDelete) {
      return;
    }

    const deleted = await deleteCustomer(id);

    if (deleted) {
      await getCustomers();
    }
  }

  if (loading) {
    return <p>Loading customers...</p>;
  }

  if (error || deleteError) {
    return <p className="error">{error || deleteError}</p>;
  }

  return (
    <div className="customers-page">
      <div className="customers-header">
        <h1>Customers</h1>

        <button
          className="add-customer-button"
          onClick={() => navigate("/barber/customers/create")}
        >
          + Add Customer
        </button>
      </div>

      <div className="customers-list">
        {customers.length === 0 ? (
          <p>No customers found</p>
        ) : (
          customers.map((customer) => (
            <div className="customer-card" key={customer.id}>
              <h3>{customer.name}</h3>

              <p>Phone: {customer.phone || "No phone"}</p>

              <p>Added: {new Date(customer.created_at).toLocaleDateString()}</p>

              <div className="customer-actions">
                <button
                  onClick={() => navigate(`/barber/customers/${customer.id}`)}
                >
                  Details
                </button>

                <button
                  onClick={() =>
                    navigate(`/barber/customers/${customer.id}/edit`)
                  }
                >
                  Edit
                </button>

                <button
                  disabled={deleteLoading}
                  onClick={() => handleDelete(customer.id)}
                >
                  {deleteLoading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
