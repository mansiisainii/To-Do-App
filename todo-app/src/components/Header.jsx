import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

/**
 * Header displays the current date (auto-updating daily) and the
 * aesthetic / bold theme toggle switch.
 */
export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [dateStr, setDateStr] = useState(formatDate());

  // Re-check date every minute so it updates around midnight
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

      {/* Theme toggle switch */}
      <div className="theme-toggle-wrapper">
        <span className="toggle-label toggle-label-left">
          Toggle
        </span>
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
        <span className="toggle-label toggle-label-right">
          Theme
        </span>
      </div>
    </header>
  );
}

/** Format today's date as "Sunday, July 12, 2026" */
function formatDate() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
