import { useState } from "react";

import { customerService } from "../customer.service";
import { Customer } from "../customer.types";

export function useGetCustomer() {
  const [customer, setCustomer] = useState<Customer | null>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  async function getCustomer(id: number) {
    try {
      setLoading(true);

      setError(null);

      const data = await customerService.get(id);

      setCustomer(data);
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to get customer");
    } finally {
      setLoading(false);
    }
  }

  return {
    customer,

    loading,

    error,

    getCustomer,
  };
}
