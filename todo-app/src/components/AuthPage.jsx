import { useState } from "react";
import { LogIn, UserPlus } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { GirlAvatar, BoyAvatar } from "./Avatars";

export default function AuthPage() {
  const { login, signup } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("girl");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const u = username.trim();
    const em = email.trim();
    const p = password.trim();
    if (!u || !p || (isSignup && !em)) {
      setError("Please fill in all fields");
      return;
    }
    if (isSignup && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
      setError("Please enter a valid email");
      return;
    }
    if (p.length < 4) {
      setError("Password must be at least 4 characters");
      return;
    }
    const result = isSignup ? signup(u, em, p, avatar) : login(u, p);
    if (!result.ok) setError(result.error);
  };

  const toggleMode = () => {
    setIsSignup((prev) => !prev);
    setError("");
    setUsername("");
    setEmail("");
    setPassword("");
    setAvatar("girl");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">My To-Do List</h1>
        <p className="auth-subtitle">
          {isSignup ? "Create an account to get started" : "Welcome back!"}
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {isSignup && (
            <div className="auth-avatar-picker">
              <label className="auth-label">Choose Avatar</label>
              <div className="avatar-options">
                <button
                  type="button"
                  className={`avatar-option ${avatar === "girl" ? "selected" : ""}`}
                  onClick={() => setAvatar("girl")}
                >
                  <GirlAvatar size={52} />
                </button>
                <button
                  type="button"
                  className={`avatar-option ${avatar === "boy" ? "selected" : ""}`}
                  onClick={() => setAvatar("boy")}
                >
                  <BoyAvatar size={52} />
                </button>
              </div>
            </div>
          )}

          <div className="auth-field">
            <label className="auth-label" htmlFor="auth-username">
              {isSignup ? "Username" : "Username or Email"}
            </label>
            <input
              id="auth-username"
              className="auth-input"
              type="text"
              placeholder={isSignup ? "Enter username" : "Enter username or email"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />
          </div>

          {isSignup && (
            <div className="auth-field">
              <label className="auth-label" htmlFor="auth-email">
                Email
              </label>
              <input
                id="auth-email"
                className="auth-input"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          )}

          <div className="auth-field">
            <label className="auth-label" htmlFor="auth-password">
              Password
            </label>
            <input
              id="auth-password"
              className="auth-input"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button className="auth-submit" type="submit">
            {isSignup ? <UserPlus size={18} /> : <LogIn size={18} />}
            {isSignup ? "Sign Up" : "Log In"}
          </button>
        </form>

        <p className="auth-toggle">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button className="auth-toggle-btn" type="button" onClick={toggleMode}>
            {isSignup ? "Log In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}
