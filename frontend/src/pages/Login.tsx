import { useState } from "react";
import { login } from "../services/auth";
import { saveToken } from "../utils/authToken.ts";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMsg("Please fill in all fields");
      return;
    }

    setErrorMsg(null);
    setLoading(true);

    try {
      const res = await login({ email: email.trim().toLowerCase(), password });
      if (res.token) {
        saveToken(res.token);
        navigate("/");
      }
    } catch (e: any) {
      setErrorMsg(e.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <h1 className="form-title">Welcome Back</h1>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
          />
        </div>
        {errorMsg && <div className="error-message">{errorMsg}</div>}
        <div className="form-actions">
          <button onClick={handleLogin} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
        <p className="form-footer">
          Don't have an account?{" "}
          <a href="/register" className="form-link">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}
