import "./ChangeThemeButton.css";

function ChangeThemeButton({ onClick, currentTheme }) {
  const nextThemeLabel = currentTheme === "dark" ? "Light" : "Dark";

  return (
    <button className="ChangeThemeButton" onClick={onClick}>
      {nextThemeLabel} Theme
    </button>
  );
}

export default ChangeThemeButton;
