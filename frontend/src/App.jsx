import { useState, useCallback } from "react";
import "./App.css";
import AddToDoForm from "./components/addToDoForm";
import AddToDoButton from "./components/addToDoButton";
import KanbanRow from "./components/KanbanRow";
import ChangeThemeButton from "./components/ChangeThemeButton";

const API_BASE = "http://localhost:58716/api";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [draggedTask, setDraggedTask] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleClick = () => {
    setShowForm((prev) => !prev);
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
    [draggedTask]
  );

  return (
    <>
      <AddToDoButton onClick={handleClick} />
      {showForm && <AddToDoForm onClose={() => setShowForm(false)} />}
      <ChangeThemeButton/>
      <div id="KanbanBoard">
        <KanbanRow
          title="Backlog"
          status={0}
          onDragStart={handleDragStart}
          onDrop={handleDrop}
          refreshKey={refreshKey}
        />
        <KanbanRow
          title="In Progress"
          status={1}
          onDragStart={handleDragStart}
          onDrop={handleDrop}
          refreshKey={refreshKey}
        />
        <KanbanRow
          title="Review"
          status={2}
          onDragStart={handleDragStart}
          onDrop={handleDrop}
          refreshKey={refreshKey}
        />
        <KanbanRow
          title="Done"
          status={3}
          onDragStart={handleDragStart}
          onDrop={handleDrop}
          refreshKey={refreshKey}
        />
      </div>
    </>
  );
}

export default App;
