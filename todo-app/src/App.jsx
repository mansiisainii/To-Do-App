import { useState, useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AuthPage from "./components/AuthPage";
import Header from "./components/Header";
import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";
import StreakTracker from "./components/StreakTracker";
import Footer from "./components/Footer";
import "./App.css";

function getTodayStr() {
  return new Date().toISOString().slice(0, 10);
}

function getYesterdayStr() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

function TodoApp() {
  const { user } = useAuth();

  const tasksKey = `todo-tasks-${user.id}`;
  const streakKey = `todo-streak-${user.id}`;

  const [tasks, setTasks] = useState(() => {
    try {
      const stored = localStorage.getItem(tasksKey);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [filter, setFilter] = useState("all");

  const [streak, setStreak] = useState(() => {
    try {
      const stored = localStorage.getItem(streakKey);
      return stored
        ? JSON.parse(stored)
        : { currentStreak: 0, longestStreak: 0, lastCompletedDate: null };
    } catch {
      return { currentStreak: 0, longestStreak: 0, lastCompletedDate: null };
    }
  });

  useEffect(() => {
    localStorage.setItem(tasksKey, JSON.stringify(tasks));
  }, [tasks, tasksKey]);

  useEffect(() => {
    localStorage.setItem(streakKey, JSON.stringify(streak));
  }, [streak, streakKey]);

  useEffect(() => {
    const today = getTodayStr();
    const todayTasks = tasks.filter(
      (t) => t.createdAt.slice(0, 10) === today
    );

    if (todayTasks.length === 0) return;

    const allDone = todayTasks.every((t) => t.completed);

    setStreak((prev) => {
      if (!allDone) return prev;

      if (prev.lastCompletedDate === today) return prev;

      const yesterday = getYesterdayStr();
      const isConsecutive = prev.lastCompletedDate === yesterday;
      const newCurrent = isConsecutive ? prev.currentStreak + 1 : 1;

      return {
        currentStreak: newCurrent,
        longestStreak: Math.max(prev.longestStreak, newCurrent),
        lastCompletedDate: today,
      };
    });
  }, [tasks]);

  const addTask = (text) => {
    setTasks((prev) => [
      {
        id: Date.now().toString(),
        text,
        completed: false,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  const toggleTask = (id) => {
    setTasks((prev) => {
      const task = prev.find((t) => t.id === id);
      if (task && task.completed) {
        setStreak((s) => {
          const revertedStreak = Math.max(0, s.currentStreak - 1);
          return {
            currentStreak: revertedStreak,
            longestStreak: s.longestStreak,
            lastCompletedDate: revertedStreak > 0 ? getYesterdayStr() : null,
          };
        });
      }
      return prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
    });
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const editTask = (id, newText) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: newText } : t))
    );
  };

  const todayStr = getTodayStr();
  const todayTasks = tasks.filter((t) => t.createdAt.slice(0, 10) === todayStr);
  const todayComplete =
    todayTasks.length > 0 && todayTasks.every((t) => t.completed);

  return (
    <div className="app">
      <Header currentStreak={streak.currentStreak} />
      <main className="app-main">
        <StreakTracker
          currentStreak={streak.currentStreak}
          todayComplete={todayComplete}
        />
        <AddTaskForm onAdd={addTask} />
        <TaskList
          tasks={tasks}
          filter={filter}
          onFilterChange={setFilter}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onEdit={editTask}
        />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  const { user } = useAuth();

  return (
    <ThemeProvider>
      {user ? <TodoApp key={user.id} /> : <AuthPage />}
    </ThemeProvider>
  );
}

export default function Root() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
