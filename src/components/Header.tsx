interface Props {
  theme: string;
  handleThemeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Header(props: Props) {
  const { theme, handleThemeChange } = props;
  return (
    <>
      <h1 className="logo-text">TimeTracker</h1>

      <div id="theme-slider" className="flex flex-col items-center">
        <input
          type="range"
          min="0"
          max="1"
          step="1"
          className="slider"
          value={theme === "light" ? "0" : "1"}
          onChange={handleThemeChange}
        />
        <span>
          <p>{theme === "light" ? "Light" : "Dark"}</p>
        </span>
      </div>
    </>
  );
}
