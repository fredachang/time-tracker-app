import { Table } from "./components/Table";
import { Form } from "./components/Form";
import { DayKey, initialProjects, weekDefault } from "./data";
import { Project } from "./data";
import { PieChart } from "./components/PieChart";
import { useLocalStorage } from "react-use";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";
import { Header } from "./components/Header";
import { ClickButton } from "./components/ClickButton";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import RandomBoxAnimation from "./components/RandomBoxAnimation";

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

  const [theme, setTheme] = useState<string>("light");

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const projectsDeault = projects ?? initialProjects;
  const projectNameDefault = projectName ?? "";
  const targetHoursDefault = targetHours ?? 0;
  const deletedProjectsDefault = deletedProjects ?? [];

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

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

    const selected = theme === "light" ? light : dark;

    const pieChartData = {
      labels: [],
      datasets: [
        {
          label: "number of hours",
          data: [
            calculateTotalHours(project),
            calculateRemainingHours(project),
          ],
          backgroundColor: selected.backgroundColor,
          borderColor: selected.borderColor,
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
    if (sliderValue === "1") {
      setTheme("dark");
    } else {
      setTheme("light");
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
      <LineIntersection mousePosition={mousePosition} theme={theme} />

      <section id="dot-animation">
        <div className="fixed top-0 left-0 z-10">
          <RandomBoxAnimation
            width={window.innerWidth}
            height="7"
            className="fixed top-0 px-7"
          />
        </div>

        <div className="fixed bottom-0 left-0 z-10 h-full min-w-20">
          <RandomBoxAnimation
            width={window.innerWidth}
            height="7"
            className="fixed bottom-0 px-8"
          />
        </div>
      </section>

      <section
        id="header"
        className="bg-green z-0 text-black dark:bg-black dark:text-green flex flex-col w-5% h-full py-5 justify-between items-center fixed"
      >
        <Header theme={theme} handleThemeChange={handleThemeChange} />
      </section>

      <main
        onMouseMove={handleMouseMove}
        className="bg-green z-0 text-black dark:bg-black dark:text-green flex flex-col justify-between fixed top-0 right-0 w-95% h-full py-5 pl-5 z-0"
      >
        <section
          id="new-project-form"
          className="w-full flex justify-between border-b border-l border-black dark:border-green z-0"
        >
          <Form
            createNewProject={createNewProject}
            handleNewProjectName={handleNewProjectName}
            projectName={projectNameDefault}
            handleNewTargetHours={handleNewTargetHours}
            targetHours={targetHoursDefault}
            theme={theme}
          />

          <div
            id="extra-buttons"
            className="flex justify-center items-center mr-5"
          >
            <span>
              {deleted && (
                <div>
                  <ClickButton
                    text="UNDO LAST DELETE"
                    title="undo last delete"
                    type="button"
                    viewBox="-5 -5 60 60"
                    svgPath="m41.93,25c0,9.35-7.58,16.93-16.93,16.93s-16.93-7.58-16.93-16.93S15.65,8.07,25,8.07s16.93,7.58,16.93,16.93Zm-16.93-8.5c-4.69,0-8.5,3.8-8.5,8.5s3.8,8.5,8.5,8.5,8.5-3.8,8.5-8.5-3.8-8.5-8.5-8.5Z"
                    theme={theme}
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
                theme={theme}
                onClick={() => clearAllHours}
              />
            </span>
          </div>
        </section>

        <section id="pie-chart" className="flex w-full">
          <ScrollingCarousel>
            {projectsDeault.map((project) => {
              const data = makePieChartData(project);
              return (
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
                        <p className="p-1">
                          Current - {calculateTotalHours(project)}{" "}
                        </p>
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
                      className="flex relative justify-center items-center p-5 mx-5"
                    >
                      <div id="total-hours" className="flex absolute ">
                        <h1>{calculateTotalHours(project)}</h1>
                        <span>H</span>
                      </div>

                      <PieChart data={data} theme={theme} />
                    </div>

                    <div id="project-title-container" className="pl-2 pb-1">
                      <h3>{project.title}</h3>
                    </div>
                  </div>
                </Tilt>
              );
            })}
          </ScrollingCarousel>
        </section>

        <section
          id="table-container"
          className="w-full border-l border-b border-black dark:border-green px-2 "
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
            theme={theme}
          />
        </section>
      </main>
    </>
  );
}

export default App;
