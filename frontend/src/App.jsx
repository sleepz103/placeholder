import { useState, useCallback, useEffect } from "react";
import "./App.css";
import AddToDoForm from "./components/addToDoForm";
import AddToDoButton from "./components/addToDoButton";
import KanbanRow from "./components/KanbanRow";
import TaskDetail from "./components/TaskDetail";
import ChangeThemeButton from "./components/ChangeThemeButton";
import PointsCount from "./components/PointsCount";

const API_BASE = "http://localhost:58716/api";
const THEME_ORDER = ["light", "dark", "duotone", "vibrant"];

function App() {
  const [showForm, setShowForm] = useState(false);
  const [draggedTask, setDraggedTask] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedTask, setSelectedTask] = useState(null);
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return THEME_ORDER.includes(savedTheme) ? savedTheme : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", currentTheme);
    localStorage.setItem("theme", currentTheme);
  }, [currentTheme]);

  const handleClick = () => {
    setShowForm((prev) => !prev);
  };

  const handleTaskAdded = () => {
    setRefreshKey((k) => k + 1)};
  
  const handleThemeToggle = () => {
    setCurrentTheme((prev) => {
      const currentIndex = THEME_ORDER.indexOf(prev);
      const nextIndex = (currentIndex + 1) % THEME_ORDER.length;
      return THEME_ORDER[nextIndex];
    });
  };

  const handleDragStart = useCallback((task) => {
    setDraggedTask(task);
  }, []);

  const handleDrop = useCallback(
    async (targetStatus) => {
      if (!draggedTask || draggedTask.sourceStatus === targetStatus) {
        setDraggedTask(null);
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/tasks/${draggedTask.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: targetStatus }),
        });

        if (res.ok) {
          setRefreshKey((k) => k + 1);
        } else {
          console.error("Fehler beim Verschieben des Tasks:", res.status);
        }
      } catch (err) {
        console.error("Fehler beim API-Aufruf:", err);
      } finally {
        setDraggedTask(null);
      }
    },
    [draggedTask],
  );

  return (
    <>
      <PointsCount />
      <AddToDoButton onClick={handleClick} />
      {showForm && (
        <AddToDoForm
          onClose={() => setShowForm(false)}
          onAdded={handleTaskAdded}
        />
      )}

      {selectedTask && (
        <TaskDetail
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onSaved={() => {
            setSelectedTask(null);
            setRefreshKey((k) => k + 1);
          }}
        />
      )}

      <ChangeThemeButton onClick={handleThemeToggle} />
      <div id="KanbanBoard">
        <KanbanRow
          title="Backlog"
          status={0}
          onDragStart={handleDragStart}
          onDrop={handleDrop}
          refreshKey={refreshKey}
          onTaskClick={setSelectedTask}
        />
        <KanbanRow
          title="In Progress"
          status={1}
          onDragStart={handleDragStart}
          onDrop={handleDrop}
          refreshKey={refreshKey}
          onTaskClick={setSelectedTask}
        />
        <KanbanRow
          title="Review"
          status={2}
          onDragStart={handleDragStart}
          onDrop={handleDrop}
          refreshKey={refreshKey}
          onTaskClick={setSelectedTask}
        />
        <KanbanRow
          title="Done"
          status={3}
          onDragStart={handleDragStart}
          onDrop={handleDrop}
          refreshKey={refreshKey}
          onTaskClick={setSelectedTask}
        />
      </div>
    </>
  );
}

export default App;
