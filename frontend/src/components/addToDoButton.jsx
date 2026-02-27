import "./addToDoButton.css";

function AddToDoButton({ onClick }) {
  return (
    <button className="addToDoButton" onClick={onClick}>
      Add ToDo
    </button>
  );
}

export default AddToDoButton;
