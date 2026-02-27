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

  return (
    <div className="addToDo" onClick={handleOverlayClick}>
      <form className="addToDoForm" action="" onClick={stopPropagation}>
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
      </form>
    </div>
  );
}

export default AddToDoForm;
