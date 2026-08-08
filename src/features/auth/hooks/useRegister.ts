import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { authService } from "../auth.service";

export function useRegister() {
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [loading, setLoading] = useState(false);

  const submit = async (name: string, email: string, password: string) => {
    try {
      setError("");
      setSuccess("");

      // Validation
      if (!name.trim()) {
        setError("Name is required");
        return;
      }

      if (!email.trim()) {
        setError("Email is required");
        return;
      }

      if (!password.trim()) {
        setError("Password is required");
        return;
      }

      if (password.length < 8) {
        setError("Password must be at least 8 characters");
        return;
      }

      setLoading(true);

      await authService.register({
        name,
        email,
        password,
      });

      setSuccess("Account created successfully");

      navigate("/login");
    } catch (error) {
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
