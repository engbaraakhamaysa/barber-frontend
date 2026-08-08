import { useState } from "react";

import { usersService } from "../users.service";

export function useDeleteUser() {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  async function deleteUser(id: number) {
    try {
      setLoading(true);
      setError(null);

      await usersService.delete(id);
    } catch (err) {
      setError("Failed to delete user");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return {
    deleteUser,
    loading,
    error,
  };
}
