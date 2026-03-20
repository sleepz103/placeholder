import "./changeThemeButton.css";

function changeThemeButton({ onClick }) {
  return (
    <button className="changeThemeButton" onClick={onClick}>
      Change Theme
    </button>
  );
}

export default changeThemeButton;
