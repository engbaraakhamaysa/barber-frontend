import Axios from "../../api/axios";

import type {
  BookingSlot,
  CreateBookingSlotRequest,
  UpdateBookingSlotRequest,
} from "./booking-slot";

export const bookingSlotService = {
  ///////////////////////////////////////////
  // CREATE BOOKING SLOT
  ///////////////////////////////////////////

  async create(data: CreateBookingSlotRequest): Promise<BookingSlot> {
    const response = await Axios.post<BookingSlot>("/booking-slots", data);

    return response.data;
  },

  ///////////////////////////////////////////
  // GET ALL BOOKING SLOTS
  ///////////////////////////////////////////

  async getAll(): Promise<BookingSlot[]> {
    const response = await Axios.get<BookingSlot[]>("/booking-slots");

    return response.data;
  },

  ///////////////////////////////////////////
  // GET BOOKING SLOT BY ID
  ///////////////////////////////////////////

  async getById(id: number): Promise<BookingSlot> {
    const response = await Axios.get<BookingSlot>(`/booking-slots/${id}`);

    return response.data;
  },

  ///////////////////////////////////////////
  // GET BOOKING SLOTS BY BARBER
  ///////////////////////////////////////////

  async getByBarberId(barberId: number): Promise<BookingSlot[]> {
    const response = await Axios.get<BookingSlot[]>(
      `/booking-slots/barber/${barberId}`,
    );

    return response.data;
  },

  ///////////////////////////////////////////
  // UPDATE BOOKING SLOT
  ///////////////////////////////////////////

  async update(
    id: number,
    data: UpdateBookingSlotRequest,
  ): Promise<BookingSlot> {
    const response = await Axios.put<BookingSlot>(`/booking-slots/${id}`, data);

    return response.data;
  },

  ///////////////////////////////////////////
  // DELETE BOOKING SLOT
  ///////////////////////////////////////////

  async deleteById(id: number): Promise<BookingSlot> {
    const response = await Axios.delete<BookingSlot>(`/booking-slots/${id}`);

    return response.data;
  },
};
