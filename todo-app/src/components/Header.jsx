import { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { LogOut, Flame } from "lucide-react";
import { GirlAvatar, BoyAvatar } from "./Avatars";

function UserAvatar({ avatar, size = 28 }) {
  return avatar === "boy" ? <BoyAvatar size={size} /> : <GirlAvatar size={size} />;
}

export default function Header({ currentStreak }) {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [dateStr, setDateStr] = useState(formatDate());
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => setDateStr(formatDate()), 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
    if (showProfile) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showProfile]);

  return (
    <header className="app-header">
      <div className="header-content">
        <h1 className="app-title">My To-Do List</h1>
        <p className="current-date">{dateStr}</p>
      </div>

      <div className="header-actions">
        <div className="theme-toggle-wrapper">
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
        </div>

        <div className="user-section" ref={profileRef}>
          <button
            className="profile-btn"
            onClick={() => setShowProfile((prev) => !prev)}
            aria-label="Profile"
            title="Profile"
          >
            <UserAvatar avatar={user?.avatar} size={26} />
          </button>
          <button
            className="logout-btn"
            onClick={logout}
            aria-label="Log out"
            title="Log out"
          >
            <LogOut size={16} />
          </button>

          {showProfile && (
            <div className="profile-card">
              <div className="profile-avatar">
                <UserAvatar avatar={user?.avatar} size={56} />
              </div>
              <div className="profile-info">
                <p className="profile-name">{user?.username}</p>
                <p className="profile-email">{user?.email}</p>
              </div>
              <div className="profile-streak">
                <Flame size={18} className="profile-streak-icon" />
                <span className="profile-streak-count">{currentStreak}</span>
                <span className="profile-streak-label">
                  {currentStreak === 1 ? "day" : "days"} streak
                </span>
              </div>
            </div>
          )}
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
