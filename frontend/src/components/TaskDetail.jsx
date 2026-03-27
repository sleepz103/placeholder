import { useState } from "react";
import "./TaskDetail.css";

const API_BASE = "http://localhost:58716/api";

function TaskDetail({ task, onClose, onSaved }) {
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    title: task.title || "",
    description: task.description || "",
    category: task.category || "",
    difficulty: task.difficulty ?? "Medium",
    startDate: task.startDate ? task.startDate.slice(0, 10) : "",
    dueDate: task.dueDate ? task.dueDate.slice(0, 10) : "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

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

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const taskId = task.taskId ?? task.id;
      const res = await fetch(`${API_BASE}/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          category: form.category,
          difficulty: form.difficulty,
          startDate: form.startDate || null,
          dueDate: form.dueDate || null,
        }),
      });

      if (res.ok) {
        setEditMode(false);
        if (onSaved) onSaved();
      } else {
        setError("Fehler beim Speichern. Bitte erneut versuchen.");
      }
    } catch (err) {
      setError("Verbindungsfehler. API erreichbar?");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="detail-overlay" onClick={editMode ? undefined : onClose}>
      <div className="detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="detail-close" onClick={onClose}>✕</button>

        {/* ── Leseansicht ── */}
        {!editMode && (
          <>
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
            <button className="detail-btn-edit" onClick={() => setEditMode(true)}>
              Bearbeiten
            </button>
          </>
        )}

        {/* ── Bearbeitungsansicht ── */}
        {editMode && (
          <>
            <h2>Task bearbeiten</h2>
            <div className="detail-edit-form">
              <div className="detail-edit-field">
                <label>Titel</label>
                <input name="title" value={form.title} onChange={handleChange} />
              </div>
              <div className="detail-edit-field">
                <label>Beschreibung</label>
                <textarea name="description" value={form.description} onChange={handleChange} rows={3} />
              </div>
              <div className="detail-grid">
                <div className="detail-edit-field">
                  <label>Kategorie</label>
                  <input name="category" value={form.category} onChange={handleChange} />
                </div>
                <div className="detail-edit-field">
                  <label>Schwierigkeit</label>
                  <select name="difficulty" value={form.difficulty} onChange={handleChange}>
                    <option value="Easy">Leicht</option>
                    <option value="Medium">Mittel</option>
                    <option value="Hard">Schwer</option>
                  </select>
                </div>
                <div className="detail-edit-field">
                  <label>Startdatum</label>
                  <input type="date" name="startDate" value={form.startDate} onChange={handleChange} />
                </div>
                <div className="detail-edit-field">
                  <label>Fälligkeitsdatum</label>
                  <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} />
                </div>
              </div>
            </div>

            {error && <p className="detail-error">{error}</p>}

            <div className="detail-btn-row">
              <button className="detail-btn-cancel" onClick={() => setEditMode(false)} disabled={saving}>
                Abbrechen
              </button>
              <button className="detail-btn-save" onClick={handleSave} disabled={saving}>
                {saving ? "Speichert..." : "Speichern"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default TaskDetail;
