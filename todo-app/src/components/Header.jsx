import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { LogOut } from "lucide-react";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [dateStr, setDateStr] = useState(formatDate());

  useEffect(() => {
    const interval = setInterval(() => setDateStr(formatDate()), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="app-header">
      <div className="header-content">
        <h1 className="app-title">My To-Do List</h1>
        <p className="current-date">{dateStr}</p>
      </div>

      <div className="header-actions">
        <div className="theme-toggle-wrapper">
          <span className="toggle-label toggle-label-left">Toggle</span>
          <label className="theme-toggle" aria-label="Toggle theme">
            <input
              type="checkbox"
              checked={theme === "bold"}
              onChange={toggleTheme}
            />
            <span className="toggle-track">
              <span className="toggle-thumb">
                {theme === "aesthetic" ? "\u2600" : "\u263E"}
              </span>
            </span>
          </label>
          <span className="toggle-label toggle-label-right">Theme</span>
        </div>

        <div className="user-section">
          <span className="user-name">{user?.username}</span>
          <button
            className="logout-btn"
            onClick={logout}
            aria-label="Log out"
            title="Log out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}

function formatDate() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
