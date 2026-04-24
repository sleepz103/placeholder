import "./ChangeThemeButton.css";

function ChangeThemeButton({ onClick }) {
  return (
    <button className="ChangeThemeButton" onClick={onClick}>
      Change theme
    </button>
  );
}

export default ChangeThemeButton;
