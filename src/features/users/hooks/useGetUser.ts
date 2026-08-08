import { useState } from "react";
import { usersService } from "../users.service";
import { User } from "../users.types";

export function useGetUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function getUser(id: number) {
    try {
      setLoading(true);
      setError(null);

      const data = await usersService.get(id);

      setUser(data);

      return data;
    } catch (err) {
      setError("Failed to get user");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return {
    user,
    loading,
    error,
    getUser,
  };
}
