import { useState } from "react";

import { bookingService } from "../booking.service";

import type { Booking, CreateBookingRequest } from "../booking";

export function useCreateBooking() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createBooking = async (
    data: CreateBookingRequest,
  ): Promise<Booking> => {
    try {
      setLoading(true);
      setError(null);

      const booking = await bookingService.create(data);

      return booking;
    } catch (error) {
      console.error("Failed to create booking:", error);

      setError("Failed to create booking");

      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    createBooking,
    loading,
    error,
  };
}
