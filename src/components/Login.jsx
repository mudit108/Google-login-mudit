import React, { useState } from "react";
import { handleAuthError, useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);
  const { Login } = useAuth;

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await Login(email, password);
      navigate("/dashboard");
    } catch (error) {
      setError(handleAuthError(error));
      alert(error);
    }
    setLoading(false);
  }

  return (
    <div>
      <div>Login</div>
      <UserPlus size={32} />
      {error && <div>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email-address">Email address </label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit" disabled={loading}>
            {loading ? "Creating account" : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
