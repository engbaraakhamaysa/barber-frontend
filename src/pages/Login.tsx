import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useLogin } from "../hooks/auth/useLogin";

import "./styles/auth.css";

export default function Login() {
  const navigate = useNavigate();

  const { submit, error, loading } = useLogin();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await submit(email, password);
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Login</h1>

        {error && <p className="auth-error">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button disabled={loading}>{loading ? "Loading..." : "Login"}</button>

        <p className="auth-link" onClick={() => navigate("/register")}>
          Create account
        </p>
      </form>
    </div>
  );
}
