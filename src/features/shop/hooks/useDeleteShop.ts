import { useState } from "react";

import { shopService } from "../shop.service";

export function useDeleteShop() {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  async function deleteShop(id: number) {
    try {
      setLoading(true);
      setError(null);

      await shopService.delete(id);
    } catch {
      setError("Failed to delete shop");

      throw new Error("Failed to delete shop");
    } finally {
      setLoading(false);
    }
  }

  return {
    deleteShop,
    loading,
    error,
  };
}
