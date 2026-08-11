import type { QueueEntry } from "../queue";

import QueueItem from "./QueueItem";

import "./queue-list.css";

interface QueueListProps {
  queue: QueueEntry[];
  loading: boolean;
  currentTime: number;
  updating: boolean;
  onFinish: () => void;
  onRemove: (id: number) => void;
}

export default function QueueList({
  queue,
  loading,
  currentTime,
  updating,
  onFinish,
  onRemove,
}: QueueListProps) {
  return (
    <section className="queue-list">
      <div className="queue-list-header">
        <div>
          <h2>Current Queue</h2>
          <p>
            {queue.length === 0
              ? "No customers waiting"
              : `${queue.length} ${
                  queue.length === 1 ? "customer" : "customers"
                }`}
          </p>
        </div>

        {!loading && queue.length > 0 && (
          <span className="queue-list-count">{queue.length}</span>
        )}
      </div>

      {loading && (
        <div className="queue-list-state">
          <div className="queue-list-spinner" />
          <p>Loading queue...</p>
        </div>
      )}

      {!loading && queue.length === 0 && (
        <div className="queue-list-empty">
          <div className="queue-list-empty-icon">✂</div>

          <h3>Queue is empty</h3>

          <p>Add a customer to start managing your queue.</p>
        </div>
      )}

      {!loading && queue.length > 0 && (
        <div className="queue-list-items">
          {queue.map((entry, index) => (
            <QueueItem
              key={entry.id}
              entry={entry}
              index={index}
              currentTime={currentTime}
              updating={updating}
              onFinish={onFinish}
              onRemove={onRemove}
            />
          ))}
        </div>
      )}
    </section>
  );
}
