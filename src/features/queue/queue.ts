export type QueueStatus =
  | "waiting"
  | "called"
  | "in_service"
  | "completed"
  | "cancelled";

export interface QueueEntry {
  id: number;
  barber_id: number;
  customer_id: number;
  customer_name: string;
  status: QueueStatus;
  joined_at: string;
  called_at: string | null;
  started_at: string | null;
  completed_at: string | null;
  cancelled_at: string | null;
}

export interface JoinQueueRequest {
  barber_id: number;

  customer_id: number;
}

export interface UpdateQueueRequest {
  status?: QueueStatus;

  barber_id?: number | null;
}
