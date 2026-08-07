import { useState } from "react";

import { queueService } from "../../services/queue.service";

import type { QueueEntry } from "../../types/queue";

export function useGetQueueByBarber() {
  const [queue, setQueue] = useState<QueueEntry[]>([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  async function getQueueByBarber(barberId: number) {
    try {
      setLoading(true);

      setError(null);

      const data = await queueService.getByBarberId(barberId);

      setQueue(data);

      return data;
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to get queue";

      setError(message);

      return null;
    } finally {
      setLoading(false);
    }
  }

  return {
    queue,
    loading,
    error,
    getQueueByBarber,
  };
}
