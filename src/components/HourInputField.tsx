import { useEffect, useState } from "react";
import { DayKey, Project } from "../data";
import { format } from "date-fns";

interface Props {
  project: Project;
  handleHourInput: (id: string, newHours: number, dayKey: DayKey) => void;
  dayKey: DayKey;
  theme: string;
}

const minutesToSeconds = (minutes: number) => minutes * 60;

const pomodoroSlot = minutesToSeconds(30);

const alertSound = new Audio("alert.wav");

const formatCount = (timeInSeconds: number) => {
  const formatted = format(timeInSeconds * 1000, "mm:ss");
  return formatted;
};

export const HourInput = (props: Props) => {
  const { project, handleHourInput, dayKey } = props;
  const [count, setCount] = useState(pomodoroSlot);
  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [playAlert, setPlayAlert] = useState(false);

  useEffect(() => {
    let timerId: number | undefined = undefined;

    if (!isPaused) {
      timerId = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);
    }

    if (count === 0) {
      clearInterval(timerId);
      setPlayAlert(true);
      setIsStarted(false);
      handleHourInput(
        project.id,
        Number(project.time[0][dayKey]) + 0.5,
        dayKey
      );
    }

    return () => {
      clearInterval(timerId);
    };
  }, [count, isPaused]);

  useEffect(() => {
    if (isStarted) {
      const formattedCount = formatCount(count);
      document.title = `Working: ${formattedCount}`;
    }
  }, [count, isStarted]);

  useEffect(() => {
    if (playAlert) {
      alertSound.play();
      setPlayAlert(false);
    }
  }, [playAlert]);

  const handleStart = () => {
    if (count === 0) {
      setCount(5);
    }
    setIsPaused(false);
    setIsStarted(true);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const renderDividers = (hours: number) => {
    const numDividers = hours / 0.5;
    const dividers = [];

    for (let i = 0; i < numDividers; i++) {
      const divider = i % 2 === 0 ? "|" : ":"; // Alternate between "|" and ":"
      dividers.push(
        <div key={i} className="time-marks">
          {divider}
        </div>
      );
    }
    return dividers;
  };

  return (
    <>
      <td>
        <div className="flex justify-center">
          <div className="flex justify-between w-1/2">
            <button
              className="flex justify-center items-center w-5 h-5 bg-transparent border-0 outline-0 text-base"
              onClick={() => {
                handleHourInput(
                  project.id,
                  Number(project.time[0][dayKey]) - 0.5,
                  dayKey
                );
              }}
            >
              -
            </button>

            <div className="w-full flex justify-start">
              {renderDividers(project.time[0][dayKey])}
              <p>({project.time[0][dayKey]})</p>
            </div>

            <button
              className="flex justify-center items-center w-5 h-5 bg-transparent border-0 outline-0 text-base"
              onClick={() => {
                handleHourInput(
                  project.id,
                  Number(project.time[0][dayKey]) + 0.5,
                  dayKey
                );
              }}
            >
              +
            </button>
          </div>

          <div className="flex">
            {count === pomodoroSlot || count === 0 || isPaused ? (
              <button onClick={handleStart}>Start</button>
            ) : (
              <button onClick={handlePause}>Pause</button>
            )}
          </div>
        </div>

        {isStarted && (
          <div
            id="count-display"
            className="bg-green dark:bg-black border border-black dark:bg-green dark:text-black flex fixed top-0 right-0 justify-center items-center"
          >
            <p className="text-9xl">{formatCount(count)}</p>
            {count === pomodoroSlot || count === 0 || isPaused ? (
              <button onClick={handleStart}>Start</button>
            ) : (
              <button onClick={handlePause}>Pause</button>
            )}
          </div>
        )}
      </td>
    </>
  );
};
