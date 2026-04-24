import "./ChangeThemeButton.css";

function ChangeThemeButton({ onClick }) {
  return (
    <button className="ChangeThemeButton" onClick={onClick}>
      Change Theme
    </button>
  );
}

export default ChangeThemeButton;
