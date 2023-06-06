import { DayKey, Project } from "../data";

interface Props {
  project: Project;
  handleHourInput: (id: string, newHours: number, dayKey: DayKey) => void;
  dayKey: DayKey;
}

export const HourInput = (props: Props) => {
  const { project, handleHourInput, dayKey } = props;
  return (
    <td>
      <div>
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
        <input
          type="number"
          step="0.5"
          placeholder="enter hours"
          value={project.time[0][dayKey] !== 0 ? project.time[0][dayKey] : ""}
          onChange={(e) => {
            handleHourInput(project.id, parseFloat(e.target.value), dayKey);
          }}
        />
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
    </td>
  );
};
