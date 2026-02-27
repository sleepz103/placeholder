import { useState } from "react";
import "./App.css";
import AddToDoForm from "./components/addToDoForm";
import AddToDoButton from "./components/addToDoButton";

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
    </>
  );
}

export default App;
