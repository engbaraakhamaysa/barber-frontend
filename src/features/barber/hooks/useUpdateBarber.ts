import { useState } from "react";

import type { BarberWithUser, UpdateBarberRequest } from "../barber";

import { barberService } from "../barber.service";

export function useUpdateBarber() {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  async function updateBarber(
    id: number,
    data: UpdateBarberRequest,
  ): Promise<BarberWithUser> {
    try {
      setLoading(true);

      setError(null);

      return await barberService.update(id, data);
    } catch {
      setError("Failed to update barber");

      throw new Error("Failed to update barber");
    } finally {
      setLoading(false);
    }
  }

  return {
    updateBarber,
    loading,
    error,
  };
}
