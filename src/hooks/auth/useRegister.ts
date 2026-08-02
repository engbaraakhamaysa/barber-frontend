import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { authService } from "../../services/auth.service";

export function useRegister() {
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [loading, setLoading] = useState(false);

  const submit = async (name: string, email: string, password: string) => {
    try {
      setError("");
      setSuccess("");
      setLoading(true);

      await authService.register({
        name,
        email,
        password,
      });

      setSuccess("Account created successfully");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch {
      setError("Email already registered");
    } finally {
      setLoading(false);
    }
  };

  return {
    submit,
    error,
    success,
    loading,
  };
}
