import "./addToDoForm.css";
import { useEffect, useState } from "react";

function AddToDoForm({ onClose, onAdded }) {

  const [categories, setCategories] = useState([]);

  // Pre-Assign today values when creating task
  useEffect(() => {

    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const todayFormatted = formatDate(new Date());

    document.getElementById("todoCompletionDate").value = todayFormatted;
    document.getElementById("todoDueDate").value = todayFormatted;
    document.getElementById("todoStartDate").value = todayFormatted;
    }, []);// The empty array [] means "run this only once on load"


  const handleOverlayClick = () => {
    if (onClose) {
      onClose();
    }
  };

  // Fetch categories from DB for when creating task
  useEffect(() => {
  const fetchCategories = async () => {
    const res = await fetch("http://localhost:58716/api/tasks/categories");
    const data = await res.json();
    setCategories(data.filter(c => c !== null));
  };
  fetchCategories();
}, []);

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
      onAdded?.();
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
        <input 
          type="text" 
          id="todoCategory" 
          list="categoryList" 
          autoComplete="off"
        />
        <datalist id="categoryList">
        {categories.map((cat, index) => ( //Datalist with help and explanation by Gemini 3.1
          <option key={index} value={cat} />
        ))}
        </datalist>

        <button type="submit" className="submitButton">
          Hinzufügen
        </button>
      </form>
    </div>
  );
}

export default AddToDoForm;
