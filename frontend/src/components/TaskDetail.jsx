import "./TaskDetail.css";

function TaskDetail({ task, onClose }) {
  if (!task) return null;

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("de-DE");
  };

  const difficultyLabel = {
    Easy: "Leicht", Medium: "Mittel", Hard: "Schwer",
    0: "Leicht", 1: "Mittel", 2: "Schwer",
  };

  const statusLabel = {
    NotDone: "Backlog", InProgress: "In Progress", Done: "Done",
    0: "Backlog", 1: "In Progress", 2: "Done",
  };

  return (
    <div className="detail-overlay" onClick={onClose}>
      <div className="detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="detail-close" onClick={onClose}>✕</button>
        <h2>{task.title}</h2>

        <div className="detail-grid">
          <div className="detail-field">
            <span className="detail-label">Status</span>
            <span className="detail-value">{statusLabel[task.status] ?? task.status}</span>
          </div>
          <div className="detail-field">
            <span className="detail-label">Schwierigkeit</span>
            <span className="detail-value">{difficultyLabel[task.difficulty] ?? task.difficulty}</span>
          </div>
          <div className="detail-field">
            <span className="detail-label">Kategorie</span>
            <span className="detail-value">{task.category || "—"}</span>
          </div>
          <div className="detail-field">
            <span className="detail-label">Startdatum</span>
            <span className="detail-value">{formatDate(task.startDate)}</span>
          </div>
          <div className="detail-field">
            <span className="detail-label">Fälligkeitsdatum</span>
            <span className="detail-value">{formatDate(task.dueDate)}</span>
          </div>
          <div className="detail-field">
            <span className="detail-label">Erstellt am</span>
            <span className="detail-value">{formatDate(task.createdAt)}</span>
          </div>
        </div>

        {task.description && (
          <div className="detail-description">
            <span className="detail-label">Beschreibung</span>
            <p>{task.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskDetail;
