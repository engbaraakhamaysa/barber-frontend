import { useState } from "react";

import type { Shop } from "../../types/shop";

import { shopService } from "../../services/shop.service";

export function useGetShop() {
  const [shop, setShop] = useState<Shop | null>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  async function getShop(id: number) {
    try {
      setLoading(true);
      setError(null);

      const data = await shopService.get(id);

      setShop(data);

      return data;
    } catch {
      setError("Failed to get shop");

      throw new Error("Failed to get shop");
    } finally {
      setLoading(false);
    }
  }

  return {
    shop,
    loading,
    error,
    getShop,
  };
}
