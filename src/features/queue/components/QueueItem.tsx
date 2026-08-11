import type { QueueEntry } from "../queue";

import "./queue-item.css";

interface QueueItemProps {
  entry: QueueEntry;
  index: number;
  currentTime: number;
  updating: boolean;
  onFinish: () => void;
  onRemove: (id: number) => void;
}

export default function QueueItem({
  entry,
  index,
  currentTime,
  updating,
  onFinish,
  onRemove,
}: QueueItemProps) {
  const isFirstCustomer = index === 0;

  function formatTime(milliseconds: number) {
    const totalSeconds = Math.max(Math.floor(milliseconds / 1000), 0);

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    if (minutes === 0) {
      return `${seconds} sec`;
    }

    return `${minutes} min ${seconds} sec`;
  }

  function getWaitingTime(joinedAt: string) {
    const joinedTime = new Date(joinedAt).getTime();

    const difference = currentTime - joinedTime;

    return formatTime(difference);
  }

  function getServiceTime(startedAt: string | null) {
    if (!startedAt) {
      return "0 sec";
    }

    const startTime = new Date(startedAt).getTime();

    const difference = currentTime - startTime;

    return formatTime(difference);
  }

  return (
    <article
      className={`queue-item ${isFirstCustomer ? "queue-item-current" : ""}`}
    >
      <div className="queue-item-number">
        <span>#{index + 1}</span>
      </div>

      <div className="queue-item-content">
        <div className="queue-item-top">
          <h3>{entry.customer_name}</h3>

          <span
            className={`queue-item-status ${
              isFirstCustomer && entry.status === "in_service"
                ? "status-service"
                : "status-waiting"
            }`}
          >
            {isFirstCustomer && entry.status === "in_service"
              ? "In Service"
              : "Waiting"}
          </span>
        </div>

        {isFirstCustomer && entry.status === "in_service" && (
          <div className="queue-item-time">
            <span>Service time</span>

            <strong>{getServiceTime(entry.started_at)}</strong>
          </div>
        )}

        {!isFirstCustomer && entry.status === "waiting" && (
          <div className="queue-item-time">
            <span>Waiting time</span>

            <strong>{getWaitingTime(entry.joined_at)}</strong>
          </div>
        )}

        {isFirstCustomer && entry.status === "in_service" && (
          <button
            className="queue-item-finish"
            type="button"
            onClick={onFinish}
            disabled={updating}
          >
            {updating ? "Completing..." : "Finish Early"}
          </button>
        )}

        {!isFirstCustomer && entry.status === "waiting" && (
          <button
            className="queue-item-remove"
            type="button"
            onClick={() => onRemove(entry.id)}
            disabled={updating}
          >
            Remove
          </button>
        )}
      </div>
    </article>
  );
}
