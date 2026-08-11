import { useState } from "react";

import { queueService } from "../queue.service";

import type { QueueEntry } from "../queue";

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

      console.log("QUEUE RESPONSE:", data);

      if (data.length > 0) {
        console.log("FIRST CUSTOMER STATUS:", data[0].status);
        console.log("FIRST CUSTOMER ID:", data[0].id);
        console.log("FIRST CUSTOMER STARTED AT:", data[0].started_at);
      } else {
        console.log("QUEUE IS EMPTY");
      }

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
