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
        <div className="time-marks" key={i}>
          {divider}
        </div>
      );
    }

    return dividers;
  };

  return (
    <td>
      <div className="td-container">
        <div className="hour-input-field-container">
          <button
            className="index-button"
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
          {renderDividers(project.time[0][dayKey])}
          <button
            className="index-button"
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
