import { useState } from "react";

import type { Shop } from "../shop";

import { shopService } from "../shop.service";

export function useGetShops() {
  const [shops, setShops] = useState<Shop[]>([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  async function getShops() {
    try {
      setLoading(true);
      setError(null);

      const data = await shopService.getAll();

      setShops(data);

      return data;
    } catch {
      setError("Failed to get shops");

      throw new Error("Failed to get shops");
    } finally {
      setLoading(false);
    }
  }

  return {
    shops,
    loading,
    error,
    getShops,
  };
}
