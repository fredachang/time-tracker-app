interface Props {
  lightTheme: boolean;
  handleThemeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Header(props: Props) {
  const { lightTheme, handleThemeChange } = props;
  return (
    <>
      <div className="header-line"></div>
      <div className="left-section-container-right">
        <h1 className="logo-text">TimeTracker</h1>

        <div className="slider-container">
          <input
            type="range"
            min="0"
            max="1"
            step="1"
            className="slider"
            value={lightTheme ? "0" : "1"}
            onChange={handleThemeChange}
          />
          <span>
            <p>{lightTheme ? "Light" : "Dark"}</p>
          </span>
        </div>

        {/* <div className="theme-buttons-container">
          <button
            className={lightTheme ? "light-button-light" : "light-button-dark"}
            onClick={handleLightThemeClick}
          >
            Light
          </button>
          <button
            className={lightTheme ? "dark-button-light" : "dark-button-dark"}
            onClick={handleDarkThemeClick}
          >
            Dark
          </button>
        </div> */}
      </div>
    </>
  );
}
