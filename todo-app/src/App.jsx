import { useState, useEffect, useRef } from "react";
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
        : {
            currentStreak: 0,
            longestStreak: 0,
            lastCompletedDate: null,
            lastProcessedDate: null,
          };
    } catch {
      return {
        currentStreak: 0,
        longestStreak: 0,
        lastCompletedDate: null,
        lastProcessedDate: null,
      };
    }
  });

  useEffect(() => {
    localStorage.setItem(tasksKey, JSON.stringify(tasks));
  }, [tasks, tasksKey]);

  useEffect(() => {
    localStorage.setItem(streakKey, JSON.stringify(streak));
  }, [streak, streakKey]);

  const tasksRef = useRef(tasks);
  tasksRef.current = tasks;

  const findPreviousActiveDay = (checkDate) => {
    let d = new Date(checkDate + "T12:00:00Z");
    for (let i = 0; i < 365; i++) {
      d.setDate(d.getDate() - 1);
      const ds = d.toISOString().slice(0, 10);
      if (tasksRef.current.some((t) => t.createdAt.slice(0, 10) === ds))
        return ds;
    }
    return null;
  };

  const checkMidnight = () => {
    const today = getTodayStr();
    const currentTasks = tasksRef.current;

    setStreak((prev) => {
      if (prev.lastProcessedDate === today) return prev;

      const startDate = prev.lastProcessedDate || getYesterdayStr();

      const datesToCheck = [];
      let d = new Date(startDate + "T12:00:00Z");
      const todayDate = new Date(today + "T12:00:00Z");
      d.setDate(d.getDate() + 1);

      while (d < todayDate) {
        datesToCheck.push(d.toISOString().slice(0, 10));
        d.setDate(d.getDate() + 1);
      }

      if (datesToCheck.length === 0) {
        return { ...prev, lastProcessedDate: startDate };
      }

      let newStreak = prev.currentStreak;
      let newLastCompleted = prev.lastCompletedDate;
      let failed = false;

      for (const dayStr of datesToCheck) {
        const dayTasks = currentTasks.filter(
          (t) => t.createdAt.slice(0, 10) === dayStr
        );

        if (dayTasks.length === 0) continue;

        const allDone = dayTasks.every((t) => t.completed);

        if (!failed && allDone) {
          const prevActiveDay = findPreviousActiveDay(dayStr);
          const isConsecutive =
            prevActiveDay === null || prevActiveDay === newLastCompleted;
          newStreak = isConsecutive ? newStreak + 1 : 1;
          newLastCompleted = dayStr;
        } else if (!allDone) {
          failed = true;
          newStreak = 0;
          newLastCompleted = null;
        }
      }

      return {
        currentStreak: failed ? 0 : newStreak,
        longestStreak: Math.max(prev.longestStreak, failed ? 0 : newStreak),
        lastCompletedDate: failed ? null : newLastCompleted,
        lastProcessedDate: today,
      };
    });
  };

  useEffect(() => {
    checkMidnight();
  }, [tasks]);

  useEffect(() => {
    const interval = setInterval(checkMidnight, 60000);
    return () => clearInterval(interval);
  }, []);

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
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
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
