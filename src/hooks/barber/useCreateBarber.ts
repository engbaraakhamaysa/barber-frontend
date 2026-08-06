import { useState } from "react";

import type { CreateBarberRequest } from "../../types/barber";

import { barberService } from "../../services/barber.service";

export function useCreateBarber() {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  async function createBarber(data: CreateBarberRequest) {
    try {
      setLoading(true);

      setError(null);

      return await barberService.create(data);
    } catch {
      setError("Failed to create barber");

      throw new Error("Failed to create barber");
    } finally {
      setLoading(false);
    }
  }

  return {
    createBarber,
    loading,
    error,
  };
}
