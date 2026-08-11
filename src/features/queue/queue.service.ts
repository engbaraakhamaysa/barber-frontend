import Axios from "../../api/axios";

import type { QueueEntry, JoinQueueRequest, UpdateQueueRequest } from "./queue";

export const queueService = {
  ///////////////////////////////////////////
  // JOIN QUEUE
  // Add customer to barber queue
  ///////////////////////////////////////////

  async join(data: JoinQueueRequest): Promise<QueueEntry> {
    const response = await Axios.post<QueueEntry>("/queue", data);

    return response.data;
  },

  ///////////////////////////////////////////
  // GET ALL QUEUE
  ///////////////////////////////////////////

  async getAll(): Promise<QueueEntry[]> {
    const response = await Axios.get<QueueEntry[]>("/queue");

    return response.data;
  },

  ///////////////////////////////////////////
  // GET QUEUE BY BARBER
  // Get active customers for barber
  ///////////////////////////////////////////

  async getByBarberId(barberId: number): Promise<QueueEntry[]> {
    const response = await Axios.get<QueueEntry[]>(`/queue/barber/${barberId}`);

    return response.data;
  },

  ///////////////////////////////////////////
  // GET CUSTOMER ACTIVE QUEUE
  ///////////////////////////////////////////

  async getCustomerQueue(customerId: number): Promise<QueueEntry> {
    const response = await Axios.get<QueueEntry>(
      `/queue/customer/${customerId}`,
    );

    return response.data;
  },

  ///////////////////////////////////////////
  // GET QUEUE BY ID
  ///////////////////////////////////////////

  async get(id: number): Promise<QueueEntry> {
    const response = await Axios.get<QueueEntry>(`/queue/${id}`);

    return response.data;
  },

  ///////////////////////////////////////////
  // COMPLETE CURRENT CUSTOMER
  // Complete current customer and start next
  ///////////////////////////////////////////

  async complete(id: number): Promise<{
    message: string;
    nextCustomer: QueueEntry | null;
  }> {
    const response = await Axios.post<{
      message: string;
      nextCustomer: QueueEntry | null;
    }>(`/queue/${id}/complete`);

    return response.data;
  },

  ///////////////////////////////////////////
  // UPDATE QUEUE
  // Used for other queue updates
  ///////////////////////////////////////////

  async update(id: number, data: UpdateQueueRequest): Promise<QueueEntry> {
    const response = await Axios.put<QueueEntry>(`/queue/${id}`, data);

    return response.data;
  },
};
