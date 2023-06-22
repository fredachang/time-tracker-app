import { DayKey, Project } from "../data";

interface Props {
  project: Project;
  handleHourInput: (id: string, newHours: number, dayKey: DayKey) => void;
  dayKey: DayKey;
}

export const HourInput = (props: Props) => {
  const { project, handleHourInput, dayKey } = props;

  // const renderDividers = (hours: number) => {
  //   const numDividers = hours / 0.5;
  //   const dividers = [];

  //   for (let i = 0; i < numDividers; i++) {
  //     dividers.push(
  //       <div className="time-marks" key={i}>
  //         |
  //       </div>
  //     );
  //   }

  //   return dividers;
  // };

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
      </div>
    </td>
  );
};
