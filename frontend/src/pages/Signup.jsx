import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
export default function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [error, setError] = useState("");
    const [notification, setNotification] = useState("");
    const [mismatch, setMismatch] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setNotification("");

        if (password !== confirm) {
            setMismatch(true);
            return;
        }

        setMismatch(false);

        try {
            const response = await fetch("http://localhost:8000/core/register/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.detail || "Signup failed");
            } else {
                setNotification("Signup successful! Redirecting to login...");
                setTimeout(() => navigate("/login"), 1200);
            }
        } catch (err) {
            setError("Network error. Please try again.");
        }
    };

    return (
        <>
            <div className="auth-page">
                <div className="auth-glass-card auth-transition"> {/* Wrap the signup form in auth-glass-card */}   
                <div className="auth-container">
                    <h2>Sign Up</h2>
                    <form onSubmit={handleSubmit} className="auth-form">
                        <input
                            type="text"
                            placeholder="Username"
                            className="auth-input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
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
                        <div className="auth-password-wrapper">
                            <input
                                type={showConfirm ? "text" : "password"}
                                placeholder="Confirm Password"
                                className="auth-input"
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                                required
                            />
                            <span onClick={() => setShowConfirm((v) => !v)} style={{ cursor: "pointer" }}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        
                        <button type="submit">Sign Up</button>
                        {mismatch && <div className="auth-error">⚠️ Passwords do not match.</div>}
                        {error && <div className="auth-error">{error}</div>}
                        {notification && <div className="auth-toast">{notification}</div>}
                    </form>
                    <div className="auth-switch">
                        Already have an account? <a href="/login" className="auth-link">Login</a>
                    </div>
                </div>
                </div>
            </div>
        </>
    );
}
