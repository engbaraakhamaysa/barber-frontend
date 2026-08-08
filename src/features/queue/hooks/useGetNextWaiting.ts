import { useState } from "react";

import { queueService } from "../queue.service";

import type { QueueEntry } from "../queue";

export function useGetNextWaiting() {
  const [nextCustomer, setNextCustomer] = useState<QueueEntry | null>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  async function getNextWaiting(barberId: number) {
    try {
      setLoading(true);

      setError(null);

      const data = await queueService.getNextWaiting(barberId);

      setNextCustomer(data);

      return data;
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Failed to get next customer";

      setError(message);

      return null;
    } finally {
      setLoading(false);
    }
  }

  return {
    nextCustomer,
    loading,
    error,
    getNextWaiting,
  };
}
