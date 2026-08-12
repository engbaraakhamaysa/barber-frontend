import { useCallback, useEffect, useState } from "react";

import { bookingSlotService } from "../booking-slot.service";

import type { BookingSlot } from "../booking-slot";

export function useBookingSlots(barberId: number) {
  const [slots, setSlots] = useState<BookingSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSlots = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await bookingSlotService.getByBarberId(barberId);

      setSlots(data);
    } catch (error) {
      console.error("Failed to fetch booking slots:", error);

      setError("Failed to load booking slots");
    } finally {
      setLoading(false);
    }
  }, [barberId]);

  useEffect(() => {
    fetchSlots();
  }, [fetchSlots]);

  return {
    slots,
    loading,
    error,
    refreshSlots: fetchSlots,
  };
}
