import { useState } from "react";

import type { BarberWithUser } from "../../types/barber";

import { barberService } from "../../services/barber.service";

export function useGetBarbersByShop() {
  const [barbers, setBarbers] = useState<BarberWithUser[]>([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  async function getBarbersByShop(shopId: number) {
    try {
      setLoading(true);

      setError(null);

      const data = await barberService.getByShopId(shopId);

      setBarbers(data);

      return data;
    } catch {
      setError("Failed to get barbers");

      throw new Error("Failed to get barbers");
    } finally {
      setLoading(false);
    }
  }

  return {
    barbers,
    loading,
    error,
    getBarbersByShop,
  };
}
