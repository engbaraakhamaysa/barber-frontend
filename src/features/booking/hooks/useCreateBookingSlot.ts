import { useState } from "react";

import { bookingSlotService } from "../booking-slot.service";

import type { BookingSlot, CreateBookingSlotRequest } from "../booking-slot";

export function useCreateBookingSlots() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createSlots = async (
    slots: CreateBookingSlotRequest[],
  ): Promise<BookingSlot[]> => {
    try {
      setLoading(true);
      setError(null);

      const createdSlots = await Promise.all(
        slots.map((slot) => bookingSlotService.create(slot)),
      );

      return createdSlots;
    } catch (error) {
      console.error("Failed to create booking slots:", error);

      setError("Failed to create booking slots");

      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    createSlots,
    loading,
    error,
  };
}
