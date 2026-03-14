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

  const addToDoItem = async (e) => {
    e.preventDefault();

    const title = document.getElementById("todoTitle").value.trim();
    const completionDate = document.getElementById("todoCompletionDate").value;
    const dueDate = document.getElementById("todoDueDate").value;
    const description = document.getElementById("todoDescription").value.trim();
    const startDate = document.getElementById("todoStartDate").value;
    const category = document.getElementById("todoCategory").value.trim();

    if (!title) {
      alert("Titel darf nicht leer sein.");
      return;
    }

    try {
      const response = await fetch("http://localhost:58716/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          completionDate: completionDate || null,
          dueDate: dueDate || null,
          description: description || null,
          startDate: startDate || null,
          category: category || null,
        }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Status ${response.status} ${response.statusText} ${errorText}`);
      }
      const newTodo = await response.json();
      console.log("Neues Todo erstellt:", newTodo);
      onClose?.();
    } catch (err) {
      console.error("addToDoItem fehlgeschlagen:", err);
      alert("Fehler beim Speichern: " + err.message);
    }
  };

  return (
    <div className="addToDo" onClick={handleOverlayClick}>
      <form
        className="addToDoForm"
        action=""
        onClick={stopPropagation}
        onSubmit={addToDoItem}
      >
        <label htmlFor="todoTitle">Titel:</label>
        <input type="text" id="todoTitle" />

        <label htmlFor="todoCompletionDate">Bearbeitungsdatum:</label>
        <input type="date" id="todoCompletionDate" />

        <label htmlFor="todoDueDate">Fälligkeitsdatum:</label>
        <input type="date" id="todoDueDate" />

        <label htmlFor="todoDescription">Beschreibung:</label>
        <input type="text" id="todoDescription" />

        <label htmlFor="todoStartDate">Startdatum:</label>
        <input type="date" id="todoStartDate" />

        <label htmlFor="todoCategory">Kategorie:</label>
        <input type="text" id="todoCategory" />

        <button type="submit" className="submitButton">
          Hinzufügen
        </button>
      </form>
    </div>
  );
}

export default AddToDoForm;
