import React, { useState } from "react";
import { handleAuthError, useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signup, googleSignIn } = useAuth();
  const navigate = useNavigate();

  async function handleGoogleSignIn() {
    try {
      await googleSignIn();
      navigate("/dashboard");
    } catch (error) {
      setError(handleAuthError(error));
      console.log(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError("Passwords do not match!");
    }
    try {
      setError("");
      setLoading(true);
      await signup(email, password);
      navigate("/login");
    } catch (error) {
      setError(handleAuthError(error));
      alert(error);
    }
    setLoading(false);
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
        <div className="text-center mb-3">
          <UserPlus size={40} />
          <h2 className="mt-2">Create a New Account</h2>
          <p>
            <Link to="/login">Sign in to your existing account</Link>
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
          <div className="mb-3">
            <label htmlFor="confirm-password" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirm-password"
              required
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </div>
        </form>
        <div className="text-center mt-3">
          <button
            className="btn btn-danger w-100"
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign Up with Google"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
