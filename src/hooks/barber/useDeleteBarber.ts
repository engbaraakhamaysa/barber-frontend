import { useState } from "react";

import { barberService } from "../../services/barber.service";

export function useDeleteBarber() {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  async function deleteBarber(id: number) {
    try {
      setLoading(true);

      setError(null);

      await barberService.delete(id);
    } catch {
      setError("Failed to delete barber");

      throw new Error("Failed to delete barber");
    } finally {
      setLoading(false);
    }
  }

  return {
    deleteBarber,
    loading,
    error,
  };
}
