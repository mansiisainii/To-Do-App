import { useState, useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Header from "./components/Header";
import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";
import Footer from "./components/Footer";
import "./App.css";

/**
 * Root component. Manages the task list in state and persists it
 * to localStorage. Wraps everything in the ThemeProvider.
 */
function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const stored = localStorage.getItem("todo-tasks");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [filter, setFilter] = useState("all");

  // Persist tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todo-tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task
  const addTask = (text) => {
    setTasks((prev) => [
      {
        id: Date.now().toString(),
        text,
        completed: false,
        createdAt: new Date().toISOString(),
      },
      ...prev, // newest first
    ]);
  };

  // Toggle completion status
  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // Edit a task's text
  const editTask = (id, newText) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: newText } : t))
    );
  };

  return (
    <ThemeProvider>
      <div className="app">
        <Header />
        <main className="app-main">
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
    </ThemeProvider>
  );
}

export default App;
