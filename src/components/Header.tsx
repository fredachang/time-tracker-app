import { format } from "date-fns";
import { useEffect, useState } from "react";

interface Props {
  theme: string;
  handleThemeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Header(props: Props) {
  const { theme, handleThemeChange } = props;
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formattedTime = format(currentTime, "HH:mm");

  return (
    <>
      <div className="bg-green z-0 text-black dark:bg-black dark:text-green flex flex-col w-5% h-full pb-5 justify-between items-center fixed">
        <h1 className="logo-text">T</h1>

        <div className="flex justify-center items-center w-60 -rotate-90">
          <h1>{formattedTime}</h1>
        </div>

        <div className="h-3/5 flex flex-col justify-end">
          <div className="mb-36 w-60 -rotate-90">
            <p>
              Developed By Freda, to track your time spent on projects so you
              can take more time off.
            </p>
          </div>

          <div id="theme-slider" className="w-full flex flex-col items-center">
            <input
              type="range"
              min="0"
              max="1"
              step="1"
              className={theme === "light" ? "slider-light" : "slider-dark"}
              value={theme === "light" ? "0" : "1"}
              onChange={handleThemeChange}
            />
            <span>
              <p>{theme === "light" ? "Light" : "Dark"}</p>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
