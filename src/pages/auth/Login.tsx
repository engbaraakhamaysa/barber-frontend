import { useState } from "react";
import { Link } from "react-router-dom";

import "./auth.css";
import { useLogin } from "../../features/auth/hooks/useLogin";

export default function Login() {
  const { submit, error, loading } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    submit(email, password);
  }

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

        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>

        <Link className="auth-link" to="/register">
          Create account
        </Link>
      </form>
    </div>
  );
}
