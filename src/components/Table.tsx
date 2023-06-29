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
  theme: string;
}

const indexButtonStyle =
  "flex justify-center items-center w-5 h-5 bg-transparent border-0 outline-0 text-base";

const tableRowDividerStyle = "bg-black dark:bg-green w-full flex absolute h-px";

const inputStyleLight =
  "bg-green rounded w-2/5 hover:bg-greenLight focus:bg-greenLight";
const inputStyleDark =
  "bg-black rounded w-2/5 hover:bg-zinc-900 focus:bg-zinc-900";

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
    theme,
  } = props;

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
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Projects</th>
            {projects.map((project, index) => (
              <th key={project.id}>
                <div className="flex justify-center items-center">
                  {index > 0 ? (
                    <button
                      className={indexButtonStyle}
                      onClick={() => moveColumnToLeft(projects, project.id)}
                    >
                      &#8592;
                    </button>
                  ) : (
                    <div className="empty-button"></div>
                  )}

                  <input
                    type="text"
                    value={project.title}
                    className={
                      theme === "light" ? inputStyleLight : inputStyleDark
                    }
                    onChange={(e) => {
                      updateProjectName(project.id, e.target.value);
                    }}
                  />

                  {index < projects.length - 1 ? (
                    <button
                      className={indexButtonStyle}
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

        <div className={tableRowDividerStyle}></div>

        <tbody>
          <tr>
            <td className="text-left">TARGET HOURS</td>
            {projects.map((project) => (
              <td key={project.id}>
                <div className="flex justify-center">
                  <div className="flex justify-between w-1/2">
                    <button
                      className={indexButtonStyle}
                      onClick={() => {
                        updateTargetHours(
                          project.id,
                          project.targetHours - 0.5
                        );
                      }}
                    >
                      -
                    </button>

                    <div className="w-full flex justify-start">
                      {renderDividers(project.targetHours)}
                      <p>({project.targetHours})</p>
                    </div>

                    <button
                      className={indexButtonStyle}
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

          <div className={tableRowDividerStyle}></div>

          <tr>
            <td className="text-left">MON</td>
            {projects.map((project) => (
              <HourInput
                theme={theme}
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
            <td className="text-left">TUE</td>
            {projects.map((project) => (
              <HourInput
                theme={theme}
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
            <td className="text-left">WED</td>
            {projects.map((project) => (
              <HourInput
                theme={theme}
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
            <td className="text-left">THU</td>
            {projects.map((project) => (
              <HourInput
                theme={theme}
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
            <td className="text-left">FRI</td>
            {projects.map((project) => (
              <HourInput
                theme={theme}
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
            <td className="text-left">SAT</td>
            {projects.map((project) => (
              <HourInput
                theme={theme}
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
            <td className="text-left">SUN</td>
            {projects.map((project) => (
              <HourInput
                theme={theme}
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

        <div className={tableRowDividerStyle}></div>

        <tfoot>
          <tr>
            <td className="text-left">TARGET HOURS</td>
            {projects.map((project) => (
              <td key={project.id}>{project.targetHours}</td>
            ))}
          </tr>

          <tr>
            <td className="text-left">TOTAL HOURS</td>
            {projects.map((project) => (
              <td key={project.id}>{calculateTotalHours(project)}</td>
            ))}
          </tr>

          <tr>
            <td className="text-left">REMAINING HOURS</td>
            {projects.map((project) => (
              <td key={project.id}>
                {Math.max(calculateRemainingHours(project), 0) || "All Done!"}
              </td>
            ))}
          </tr>

          <tr>
            <td className="text-left"></td>
            {projects.map((project) => (
              <td key={project.id}>
                <div className="flex justify-center flex-wrap ">
                  <ClickButton
                    text="DELETE"
                    title="delete project"
                    type="button"
                    viewBox="-5 -5 60 60"
                    svgPath="m41.93,25c0,9.35-7.58,16.93-16.93,16.93s-16.93-7.58-16.93-16.93S15.65,8.07,25,8.07s16.93,7.58,16.93,16.93Zm-16.93-8.5c-4.69,0-8.5,3.8-8.5,8.5s3.8,8.5,8.5,8.5,8.5-3.8,8.5-8.5-3.8-8.5-8.5-8.5ZM8.05,8.05l33.9,33.9m0-33.9L8.05,41.95"
                    theme={theme}
                    onClick={() => deleteProject(project.id)}
                  />
                  <ClickButton
                    text="CLEAR"
                    title="clear project hours"
                    type="button"
                    viewBox="-5 -5 60 60"
                    svgPath="m41.93,25c0,9.35-7.58,16.93-16.93,16.93s-16.93-7.58-16.93-16.93S15.65,8.07,25,8.07s16.93,7.58,16.93,16.93Zm-16.93-8.5c-4.69,0-8.5,3.8-8.5,8.5s3.8,8.5,8.5,8.5,8.5-3.8,8.5-8.5-3.8-8.5-8.5-8.5Z"
                    theme={theme}
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
