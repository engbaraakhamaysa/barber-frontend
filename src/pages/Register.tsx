import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useRegister } from "../hooks/auth/useRegister";

import "./styles/auth.css";

export default function Register() {
  const navigate = useNavigate();

  const { submit, error, success, loading } = useRegister();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await submit(name, email, password);
  };

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

        <button disabled={loading}>
          {loading ? "Loading..." : "Create Account"}
        </button>

        <p className="auth-link" onClick={() => navigate("/login")}>
          Already have account?
        </p>
      </form>
    </div>
  );
}
