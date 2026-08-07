import { useState } from "react";

import { customerService } from "../../services/customer.service";
import { Customer } from "../../types/customer.types";

export function useGetCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  async function getCustomers() {
    try {
      setLoading(true);

      setError(null);

      const data = await customerService.getAll();

      setCustomers(data);
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to get customers");
    } finally {
      setLoading(false);
    }
  }

  return {
    customers,

    loading,

    error,

    getCustomers,
  };
}
