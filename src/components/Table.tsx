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
            <th className="column-1">Day</th>
            {projects.map((project, index) => (
              <th key={project.id}>
                <div className="project-title-field-container">
                  {index > 0 ? (
                    <button
                      className="index-button"
                      onClick={() => moveColumnToLeft(projects, project.id)}
                    >
                      &#8592;
                    </button>
                  ) : (
                    <div className="empty-button"></div>
                  )}
                  <input
                    className="project-title"
                    type="text"
                    value={project.title}
                    onChange={(e) => {
                      updateProjectName(project.id, e.target.value);
                    }}
                  />
                  {index < projects.length - 1 ? (
                    <button
                      className="index-button"
                      onClick={() => moveColumnToRight(projects, project.id)}
                    >
                      &#8594;
                    </button>
                  ) : (
                    <div className="empty-button"></div>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className="column-1">Target Hours</td>
            {projects.map((project) => (
              <td key={project.id}>
                <div>
                  <button
                    className="index-button"
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
                    className="index-button"
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
            <td className="column-1">Monday</td>
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
            <td className="column-1">Tuesday</td>
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
            <td className="column-1">Wednesday</td>
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
            <td className="column-1">Thursday</td>
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
            <td className="column-1">Friday</td>
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
            <td className="column-1">Saturday</td>
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
            <td className="column-1">Sunday</td>
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
            <td className="column-1">Total</td>
            {projects.map((project) => (
              <td key={project.id}>{calculateTotalHours(project)}</td>
            ))}
          </tr>

          <tr>
            <td className="column-1">Remaining</td>
            {projects.map((project) => (
              <td key={project.id}>
                {Math.max(calculateRemainingHours(project), 0) || "All Done!"}
              </td>
            ))}
          </tr>

          <tr>
            <td className="column-1"></td>
            {projects.map((project) => (
              <td key={project.id}>
                <div className="actions-button-container">
                  <button onClick={() => clearProjectHours(project.id)}>Clear</button>
                  <button onClick={() => deleteProject(project.id)}>Delete</button>
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
