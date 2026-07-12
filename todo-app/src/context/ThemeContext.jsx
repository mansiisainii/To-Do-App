import { createContext, useState, useContext, useEffect } from "react";

/**
 * Theme context provides the current theme ("aesthetic" | "bold")
 * and a toggle function. Persists the choice in localStorage.
 */
const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("todo-theme") || "aesthetic";
  });

  useEffect(() => {
    localStorage.setItem("todo-theme", theme);
    // Apply the theme class to the document root for CSS variable switching
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "aesthetic" ? "bold" : "aesthetic"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
