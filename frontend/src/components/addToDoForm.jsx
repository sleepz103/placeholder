import "./addToDoForm.css";

function AddToDoForm({ onClose }) {
  const handleOverlayClick = () => {
    if (onClose) {
      onClose();
    }
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const addToDoItem = async () => {
    const title = document.getElementById("todoTitle").value;
    const dueDate = document.getElementById("todoDueDate").value;
    const completionDate = document.getElementById("todoCompletionDate").value;

    const response = await fetch("http://localhost:58715/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        dueDate,
        completionDate
      })
    });

    if (response.ok) {
      const newTodo = await response.json();
      if (onClose) {
        onClose();
      }
    }
  };

  return (
    <div className="addToDo" onClick={handleOverlayClick}>
      <form className="addToDoForm" action="" onClick={stopPropagation} onSubmit={addToDoItem}>
        <label htmlFor="todoTitle">Titel:</label>
        <br />
        <input type="text" id="todoTitle" />
        <br />
        <label htmlFor="todoDueDate">Fälligkeitsdatum:</label>
        <br />
        <input type="date" id="todoDueDate" />
        <br />
        <label htmlFor="todoCompletionDate">Bearbeitungsdatum:</label>
        <br />
        <input type="date" id="todoCompletionDate" />
        <br />
        <button type="submit" className="addToDoButton">
          Hinzufügen
        </button>
      </form>
    </div>
  );
}

export default AddToDoForm;
