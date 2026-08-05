import { useState } from "react";

import type { User } from "../../types/users";
import { usersService } from "../../services/users.service";

export function useGetUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function getUsers() {
    try {
      setLoading(true);
      setError(null);

      const data = await usersService.getAll();

      setUsers(data);

      return data;
    } catch (err) {
      setError("Failed to get users");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return {
    users,
    loading,
    error,
    getUsers,
  };
}
