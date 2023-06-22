import Tilt from "react-parallax-tilt";
import { Project } from "../data";
import { PieChart } from "./PieChart";
import { ClickButton } from "./ClickButton";

interface Props {
  project: Project;
  calculateTotalHours: (project: Project) => number;
  pieChartData: {
    labels: never[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderColor: string[];
      borderWidth: number;
    }[];
  };
  theme: string;
  updateProjectName: (id: string, newName: string) => void;
  deleteProject: (id: string) => void;
  clearProjectHours: (id: string) => void;
}

const inputStyleLight =
  "bg-green rounded w-full hover:bg-greenLight focus:bg-greenLight";

const inputStyleDark =
  "bg-black rounded w-full hover:bg-zinc-900 focus:bg-zinc-900";

export function ProjectTile(props: Props) {
  const {
    project,
    calculateTotalHours,
    pieChartData,
    theme,
    updateProjectName,
    deleteProject,
    clearProjectHours,
  } = props;

  return (
    <>
      <Tilt key={project.id}>
        <div
          id="project-tile"
          className="my-10 mr-10 border-l border-b border-black dark:border-green "
        >
          <div id="stats-container" className="flex justify-end">
            <div
              id="tile-current"
              className="mr-2 bg-black text-green dark:bg-green dark:text-black"
            >
              <p className="p-1">Current - {calculateTotalHours(project)} </p>
            </div>

            <div
              id="tile-target"
              className="border-black border dark:border-green"
            >
              <p className="p-1">Target - {project.targetHours}</p>
            </div>
          </div>

          <div
            id="donut-container"
            className="flex relative justify-center items-center py-10 my-4"
          >
            <div id="total-hours" className="flex absolute ">
              <h1>{calculateTotalHours(project)}</h1>
              <span>
                <p>H</p>
              </span>
            </div>
            <PieChart data={pieChartData} />
          </div>

          <div
            id="project-title-container"
            className="flex justify-between pl-2 pb-1"
          >
            <div className="project-tile-title">
              <input
                type="text"
                value={project.title}
                onChange={(e) => {
                  updateProjectName(project.id, e.target.value);
                }}
                className={theme === "light" ? inputStyleLight : inputStyleDark}
              ></input>
            </div>

            <div>
              <div className="flex justify-end">
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
            </div>
          </div>
        </div>
      </Tilt>
    </>
  );
}
