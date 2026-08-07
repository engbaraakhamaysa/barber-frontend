import { useState } from "react";

import { customerService } from "../../services/customer.service";

import type {
  Customer,
  CreateCustomerRequest,
} from "../../types/customer.types";

export function useCreateCustomer() {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  async function createCustomer(
    data: CreateCustomerRequest,
  ): Promise<Customer | null> {
    try {
      setLoading(true);

      setError(null);

      const customer = await customerService.create(data);

      return customer;
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to create customer");

      return null;
    } finally {
      setLoading(false);
    }
  }

  return {
    createCustomer,
    loading,
    error,
  };
}
