import { DayKey } from "../data";
import { Project } from "../data";
import { HourInput } from "./HourInputField";

interface Props {
  projects: Project[];
  updateProjectName: (id: string, newName: string) => void;
  updateTargetHours: (id: string, newTarget: number) => void;
  handleHourInput: (id: string, newHours: number, dayKey: DayKey) => void;
  calculateTotalHours: (project: Project) => number;
  calculateRemainingHours: (project: Project) => number;
  deleteProject: (id: string) => void;
  clearProjectHours: (id: string) => void;
  moveColumnToLeft: (project: Project[], id: string) => void;
  moveColumnToRight: (project: Project[], id: string) => void;
}
export function Table(props: Props) {
  const {
    projects,
    updateProjectName,
    updateTargetHours,
    handleHourInput,
    calculateTotalHours,
    calculateRemainingHours,
    deleteProject,
    clearProjectHours,
    moveColumnToLeft,
    moveColumnToRight,
  } = props;

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Day</th>
            {projects.map((project) => (
              <th key={project.id}>
                <input
                  type="text"
                  value={project.title}
                  onChange={(e) => {
                    updateProjectName(project.id, e.target.value);
                  }}
                />
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Target Hours</td>
            {projects.map((project) => (
              <td key={project.id}>
                <div>
                  <button
                    onClick={() => {
                      updateTargetHours(project.id, project.targetHours - 1);
                    }}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={project.targetHours}
                    onChange={(e) => {
                      updateTargetHours(project.id, parseInt(e.target.value, 10));
                    }}
                  />
                  <button
                    onClick={() => {
                      updateTargetHours(project.id, project.targetHours + 1);
                    }}
                  >
                    +
                  </button>
                </div>
              </td>
            ))}
          </tr>

          <tr>
            <td>Monday</td>
            {projects.map((project) => (
              <HourInput
                key={project.id}
                project={project}
                handleHourInput={(id, newHours, dayKey) => handleHourInput(id, newHours, dayKey)}
                dayKey="Monday"
              />
            ))}
          </tr>

          <tr>
            <td>Tuesday</td>
            {projects.map((project) => (
              <HourInput
                key={project.id}
                project={project}
                handleHourInput={(id, newHours, dayKey) => handleHourInput(id, newHours, dayKey)}
                dayKey="Tuesday"
              />
            ))}
          </tr>

          <tr>
            <td>Wednesday</td>
            {projects.map((project) => (
              <HourInput
                key={project.id}
                project={project}
                handleHourInput={(id, newHours, dayKey) => handleHourInput(id, newHours, dayKey)}
                dayKey="Wednesday"
              />
            ))}
          </tr>

          <tr>
            <td>Thursday</td>
            {projects.map((project) => (
              <HourInput
                key={project.id}
                project={project}
                handleHourInput={(id, newHours, dayKey) => handleHourInput(id, newHours, dayKey)}
                dayKey="Thursday"
              />
            ))}
          </tr>

          <tr>
            <td>Friday</td>
            {projects.map((project) => (
              <HourInput
                key={project.id}
                project={project}
                handleHourInput={(id, newHours, dayKey) => handleHourInput(id, newHours, dayKey)}
                dayKey="Friday"
              />
            ))}
          </tr>

          <tr>
            <td>Saturday</td>
            {projects.map((project) => (
              <HourInput
                key={project.id}
                project={project}
                handleHourInput={(id, newHours, dayKey) => handleHourInput(id, newHours, dayKey)}
                dayKey="Saturday"
              />
            ))}
          </tr>

          <tr>
            <td>Sunday</td>
            {projects.map((project) => (
              <HourInput
                key={project.id}
                project={project}
                handleHourInput={(id, newHours, dayKey) => handleHourInput(id, newHours, dayKey)}
                dayKey="Sunday"
              />
            ))}
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            {projects.map((project) => (
              <td key={project.id}>{calculateTotalHours(project)}</td>
            ))}
          </tr>

          <tr>
            <td>Remaining</td>
            {projects.map((project) => (
              <td key={project.id}>
                {Math.max(calculateRemainingHours(project), 0) || "All Done!"}
              </td>
            ))}
          </tr>

          <tr>
            <td>Actions</td>
            {projects.map((project, index) => (
              <td key={project.id}>
                <button onClick={() => deleteProject(project.id)}>Delete</button>
                <button onClick={() => clearProjectHours(project.id)}>Clear Project Hours</button>
                <div>
                  {index > 0 && (
                    <button onClick={() => moveColumnToLeft(projects, project.id)}>
                      Move To Left
                    </button>
                  )}
                  {index < projects.length - 1 && (
                    <button onClick={() => moveColumnToRight(projects, project.id)}>
                      Move To Right
                    </button>
                  )}
                </div>
              </td>
            ))}
          </tr>
        </tfoot>
      </table>
      <div></div>
    </>
  );
}
