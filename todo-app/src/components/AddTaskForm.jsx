import { useState } from "react";

/**
 * AddTaskForm — a search-bar-style input at the top for adding new tasks.
 * Accepts Enter key and a "+" button click.
 */
export default function AddTaskForm({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setText("");
  };

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <input
        className="add-task-input"
        type="text"
        placeholder="What needs to be done?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        aria-label="New task"
      />
      <button className="add-task-btn" type="submit" aria-label="Add task">
        +
      </button>
    </form>
  );
}
