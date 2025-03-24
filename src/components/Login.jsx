import React, { useState } from "react";
import { handleAuthError, useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      setError(handleAuthError(error));
    }
    setLoading(false);
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
        <div className="text-center mb-3">
          {/* <LogIn size={40} /> */}
          <h2 className="mt-2 display-4">Login</h2>
          <p className="font-decoration-underline">
            <Link to="/signup">Signup to create an account</Link>
          </p>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email-address" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              id="email-address"
              required
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              required
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
