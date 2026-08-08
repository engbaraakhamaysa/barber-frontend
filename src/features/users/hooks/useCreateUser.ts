import { useState } from "react";
import { CreateUserRequest } from "../users.types";
import { usersService } from "../users.service";

export function useCreateUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function createUser(data: CreateUserRequest) {
    try {
      setLoading(true);
      setError(null);

      return await usersService.create(data);
    } catch (err) {
      setError("Failed to create user");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    error,
    createUser,
  };
}
