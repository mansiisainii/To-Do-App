import TaskCard from "./TaskCard";

/**
 * TaskList renders the filter bar and a masonry grid of TaskCards.
 * Supports All / Active / Completed filters.
 */
export default function TaskList({
  tasks,
  filter,
  onFilterChange,
  onToggle,
  onDelete,
  onEdit,
}) {
  const filtered = tasks.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true; // "all"
  });

  return (
    <section className="task-list-section">
      {/* Filter bar */}
      <div className="filter-bar">
        {["all", "active", "completed"].map((f) => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? "active" : ""}`}
            onClick={() => onFilterChange(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
            {f === "all" && ` (${tasks.length})`}
            {f === "active" && ` (${tasks.filter((t) => !t.completed).length})`}
            {f === "completed" &&
              ` (${tasks.filter((t) => t.completed).length})`}
          </button>
        ))}
      </div>

      {/* Masonry grid */}
      {filtered.length === 0 ? (
        <p className="empty-state">
          {filter === "all"
            ? "No tasks yet. Add one above!"
            : filter === "active"
              ? "No active tasks. Great job!"
              : "No completed tasks yet."}
        </p>
      ) : (
        <div className="masonry-grid">
          {filtered.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      )}
    </section>
  );
}
