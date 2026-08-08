import { useEffect, useState } from "react";

import { useGetQueueByBarber } from "../../features/queue/hooks/useGetQueueByBarber";
import { useUpdateQueue } from "../../features/queue/hooks/useUpdateQueue";
import { useGetNextWaiting } from "../../features/queue/hooks/useGetNextWaiting";

import type { QueueEntry } from "../../features/queue/queue";

import "./styles/queue.css";

export default function Queue() {
  // مؤقتاً
  // لاحقاً من Auth Context
  const barberId = 1;

  const { queue, loading, error, getQueueByBarber } = useGetQueueByBarber();

  const { updateQueue, loading: updateLoading } = useUpdateQueue();

  const { getNextWaiting } = useGetNextWaiting();

  const [currentCustomer, setCurrentCustomer] = useState<QueueEntry | null>(
    null,
  );

  useEffect(() => {
    getQueueByBarber(barberId);
  }, []);

  async function handleNext() {
    const customer = await getNextWaiting(barberId);

    if (!customer) {
      return;
    }

    const updated = await updateQueue(customer.id, {
      status: "called",
    });

    if (updated) {
      setCurrentCustomer(updated);

      getQueueByBarber(barberId);
    }
  }

  async function handleStart(id: number) {
    const updated = await updateQueue(id, {
      status: "in_service",
    });

    if (updated) {
      setCurrentCustomer(updated);

      getQueueByBarber(barberId);
    }
  }

  async function handleComplete(id: number) {
    const updated = await updateQueue(id, {
      status: "completed",
    });

    if (updated) {
      setCurrentCustomer(null);

      getQueueByBarber(barberId);
    }
  }

  if (loading) {
    return <p>Loading queue...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="queue-page">
      <div className="queue-header">
        <h1>Customer Queue</h1>

        <button onClick={handleNext} disabled={updateLoading}>
          Next Customer
        </button>
      </div>

      {currentCustomer && (
        <div className="current-customer">
          <h3>Current Customer</h3>

          <p>
            Customer ID:
            {currentCustomer.customer_id}
          </p>

          <p>
            Status:
            {currentCustomer.status}
          </p>
        </div>
      )}

      <div className="queue-list">
        {queue.length === 0 ? (
          <p>No customers waiting</p>
        ) : (
          queue.map((item) => (
            <div className="queue-card" key={item.id}>
              <h3>Customer #{item.customer_id}</h3>

              <p>
                Status:
                {item.status}
              </p>

              <p>
                Joined:
                {new Date(item.joined_at).toLocaleTimeString()}
              </p>

              {item.status === "called" && (
                <button onClick={() => handleStart(item.id)}>
                  Start Service
                </button>
              )}

              {item.status === "in_service" && (
                <button onClick={() => handleComplete(item.id)}>
                  Complete
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
