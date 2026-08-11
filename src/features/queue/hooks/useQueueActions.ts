import { useState } from "react";

import { queueService } from "../queue.service";

import { useUpdateQueue } from "./useUpdateQueue";

export function useQueueActions() {
  const { updateQueue, loading: updating, error } = useUpdateQueue();

  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  function clearSuccess() {
    setActionSuccess(null);
  }

  ///////////////////////////////////////////
  // COMPLETE CUSTOMER
  ///////////////////////////////////////////

  async function finishCustomer(queueId: number): Promise<boolean> {
    setActionSuccess(null);

    try {
      await queueService.complete(queueId);

      setActionSuccess("Customer completed successfully");

      return true;
    } catch (error) {
      return false;
    }
  }

  ///////////////////////////////////////////
  // REMOVE CUSTOMER
  ///////////////////////////////////////////

  async function removeCustomer(queueId: number): Promise<boolean> {
    setActionSuccess(null);

    const result = await updateQueue(queueId, {
      status: "cancelled",
    });

    if (!result) {
      return false;
    }

    setActionSuccess("Customer removed from queue");

    return true;
  }

  return {
    finishCustomer,
    removeCustomer,
    updating,
    error,
    actionSuccess,
    clearSuccess,
  };
}
