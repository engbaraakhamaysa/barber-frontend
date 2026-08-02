import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../../context/AuthContext";

export function useLogin() {
  const navigate = useNavigate();

  const { login } = useAuthContext();

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const submit = async (email: string, password: string) => {
    try {
      setError("");
      setLoading(true);

      await login({
        email,
        password,
      });

      navigate("/");
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return {
    submit,
    error,
    loading,
  };
}
