import { useEffect, useState } from "react";
import { DayKey, Project } from "../data";
import { differenceInSeconds, format, intervalToDuration } from "date-fns";

interface Props {
  project: Project;
  handleHourInput: (id: string, newHours: number, dayKey: DayKey) => void;
  dayKey: DayKey;
}

const setSeconds = 30 * 60;

export const HourInput = (props: Props) => {
  const { project, handleHourInput, dayKey } = props;
  const [count, setCount] = useState(setSeconds);
  const [isPaused, setIsPaused] = useState(true);

  const formatCount = (timeInSeconds: number) => {
    const formatted = format(timeInSeconds * 1000, "mm:ss");
    return formatted;
  };

  useEffect(() => {
    let timerId;

    if (!isPaused) {
      timerId = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);
    }

    if (count === 0) {
      clearInterval(timerId);
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

  const handleStart = () => {
    if (count === 0) {
      setCount(5);
    }
    setIsPaused(false);
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
          <p className="mx-5">{formatCount(count)}</p>
          {count === setSeconds || count === 0 || isPaused ? (
            <button onClick={handleStart}>Start</button>
          ) : (
            <button onClick={handlePause}>Pause</button>
          )}
        </div>
      </div>
    </td>
  );
};
