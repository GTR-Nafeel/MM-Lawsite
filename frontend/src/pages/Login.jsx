import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setNotification("");

    try {
      const response = await fetch("http://localhost:8000/api/token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || "Login failed");
      } else {
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        localStorage.setItem("mm_user", JSON.stringify({ email }));

        setNotification("Login successful! Redirecting...");
        setTimeout(() => navigate("/documents"), 1200);
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  return (
    <>
      <div className="auth-page">  
        <div className="auth-glass-card auth-transition"> {/* Wrap the login form in auth-glass-card */}
          <div className="auth-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="auth-form">
              <input
                type="email"
                placeholder="Email"
                className="auth-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="auth-password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="auth-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span onClick={() => setShowPassword((v) => !v)} style={{ cursor: "pointer" }}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <button type="submit">Login</button>
              {error && <div className="auth-error">{error}</div>}
              {notification && <div className="auth-toast">{notification}</div>}
            </form>
            <div className="auth-switch">
              Don't have an account? <a href="/signup" className="auth-link">Sign up</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
