import Axios from "../../api/axios";

import type {
  Booking,
  BookingWithDetails,
  CreateBookingRequest,
  UpdateBookingRequest,
} from "./booking";

export const bookingService = {
  ///////////////////////////////////////////
  // CREATE BOOKING
  ///////////////////////////////////////////

  async create(data: CreateBookingRequest): Promise<Booking> {
    const response = await Axios.post<Booking>("/bookings", data);

    return response.data;
  },

  ///////////////////////////////////////////
  // GET ALL BOOKINGS
  ///////////////////////////////////////////

  async getAll(): Promise<BookingWithDetails[]> {
    const response = await Axios.get<BookingWithDetails[]>("/bookings");

    return response.data;
  },

  ///////////////////////////////////////////
  // GET BOOKING BY ID
  ///////////////////////////////////////////

  async getById(id: number): Promise<BookingWithDetails> {
    const response = await Axios.get<BookingWithDetails>(`/bookings/${id}`);

    return response.data;
  },

  ///////////////////////////////////////////
  // GET BOOKINGS BY CUSTOMER
  ///////////////////////////////////////////

  async getByCustomerId(customerId: number): Promise<BookingWithDetails[]> {
    const response = await Axios.get<BookingWithDetails[]>(
      `/bookings/customer/${customerId}`,
    );

    return response.data;
  },

  ///////////////////////////////////////////
  // GET BOOKINGS BY BARBER
  ///////////////////////////////////////////

  async getByBarberId(barberId: number): Promise<BookingWithDetails[]> {
    const response = await Axios.get<BookingWithDetails[]>(
      `/bookings/barber/${barberId}`,
    );

    return response.data;
  },

  ///////////////////////////////////////////
  // UPDATE BOOKING
  ///////////////////////////////////////////

  async update(id: number, data: UpdateBookingRequest): Promise<Booking> {
    const response = await Axios.put<Booking>(`/bookings/${id}`, data);

    return response.data;
  },

  ///////////////////////////////////////////
  // DELETE BOOKING
  ///////////////////////////////////////////

  async deleteById(id: number): Promise<Booking> {
    const response = await Axios.delete<{ booking: Booking }>(
      `/bookings/${id}`,
    );

    return response.data.booking;
  },
};
