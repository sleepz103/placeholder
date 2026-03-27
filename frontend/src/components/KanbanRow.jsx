import { useState, useEffect } from "react";
import "./KanbanRow.css";

function KanbanRow({ title, status, onDragStart, onDrop, refreshKey, onTaskClick }) {
  const [tasks, setTasks] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const getTasks = async () => {
    try {
      const res = await fetch(
        `http://localhost:58716/api/tasks?status=${status}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        console.error("Fehler bei der Task-Anfrage", res.status);
        return [];
      } else {
        const tasks = await res.json();
        return tasks;
      }
    } catch (err) {
      console.error("Fehler beim Laden der Aufgaben:", err);
      return [];
    }
  };

  const loadTasks = async () => {
    const loadedTasks = await getTasks();
    setTasks(loadedTasks);
  };

  useEffect(() => {
    loadTasks();
  }, [status, refreshKey]);

  const handleDragStart = (e, task) => {
    const taskId = task.taskId ?? task.id;
    onDragStart({ id: taskId, sourceStatus: status });
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    onDrop(status);
  };

  return (
    <div
      className={`kanbanRow${isDragOver ? " drag-over" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <h2>{title}</h2>
      <div className="kanbanTasks">
        {tasks.map((task) => (
          <div
            key={task.taskId ?? task.id}
            className="kanbanTask"
            draggable
            onDragStart={(e) => handleDragStart(e, task)}
            onClick={() => onTaskClick(task)}
          >
            <h3>{task.title}</h3>
            <p>{task.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default KanbanRow;
