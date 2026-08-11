import { useEffect, useRef, useState } from "react";

import { useAuthContext } from "../../app/providers/AuthProvider";

import QueueForm from "../../features/queue/components/QueueForm";
import QueueList from "../../features/queue/components/QueueList";

import { useGetQueueByBarber } from "../../features/queue/hooks/useGetQueueByBarber";
import { useQueueActions } from "../../features/queue/hooks/useQueueActions";
import { useQueueTimer } from "../../features/queue/hooks/useQueueTimer";

import "./queue.css";

export default function Queue() {
  const { user } = useAuthContext();

  const {
    queue,
    loading: queueLoading,
    error: queueError,
    getQueueByBarber,
  } = useGetQueueByBarber();

  const {
    finishCustomer,
    removeCustomer,
    updating,
    error: actionError,
    actionSuccess,
    clearSuccess,
  } = useQueueActions();

  const firstCustomer = queue[0];

  ///////////////////////////////////////////
  // SERVICE TIMER
  ///////////////////////////////////////////

  const { currentTime, serviceCompleted } = useQueueTimer(
    firstCustomer?.id,
    firstCustomer?.started_at,
  );

  const [refreshing, setRefreshing] = useState(false);

  ///////////////////////////////////////////
  // PREVENT DUPLICATE COMPLETE REQUEST
  ///////////////////////////////////////////

  const completingCustomerId = useRef<number | null>(null);

  ///////////////////////////////////////////
  // GET BARBER QUEUE
  ///////////////////////////////////////////

  async function refreshQueue() {
    if (!user) {
      return;
    }

    setRefreshing(true);

    try {
      await getQueueByBarber(user.id);
    } finally {
      setRefreshing(false);
    }
  }

  ///////////////////////////////////////////
  // INITIAL QUEUE LOAD
  ///////////////////////////////////////////

  useEffect(() => {
    if (!user) {
      return;
    }

    getQueueByBarber(user.id);
  }, [user]);

  ///////////////////////////////////////////
  // AUTO COMPLETE CURRENT CUSTOMER
  ///////////////////////////////////////////

  useEffect(() => {
    if (!user) {
      return;
    }

    if (!firstCustomer) {
      return;
    }

    const barberId = user.id;

    if (firstCustomer.status !== "in_service") {
      return;
    }

    if (!firstCustomer.started_at) {
      return;
    }

    if (!serviceCompleted) {
      return;
    }

    if (completingCustomerId.current === firstCustomer.id) {
      return;
    }

    completingCustomerId.current = firstCustomer.id;

    async function completeCurrentCustomer() {
      const success = await finishCustomer(firstCustomer.id);

      if (!success) {
        completingCustomerId.current = null;
        return;
      }

      await getQueueByBarber(barberId);

      completingCustomerId.current = null;
    }

    completeCurrentCustomer();
  }, [user, firstCustomer, serviceCompleted, finishCustomer]);

  ///////////////////////////////////////////
  // FINISH CURRENT CUSTOMER EARLY
  ///////////////////////////////////////////

  async function handleFinishCustomer() {
    if (!user || !firstCustomer) {
      return;
    }

    if (firstCustomer.status !== "in_service") {
      return;
    }

    if (completingCustomerId.current === firstCustomer.id) {
      return;
    }

    completingCustomerId.current = firstCustomer.id;

    const success = await finishCustomer(firstCustomer.id);

    if (!success) {
      completingCustomerId.current = null;
      return;
    }

    await getQueueByBarber(user.id);

    completingCustomerId.current = null;
  }

  ///////////////////////////////////////////
  // REMOVE CUSTOMER
  ///////////////////////////////////////////

  async function handleRemoveCustomer(id: number) {
    if (!user) {
      return;
    }

    const customer = queue.find((entry) => entry.id === id);

    if (!customer) {
      return;
    }

    if (customer.status !== "waiting") {
      return;
    }

    const success = await removeCustomer(id);

    if (!success) {
      return;
    }

    await getQueueByBarber(user.id);
  }

  ///////////////////////////////////////////
  // CUSTOMER ADDED
  ///////////////////////////////////////////

  function handleCustomerAdded() {
    clearSuccess();
    refreshQueue();
  }

  return (
    <div className="queue-page">
      <header className="queue-page-header">
        <div>
          <h1>Queue</h1>

          <p>Manage your customers and current service.</p>
        </div>

        <button
          className="queue-refresh-button"
          type="button"
          onClick={refreshQueue}
          disabled={refreshing || queueLoading}
          aria-label="Refresh queue"
        >
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </header>

      {(queueError || actionError || actionSuccess) && (
        <div className="queue-messages">
          {queueError && (
            <div className="queue-message queue-message-error">
              {queueError}
            </div>
          )}

          {actionError && (
            <div className="queue-message queue-message-error">
              {actionError}
            </div>
          )}

          {actionSuccess && (
            <div className="queue-message queue-message-success">
              {actionSuccess}
            </div>
          )}
        </div>
      )}

      <div className="queue-page-content">
        <QueueList
          queue={queue}
          loading={queueLoading}
          currentTime={currentTime}
          updating={updating}
          onFinish={handleFinishCustomer}
          onRemove={handleRemoveCustomer}
        />

        <QueueForm barberId={user?.id ?? 0} onSuccess={handleCustomerAdded} />
      </div>
    </div>
  );
}
