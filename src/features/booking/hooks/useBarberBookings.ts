import { useCallback, useEffect, useState } from "react";

import { bookingService } from "../booking.service";

import type { BookingWithDetails } from "../booking";

export function useBarberBookings(barberId: number) {
  const [bookings, setBookings] = useState<BookingWithDetails[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await bookingService.getByBarberId(barberId);

      setBookings(data);
    } catch (error) {
      console.error("Failed to fetch barber bookings:", error);

      setError("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  }, [barberId]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  return {
    bookings,
    loading,
    error,
    refreshBookings: fetchBookings,
  };
}
