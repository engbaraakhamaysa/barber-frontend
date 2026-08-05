import { useState } from "react";

import type { User, UpdateUserRequest } from "../../types/users";

import { usersService } from "../../services/users.service";

export function useUpdateUser() {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  async function updateUser(
    id: number,
    data: UpdateUserRequest,
  ): Promise<User> {
    try {
      setLoading(true);
      setError(null);

      const updatedUser = await usersService.update(id, data);

      return updatedUser;
    } catch {
      setError("Failed to update user");

      throw new Error("Failed to update user");
    } finally {
      setLoading(false);
    }
  }

  return {
    updateUser,
    loading,
    error,
  };
}
