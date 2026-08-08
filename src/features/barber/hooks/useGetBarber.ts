import { useState } from "react";

import type { BarberWithUser } from "../barber";

import { barberService } from "../barber.service";

export function useGetBarber() {
  const [barber, setBarber] = useState<BarberWithUser | null>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  async function getBarber(id: number) {
    try {
      setLoading(true);

      setError(null);

      const data = await barberService.get(id);

      setBarber(data);

      return data;
    } catch {
      setError("Failed to get barber");

      throw new Error("Failed to get barber");
    } finally {
      setLoading(false);
    }
  }

  return {
    barber,
    loading,
    error,
    getBarber,
  };
}
