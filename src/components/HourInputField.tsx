import { DayKey, Project } from "../data";

interface Props {
  project: Project;
  handleHourInput: (id: number, newHours: number, dayKey: DayKey) => void;
  dayKey: DayKey;
}

export const HourInput = (props: Props) => {
  const { project, handleHourInput, dayKey } = props;
  return (
    <td>
      <div>
        <button
          onClick={() => {
            handleHourInput(project.id, Number(project.time[0][dayKey]) - 1, dayKey);
          }}
        >
          -
        </button>
        <input
          type="number"
          placeholder="enter hours"
          value={project.time[0][dayKey] !== 0 ? project.time[0][dayKey] : ""}
          onChange={(e) => {
            handleHourInput(project.id, parseInt(e.target.value, 10), dayKey);
          }}
        />
        <button
          onClick={() => {
            handleHourInput(project.id, Number(project.time[0][dayKey]) + 1, dayKey);
          }}
        >
          +
        </button>
      </div>
    </td>
  );
};
