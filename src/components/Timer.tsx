import { formatCount } from "../utils";

interface Props {
  countdown: number;
  showStartButton: boolean;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
}

const timerBgStyles =
  "bg-black text-green dark:bg-black border border-black dark:bg-green dark:text-black";

const desktopLayoutStyles = "sm:w-[400px] sm:h-[200px] sm:right-0 left-auto";

const mobileLayoutStyles =
  "flex flex-col fixed w-full h-full top-0 left-0 right-0 justify-center items-center";

const timerStyle = `${timerBgStyles} ${mobileLayoutStyles} ${desktopLayoutStyles}`;

const buttonStyles = "w-20 bg-green text-black dark:bg-black dark:text-green";

export const Timer = (props: Props) => {
  const { countdown, showStartButton, startTimer, pauseTimer, resetTimer } =
    props;
  return (
    <>
      <div id="count-display" className={timerStyle}>
        <p className="text-9xl">{formatCount(countdown)}</p>
        <div className="px-20 mt-5 sm:px-8 flex w-full justify-between">
          {showStartButton && (
            <button onClick={startTimer} className={buttonStyles}>
              Start
            </button>
          )}
          <button onClick={pauseTimer} className={buttonStyles}>
            Pause
          </button>
          <button onClick={resetTimer} className={buttonStyles}>
            Reset
          </button>
        </div>
      </div>
    </>
  );
};
