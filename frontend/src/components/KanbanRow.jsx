import { useState, useEffect } from "react";
import "./KanbanRow.css";

function KanbanRow({ title, status }) {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    try {
      const res = await fetch(
        `http://localhost:58716/api/tasks?status=${status}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
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
  }, [status]);

  return (
    <div className="kanbanRow">
      <h2>{title}</h2>
      <div className="kanbanTasks">
        {tasks.map((task) => (
          <div key={task.id} className="kanbanTask">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default KanbanRow;
