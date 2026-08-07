import { useState } from "react";

import { customerService } from "../../services/customer.service";

import type {
  Customer,
  UpdateCustomerRequest,
} from "../../types/customer.types";

export function useUpdateCustomer() {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  async function updateCustomer(
    id: number,
    data: UpdateCustomerRequest,
  ): Promise<Customer | null> {
    try {
      setLoading(true);

      setError(null);

      const customer = await customerService.update(id, data);

      return customer;
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to update customer");

      return null;
    } finally {
      setLoading(false);
    }
  }

  return {
    updateCustomer,
    loading,
    error,
  };
}
