import { useState } from "react";

import type { CreateShopRequest } from "../shop";

import { shopService } from "../shop.service";

export function useCreateShop() {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  async function createShop(data: CreateShopRequest) {
    try {
      setLoading(true);
      setError(null);

      return await shopService.create(data);
    } catch {
      setError("Failed to create shop");

      throw new Error("Failed to create shop");
    } finally {
      setLoading(false);
    }
  }

  return {
    createShop,
    loading,
    error,
  };
}
