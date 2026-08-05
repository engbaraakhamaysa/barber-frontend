import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { authService } from "../../services/auth.service";

export function useLogin() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(email: string, password: string) {
    try {
      setLoading(true);
      setError(null);

      if (!email.trim()) {
        setError("Email is required");
        return;
      }

      if (!password.trim()) {
        setError("Password is required");
        return;
      }

      await authService.login({
        email,
        password,
      });

      navigate("/users");
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  }

  return {
    submit,
    loading,
    error,
  };
}
