import { useState } from "react";
import { handleAuthError, useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const { signup, googleSignIn } = useAuth();

  const navigate = useNavigate;

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
      return setError("password does not match!");
    }
    try {
      setError("");
      setLoading(true);
      await signup(email, password);
      navigate("/dashboard");
    } catch (error) {
      setError(handleAuthError(error));
      alert(error);
    }
    setLoading(false);
  }
  return (
    <>
      <div>
        <UserPlus />
      </div>
      <div>
        <h2>create a new account</h2>
        <p>
          <link to="/login">signin into your existing account</link>
        </p>
      </div>
      {error && <div>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email-address">email address</label>
          <input
            type="email"
            id="email-address"
            name="email"
            required
            placeholder="enter email"
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
          <label htmlFor="confirm-password">Confirm Password </label>
          <input
            id="confirm-password"
            name="confirm-password"
            type="password"
            autoComplete="new-password"
            required
            placeholder="Enter confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div>
          <button type="submit" disabled={loading}>
            {loading ? "Creating account" : "Signup"}
          </button>
        </div>
      </form>
      <div>
        <button onClick={handleGoggleSignIn} disabled={loading}>
          {loading ? "Loading" : "Siginup with google"}
        </button>
      </div>
    </>
  );
}

export default SignUp;
