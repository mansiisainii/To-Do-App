import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem("todo-users")) || [];
  } catch {
    return [];
  }
}

function hashPassword(pw) {
  let hash = 0;
  for (let i = 0; i < pw.length; i++) {
    const char = pw.charCodeAt(i);
    hash = ((hash << 5) - hash + char) | 0;
  }
  return "h_" + Math.abs(hash).toString(36);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("todo-user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("todo-user", JSON.stringify(user));
    } else {
      localStorage.removeItem("todo-user");
    }
  }, [user]);

  const signup = (username, email, password) => {
    const users = getUsers();
    if (users.find((u) => u.username === username)) {
      return { ok: false, error: "Username already exists" };
    }
    if (users.find((u) => u.email === email)) {
      return { ok: false, error: "Email already registered" };
    }
    const newUser = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      username,
      email,
      password: hashPassword(password),
    };
    users.push(newUser);
    localStorage.setItem("todo-users", JSON.stringify(users));
    setUser({ id: newUser.id, username: newUser.username });
    return { ok: true };
  };

  const login = (usernameOrEmail, password) => {
    const users = getUsers();
    const found = users.find(
      (u) =>
        (u.username === usernameOrEmail || u.email === usernameOrEmail) &&
        u.password === hashPassword(password)
    );
    if (!found) {
      return { ok: false, error: "Invalid credentials" };
    }
    setUser({ id: found.id, username: found.username });
    return { ok: true };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
