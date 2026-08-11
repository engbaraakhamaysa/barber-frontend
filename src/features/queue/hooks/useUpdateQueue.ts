import { useState } from "react";

import { queueService } from "../queue.service";

import type { QueueEntry, UpdateQueueRequest } from "../queue";

export function useUpdateQueue() {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  async function updateQueue(
    id: number,
    data: UpdateQueueRequest,
  ): Promise<QueueEntry | null> {
    try {
      setLoading(true);
      setError(null);

      const response = await queueService.update(id, data);

      return response;
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to update queue";

      setError(message);

      return null;
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    error,
    updateQueue,
  };
}
