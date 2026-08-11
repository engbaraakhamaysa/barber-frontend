import { useState } from "react";

import { useCreateCustomer } from "../../customer/hooks/useCreateCustomer";
import { useJoinQueue } from "../hooks/useJoinQueue";

import "./queue-form.css";

interface QueueFormProps {
  barberId: number;
  onSuccess: () => void;
}

export default function QueueForm({ barberId, onSuccess }: QueueFormProps) {
  const {
    createCustomer,
    loading: creatingCustomer,
    error: customerError,
  } = useCreateCustomer();

  const {
    joinQueue,
    loading: joiningQueue,
    error: joinQueueError,
  } = useJoinQueue();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const loading = creatingCustomer || joiningQueue;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const customer = await createCustomer({
      name,
      phone: phone || null,
    });

    if (!customer) {
      return;
    }

    const queueEntry = await joinQueue({
      customer_id: customer.id,
      barber_id: barberId,
    });

    if (!queueEntry) {
      return;
    }

    setName("");
    setPhone("");

    onSuccess();
  }

  return (
    <section className="queue-form">
      <div className="queue-form-header">
        <div>
          <h2>Add Customer</h2>
          <p>Add a new customer to the queue</p>
        </div>
      </div>

      <form className="queue-form-body" onSubmit={handleSubmit}>
        <div className="queue-form-field">
          <label htmlFor="name">Customer Name</label>

          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter customer name"
            autoComplete="name"
            required
          />
        </div>

        <div className="queue-form-field">
          <label htmlFor="phone">Phone</label>

          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="Enter customer phone"
            autoComplete="tel"
          />
        </div>

        {customerError && <p className="queue-form-error">{customerError}</p>}

        {joinQueueError && <p className="queue-form-error">{joinQueueError}</p>}

        <button className="queue-form-submit" type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add to Queue"}
        </button>
      </form>
    </section>
  );
}
