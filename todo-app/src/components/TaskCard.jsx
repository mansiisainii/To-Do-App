import { useState, useRef } from "react";

/**
 * TaskCard — renders a single task in a masonry card layout.
 * Supports inline editing, completion toggle, and deletion.
 * Shows a creation timestamp.
 */
export default function TaskCard({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [celebrating, setCelebrating] = useState(false);
  const [burning, setBurning] = useState(false);
  const timeoutRef = useRef(null);

  const handleSave = () => {
    const trimmed = editText.trim();
    if (!trimmed) return;
    if (trimmed !== task.text) {
      onEdit(task.id, trimmed);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") {
      setEditText(task.text);
      setIsEditing(false);
    }
  };

  const handleToggle = () => {
    if (!task.completed) {
      setCelebrating(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCelebrating(false), 800);
    }
    onToggle(task.id);
  };

  const handleDelete = () => {
    setBurning(true);
    setTimeout(() => onDelete(task.id), 900);
  };

  return (
    <div className={`task-card ${task.completed ? "completed" : ""} ${celebrating ? "celebrating" : ""} ${burning ? "burning" : ""}`}>
      {/* Celebration particles */}
      {celebrating && (
        <div className="celebration-particles">
          <span className="particle p1">&#10024;</span>
          <span className="particle p2">&#9733;</span>
          <span className="particle p3">&#10024;</span>
          <span className="particle p4">&#9733;</span>
          <span className="particle p5">&#10024;</span>
        </div>
      )}

      {/* Burning fire overlay */}
      {burning && (
        <div className="burn-overlay">
          <span className="flame f1"></span>
          <span className="flame f2"></span>
          <span className="flame f3"></span>
          <span className="flame f4"></span>
          <span className="flame f5"></span>
          <span className="flame f6"></span>
          <span className="flame f7"></span>
          <span className="ember e1"></span>
          <span className="ember e2"></span>
          <span className="ember e3"></span>
          <span className="ember e4"></span>
          <span className="ember e5"></span>
          <span className="ember e6"></span>
          <span className="ember e7"></span>
          <span className="ember e8"></span>
          <span className="smoke s1"></span>
          <span className="smoke s2"></span>
          <span className="smoke s3"></span>
        </div>
      )}

      {/* Checkbox */}
      <label className="task-checkbox-label">
        <input
          type="checkbox"
          className="task-checkbox"
          checked={task.completed}
          onChange={handleToggle}
          aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
        />
        <span className="checkbox-custom">
          {celebrating && <span className="check-pop" />}
        </span>
      </label>

      {/* Task text (or edit input) */}
      {isEditing ? (
        <input
          className="task-edit-input"
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          autoFocus
          aria-label="Edit task"
        />
      ) : (
        <span
          className={`task-text ${task.completed ? "done" : ""}`}
          onDoubleClick={() => !task.completed && setIsEditing(true)}
        >
          {task.text}
        </span>
      )}

      {/* Action buttons */}
      <div className="task-actions">
        {!isEditing && !task.completed && (
          <button
            className="task-action-btn edit-btn"
            onClick={() => setIsEditing(true)}
            aria-label="Edit task"
            title="Edit"
          >
            &#9998;
          </button>
        )}
        <button
          className="task-action-btn delete-btn"
          onClick={handleDelete}
          aria-label="Delete task"
          title="Delete"
        >
          &#10005;
        </button>
      </div>

      {/* Creation timestamp */}
      <time className="task-timestamp" dateTime={task.createdAt}>
        {new Date(task.createdAt).toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        })}
      </time>
    </div>
  );
}
