import { DayKey } from "../data";
import { Project } from "../data";
import { ClickButton } from "./ClickButton";
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
  lightTheme: boolean;
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
    lightTheme,
  } = props;

  const renderDividers = (hours: number) => {
    const numDividers = hours / 0.5;
    const dividers = [];

    for (let i = 0; i < numDividers; i++) {
      dividers.push(
        <div className="time-marks" key={i}>
          |
        </div>
      );
    }

    return dividers;
  };

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

        <div
          className={
            lightTheme ? "table-row-divider-light" : "table-row-divider-dark"
          }
        ></div>

        <tbody>
          <tr>
            <td className="column-1">TARGET HOURS</td>
            {projects.map((project) => (
              <td key={project.id}>
                <div className="td-container">
                  <div className="target-hour-input-field">
                    <button
                      className="index-button"
                      onClick={() => {
                        updateTargetHours(
                          project.id,
                          project.targetHours - 0.5
                        );
                      }}
                    >
                      -
                    </button>

                    {renderDividers(project.targetHours)}

                    {/* <input
                    type="number"
                    value={project.targetHours}
                    onChange={(e) => {
                      updateTargetHours(
                        project.id,
                        parseInt(e.target.value, 10)
                      );
                    }}
                  /> */}
                    <button
                      className="index-button"
                      onClick={() => {
                        updateTargetHours(
                          project.id,
                          project.targetHours + 0.5
                        );
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </td>
            ))}
          </tr>

          <div
            className={
              lightTheme ? "table-row-divider-light" : "table-row-divider-dark"
            }
          ></div>

          <tr>
            <td className="column-1">MON</td>
            {projects.map((project) => (
              <HourInput
                key={project.id}
                project={project}
                handleHourInput={(id, newHours, dayKey) =>
                  handleHourInput(id, newHours, dayKey)
                }
                dayKey="Monday"
              />
            ))}
          </tr>

          <tr>
            <td className="column-1">TUE</td>
            {projects.map((project) => (
              <HourInput
                key={project.id}
                project={project}
                handleHourInput={(id, newHours, dayKey) =>
                  handleHourInput(id, newHours, dayKey)
                }
                dayKey="Tuesday"
              />
            ))}
          </tr>

          <tr>
            <td className="column-1">WED</td>
            {projects.map((project) => (
              <HourInput
                key={project.id}
                project={project}
                handleHourInput={(id, newHours, dayKey) =>
                  handleHourInput(id, newHours, dayKey)
                }
                dayKey="Wednesday"
              />
            ))}
          </tr>

          <tr>
            <td className="column-1">THU</td>
            {projects.map((project) => (
              <HourInput
                key={project.id}
                project={project}
                handleHourInput={(id, newHours, dayKey) =>
                  handleHourInput(id, newHours, dayKey)
                }
                dayKey="Thursday"
              />
            ))}
          </tr>

          <tr>
            <td className="column-1">FRI</td>
            {projects.map((project) => (
              <HourInput
                key={project.id}
                project={project}
                handleHourInput={(id, newHours, dayKey) =>
                  handleHourInput(id, newHours, dayKey)
                }
                dayKey="Friday"
              />
            ))}
          </tr>

          <tr>
            <td className="column-1">SAT</td>
            {projects.map((project) => (
              <HourInput
                key={project.id}
                project={project}
                handleHourInput={(id, newHours, dayKey) =>
                  handleHourInput(id, newHours, dayKey)
                }
                dayKey="Saturday"
              />
            ))}
          </tr>

          <tr>
            <td className="column-1">SUN</td>
            {projects.map((project) => (
              <HourInput
                key={project.id}
                project={project}
                handleHourInput={(id, newHours, dayKey) =>
                  handleHourInput(id, newHours, dayKey)
                }
                dayKey="Sunday"
              />
            ))}
          </tr>
        </tbody>

        <div
          className={
            lightTheme ? "table-row-divider-light" : "table-row-divider-dark"
          }
        ></div>

        <tfoot>
          <tr>
            <td className="column-1">TARGET HOURS</td>
            {projects.map((project) => (
              <td key={project.id}>{project.targetHours}</td>
            ))}
          </tr>

          <tr>
            <td className="column-1">TOTAL HOURS</td>
            {projects.map((project) => (
              <td key={project.id}>{calculateTotalHours(project)}</td>
            ))}
          </tr>

          <tr>
            <td className="column-1">REMAINING HOURS</td>
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
                  <ClickButton
                    text="DELETE"
                    title="delete project"
                    type="button"
                    viewBox="-5 -5 60 60"
                    svgPath="m41.93,25c0,9.35-7.58,16.93-16.93,16.93s-16.93-7.58-16.93-16.93S15.65,8.07,25,8.07s16.93,7.58,16.93,16.93Zm-16.93-8.5c-4.69,0-8.5,3.8-8.5,8.5s3.8,8.5,8.5,8.5,8.5-3.8,8.5-8.5-3.8-8.5-8.5-8.5ZM8.05,8.05l33.9,33.9m0-33.9L8.05,41.95"
                    lightTheme={lightTheme}
                    onClick={() => deleteProject(project.id)}
                  />
                  <ClickButton
                    text="CLEAR"
                    title="clear project hours"
                    type="button"
                    viewBox="-5 -5 60 60"
                    svgPath="m41.93,25c0,9.35-7.58,16.93-16.93,16.93s-16.93-7.58-16.93-16.93S15.65,8.07,25,8.07s16.93,7.58,16.93,16.93Zm-16.93-8.5c-4.69,0-8.5,3.8-8.5,8.5s3.8,8.5,8.5,8.5,8.5-3.8,8.5-8.5-3.8-8.5-8.5-8.5Z"
                    lightTheme={lightTheme}
                    onClick={() => clearProjectHours(project.id)}
                  />
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
