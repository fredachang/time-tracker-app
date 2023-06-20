import { Table } from "./components/Table";
import { Form } from "./components/Form";
import { DayKey, initialProjects, weekDefault } from "./data";
import { Project } from "./data";
import { PieChart } from "./components/PieChart";
import { useLocalStorage } from "react-use";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import Tilt from "react-parallax-tilt";
import { Header } from "./components/Header";
import { ClickButton } from "./components/ClickButton";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import RandomBoxAnimation from "./components/RandomBoxAnimation";
import { Circle } from "@react-three/drei";
import { MovingCircle } from "./components/MovingCircle";
import { LineIntersection } from "./components/LineIntersection";

function App() {
  const [projects, setProjects] = useLocalStorage<Project[]>(
    "projects",
    initialProjects
  );
  const [projectName, setProjectName] = useLocalStorage<string>(
    "projectName",
    ""
  );
  const [targetHours, setTargetHours] = useLocalStorage<number>(
    "targetHours",
    0
  );
  const [deletedProjects, setDeletedProjects] = useLocalStorage<Project[]>(
    "deletedProjects",
    []
  );
  const [deleted, setDeleted] = useState<boolean>(true);

  const [lightTheme, setLightTheme] = useState<boolean>(true);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const projectsDeault = projects ?? initialProjects;
  const projectNameDefault = projectName ?? "";
  const targetHoursDefault = targetHours ?? 0;
  const deletedProjectsDefault = deletedProjects ?? [];

  function calculateTotalHours(project: Project) {
    const time = project.time[0];

    const totalHours = Object.values(time).reduce(
      (total: number, hour: number | "") => {
        return total + (hour !== "" ? hour : 0);
      },
      0
    );
    return totalHours;
  }

  function calculateRemainingHours(project: Project) {
    const remainingHours = project.targetHours - calculateTotalHours(project);
    return Math.max(0, remainingHours);
  }

  const makePieChartData = (project: Project) => {
    const dark = {
      backgroundColor: ["rgba(0, 255, 0, 1)", "rgba(0, 0, 0, 1)"],
      borderColor: ["rgba(0, 255, 0, 1)", "rgba(0, 255, 0, 1)"],
    };

    const light = {
      backgroundColor: ["rgba(0, 0, 0, 1)", "rgba(0, 255, 0, 1)"],
      borderColor: ["rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)"],
    };

    const theme = lightTheme ? light : dark;

    const pieChartData = {
      labels: [],
      datasets: [
        {
          label: "number of hours",
          data: [
            calculateTotalHours(project),
            calculateRemainingHours(project),
          ],
          backgroundColor: theme.backgroundColor,
          borderColor: theme.borderColor,
          borderWidth: 1,
        },
      ],
    };

    return pieChartData;
  };

  const handleNewProjectName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value);
  };

  const handleNewTargetHours = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTargetHours(parseInt(e.target.value));
  };

  //when setting the state in the useLocalStorage hook you don't need to access the prevState

  const createNewProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newProject: Project = {
      id: uuidv4(),
      title: projectNameDefault,
      targetHours: targetHoursDefault,
      time: [weekDefault],
    };
    const updatedProjects = [...projectsDeault, newProject];
    setProjects(updatedProjects);
    setProjectName("");
    setTargetHours(0);
  };

  const updateProjectName = (id: string, newName: string) => {
    const updatedProjects = projectsDeault.map((project) => {
      if (project.id === id) {
        return {
          ...project,
          title: newName,
        };
      }
      return project;
    });
    setProjects(updatedProjects);
  };

  const updateTargetHours = (id: string, newTarget: number) => {
    const updatedProjects = projectsDeault.map((project) => {
      if (project.id === id) {
        return {
          ...project,
          targetHours: newTarget,
        };
      }
      return project;
    });
    setProjects(updatedProjects);
  };

  const handleHourInput = (id: string, newHours: number, dayKey: DayKey) => {
    const hours = newHours === 0 ? 0 : Math.round(newHours * 2) / 2;

    const updatedProjects = projectsDeault.map((project) => {
      if (project.id === id) {
        return {
          ...project,
          time: [
            {
              ...project.time[0],
              [dayKey]: hours,
            },
          ],
        };
      }
      return project;
    });

    setProjects(updatedProjects);
  };

  const deleteProject = (id: string) => {
    const projectToDelete = projectsDeault.find((project) => project.id === id);
    if (projectToDelete) {
      setDeletedProjects([...deletedProjectsDefault, projectToDelete]);
      setProjects(projectsDeault.filter((project) => project.id !== id));
      setDeleted(true);
    }
  };

  const undoDeleteProject = () => {
    const lastDeletedProject = deletedProjectsDefault.pop();
    if (lastDeletedProject) {
      setProjects([...projectsDeault, lastDeletedProject]);
      setDeletedProjects([...deletedProjectsDefault]);
      setDeleted(false);
    }
  };

  const clearAllHours = () => {
    const clearedProjects = projectsDeault.map((project) => ({
      ...project,
      time: [weekDefault],
    }));
    setProjects(clearedProjects);
  };

  const clearProjectHours = (id: string) => {
    const updatedProjects = projectsDeault.map((project) => {
      if (project.id === id) {
        return {
          ...project,
          time: [weekDefault],
        };
      }
      return project;
    });
    setProjects(updatedProjects);
  };

  const moveColumnToLeft = (projects: Project[], id: string) => {
    const objectIndex = projects.findIndex((obj) => obj.id === id);
    if (objectIndex > 0) {
      const objectToMove = projects.splice(objectIndex, 1)[0];
      projects.splice(objectIndex - 1, 0, objectToMove);
    }
    setProjects(projects);
  };

  const moveColumnToRight = (projects: Project[], id: string) => {
    const objectIndex = projects.findIndex((obj) => obj.id === id);
    if (objectIndex > -1 && objectIndex < projects.length - 1) {
      const objectToMove = projects.splice(objectIndex, 1)[0];
      projects.splice(objectIndex + 1, 0, objectToMove);
    }
    setProjects(projects);
  };

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const sliderValue = event.target.value;
    if (sliderValue === "0") {
      setLightTheme(true);
    } else {
      setLightTheme(false);
    }
  };

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const { clientX, clientY } = event;
    setMousePosition({ x: clientX, y: clientY });
  };

  return (
    <>
      {/* <div className="circle-container">
        <MovingCircle
          className="moving-circle-canvas"
          width={window.innerWidth}
          height={window.innerHeight}
        />
      </div> */}

      <LineIntersection mousePosition={mousePosition} />

      <div className="animation-container-top">
        <RandomBoxAnimation
          width={window.innerWidth}
          height="7"
          className="animation-canvas-top"
        />
      </div>

      <div className="animation-container-bottom">
        <RandomBoxAnimation
          width={window.innerWidth}
          height="7"
          className="animation-canvas-bottom"
        />
      </div>

      <div className="left-section-container">
        <Header lightTheme={lightTheme} handleThemeChange={handleThemeChange} />
      </div>

      <main className="right-section-container" onMouseMove={handleMouseMove}>
        <section className="right-section-inner">
          <section className="new-entries-section-container">
            <Form
              createNewProject={createNewProject}
              handleNewProjectName={handleNewProjectName}
              projectName={projectNameDefault}
              handleNewTargetHours={handleNewTargetHours}
              targetHours={targetHoursDefault}
              lightTheme={lightTheme}
            />

            <div className="utility-buttons">
              <span>
                {deleted && (
                  <div>
                    <ClickButton
                      text="UNDO LAST DELETE"
                      title="undo last delete"
                      type="button"
                      viewBox="-5 -5 60 60"
                      svgPath="m41.93,25c0,9.35-7.58,16.93-16.93,16.93s-16.93-7.58-16.93-16.93S15.65,8.07,25,8.07s16.93,7.58,16.93,16.93Zm-16.93-8.5c-4.69,0-8.5,3.8-8.5,8.5s3.8,8.5,8.5,8.5,8.5-3.8,8.5-8.5-3.8-8.5-8.5-8.5Z"
                      lightTheme={lightTheme}
                      onClick={() => undoDeleteProject}
                    />
                  </div>
                )}
              </span>

              <span>
                <ClickButton
                  text="CLEAR ALL"
                  title="clear project hours"
                  type="button"
                  viewBox="-5 -5 60 60"
                  svgPath="m41.93,25c0,9.35-7.58,16.93-16.93,16.93s-16.93-7.58-16.93-16.93S15.65,8.07,25,8.07s16.93,7.58,16.93,16.93Zm-16.93-8.5c-4.69,0-8.5,3.8-8.5,8.5s3.8,8.5,8.5,8.5,8.5-3.8,8.5-8.5-3.8-8.5-8.5-8.5Z"
                  lightTheme={lightTheme}
                  onClick={() => clearAllHours}
                />
              </span>
            </div>
          </section>

          <section className="section-pie-chart">
            <div className="section-pie-chart-inner">
              <div className="lined-gradient"></div>
              <div className="pie-chart-container">
                <ScrollingCarousel>
                  {projectsDeault.map((project) => {
                    const data = makePieChartData(project);
                    return (
                      <Tilt key={project.id}>
                        <div
                          className={
                            lightTheme
                              ? "pie-chart-tile-light"
                              : "pie-chart-tile-dark"
                          }
                        >
                          <div className="pie-chart-stats">
                            <div
                              className={
                                lightTheme
                                  ? "current-stat-light"
                                  : "current-stat-dark"
                              }
                            >
                              <p>Current - {calculateTotalHours(project)} </p>
                            </div>
                            <div
                              className={
                                lightTheme
                                  ? "target-stat-light"
                                  : "target-stat-dark"
                              }
                            >
                              <p>Target - {project.targetHours}</p>
                            </div>
                          </div>
                          <div className="pie-chart-with-number">
                            <div className="pie-chart-remaining-hours">
                              <h1>{calculateTotalHours(project)}</h1>
                              <span>H</span>
                            </div>
                            <PieChart data={data} />

                            <div
                              className={
                                lightTheme
                                  ? "pie-chart-divider-left-light"
                                  : "pie-chart-divider-left-dark"
                              }
                            ></div>

                            <div
                              className={
                                lightTheme
                                  ? "pie-chart-divider-right-light"
                                  : "pie-chart-divider-right-dark"
                              }
                            ></div>

                            <div
                              className={
                                lightTheme
                                  ? "pie-chart-divider-bottom-light"
                                  : "pie-chart-divider-bottom-dark"
                              }
                            ></div>
                          </div>

                          <div className="pie-chart-project-title">
                            <h3>{project.title}</h3>
                          </div>
                        </div>
                      </Tilt>
                    );
                  })}
                </ScrollingCarousel>
              </div>
            </div>
          </section>

          <section className="section-table">
            <div
              className={
                lightTheme ? "table-container-light" : "table-container-dark"
              }
            >
              <Table
                projects={projectsDeault}
                updateProjectName={updateProjectName}
                updateTargetHours={updateTargetHours}
                handleHourInput={handleHourInput}
                calculateTotalHours={calculateTotalHours}
                calculateRemainingHours={calculateRemainingHours}
                deleteProject={deleteProject}
                clearProjectHours={clearProjectHours}
                moveColumnToLeft={moveColumnToLeft}
                moveColumnToRight={moveColumnToRight}
                lightTheme={lightTheme}
              />
            </div>
          </section>
        </section>
      </main>
    </>
  );
}

export default App;
