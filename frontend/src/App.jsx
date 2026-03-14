import { useState } from "react";
import "./App.css";
import AddToDoForm from "./components/addToDoForm";
import AddToDoButton from "./components/addToDoButton";
import KanbanRow from "./components/KanbanRow";

function App() {
  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    if (showForm) {
      setShowForm(false);
    } else {
      setShowForm(true);
    }
  };

  return (
    <>
      <AddToDoButton onClick={handleClick} />
      {showForm && <AddToDoForm onClose={() => setShowForm(false)} />}
        <div id="KanbanBoard">
          <KanbanRow title="Backlog" status={0} />
          <KanbanRow title="In Progress" status={1} />
          <KanbanRow title="Review" status={2} />
          <KanbanRow title="Done" status={3} />
        </div>
    </>
  );
}

export default App;
