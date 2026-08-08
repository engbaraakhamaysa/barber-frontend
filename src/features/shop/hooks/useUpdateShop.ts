import { useState } from "react";

import type { Shop, UpdateShopRequest } from "../shop";

import { shopService } from "../shop.service";

export function useUpdateShop() {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  async function updateShop(
    id: number,
    data: UpdateShopRequest,
  ): Promise<Shop> {
    try {
      setLoading(true);
      setError(null);

      return await shopService.update(id, data);
    } catch {
      setError("Failed to update shop");

      throw new Error("Failed to update shop");
    } finally {
      setLoading(false);
    }
  }

  return {
    updateShop,
    loading,
    error,
  };
}
