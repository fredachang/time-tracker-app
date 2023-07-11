import { useEffect, useState } from "react";
import { DayKey, Project } from "../data";
import { format } from "date-fns";
import { useCountdownTimer } from "use-countdown-timer";

interface Props {
  project: Project;
  handleHourInput: (id: string, newHours: number, dayKey: DayKey) => void;
  dayKey: DayKey;
  theme: string;
}

const pomodoroSlot = 60 * 30;

const alertSound = new Audio("alert.wav");

const formatCount = (MiliSeconds: number) => {
  const formatted = format(MiliSeconds, "mm:ss");
  return formatted;
};

export const HourInput = (props: Props) => {
  const { project, handleHourInput, dayKey } = props;
  const [playAlert, setPlayAlert] = useState(false);
  const [showTimer, setShowTimer] = useState<boolean>(false);
  const [showStartButton, setShowStartButton] = useState<boolean>(false);

  const { countdown, start, reset, pause, isRunning } = useCountdownTimer({
    timer: 1000 * pomodoroSlot,
    interval: 1000,
  });

  const startTimer = () => {
    start();
    setShowTimer(true);
  };

  const pauseTimer = () => {
    pause();
    setShowStartButton(true);
    setShowTimer(true);
  };

  const resetTimer = () => {
    reset();
    setShowStartButton(true);
    setShowTimer(true);
  };

  useEffect(() => {
    if (countdown === 0) {
      setShowTimer(false);
      setPlayAlert(true);
      handleHourInput(
        project.id,
        Number(project.time[0][dayKey]) + 0.5,
        dayKey
      );
    }
  }, [countdown]);

  useEffect(() => {
    if (isRunning) {
      const formattedCount = formatCount(countdown);
      document.title = `${formattedCount}`;
    }
  }, [countdown, isRunning]);

  useEffect(() => {
    if (playAlert) {
      alertSound.play();
      setPlayAlert(false);
    }
  }, [playAlert]);

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
            <button onClick={startTimer}>Start</button>
          </div>
        </div>

        {showTimer && (
          <div
            id="count-display"
            className="bg-green dark:bg-black border border-black dark:bg-green dark:text-black flex flex-col fixed top-0 right-0 justify-center items-center"
          >
            <p className="text-9xl">{formatCount(countdown)}</p>
            <div className="flex w-full justify-between">
              {showStartButton && <button onClick={startTimer}>Start</button>}
              <button onClick={pauseTimer}>Pause</button>
              <button onClick={resetTimer}>Reset</button>
            </div>
          </div>
        )}
      </td>
    </>
  );
};
