import { useState } from "react";
import { Link } from "react-router-dom";

import "./styles/auth.css";
import { useRegister } from "../../hooks/auth/useRegister";

export default function Register() {
  const { submit, error, success, loading } = useRegister();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    submit(name, email, password);
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Register</h1>

        {error && <p className="auth-error">{error}</p>}

        {success && <p className="auth-success">{success}</p>}

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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
          {loading ? "Loading..." : "Create Account"}
        </button>

        <Link className="auth-link" to="/login">
          Already have account?
        </Link>
      </form>
    </div>
  );
}
