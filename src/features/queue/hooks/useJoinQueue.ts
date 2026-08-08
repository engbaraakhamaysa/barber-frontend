import { useState } from "react";

import { queueService } from "../queue.service";

import type { QueueEntry, JoinQueueRequest } from "../queue";

export function useJoinQueue() {
  const [queueEntry, setQueueEntry] = useState<QueueEntry | null>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  async function joinQueue(data: JoinQueueRequest) {
    try {
      setLoading(true);

      setError(null);

      const response = await queueService.join(data);

      setQueueEntry(response);

      return response;
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to join queue";

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
    joinQueue,
  };
}
