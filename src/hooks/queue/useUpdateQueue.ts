import { useState } from "react";

import { queueService } from "../../services/queue.service";

import type { QueueEntry, UpdateQueueRequest } from "../../types/queue";

export function useUpdateQueue() {
  const [queueEntry, setQueueEntry] = useState<QueueEntry | null>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  async function updateQueue(id: number, data: UpdateQueueRequest) {
    try {
      setLoading(true);

      setError(null);

      const response = await queueService.update(id, data);

      setQueueEntry(response);

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
    queueEntry,
    loading,
    error,
    updateQueue,
  };
}
