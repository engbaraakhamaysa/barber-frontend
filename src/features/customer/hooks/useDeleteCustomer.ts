import { useState } from "react";

import { customerService } from "../customer.service";

export function useDeleteCustomer() {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  async function deleteCustomer(id: number): Promise<boolean> {
    try {
      setLoading(true);

      setError(null);

      await customerService.delete(id);

      return true;
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to delete customer");

      return false;
    } finally {
      setLoading(false);
    }
  }

  return {
    deleteCustomer,
    loading,
    error,
  };
}
