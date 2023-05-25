import { useState } from "react";
import { Table } from "./components/Table";
import { Form } from "./components/Form";
import { DayKey, initialProjects, weekDefault } from "./data";
import { Project } from "./data";
import { PieChart } from "./components/PieChart";

function App() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  const [projectName, setProjectName] = useState<string>("");

  const [targetHours, setTargetHours] = useState<number>(0);

  const handleNewProjectName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value);
  };

  const handleNewTargetHours = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTargetHours(parseInt(e.target.value));
  };

  const createNewProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newProject: Project = {
      id: projects.length + 1,
      title: projectName,
      targetHours: targetHours,
      time: [weekDefault],
    };
    setProjects((prevProjects) => [...prevProjects, newProject]);
    setProjectName("");
    setTargetHours(0);
  };

  const updateProjectName = (id: number, newName: string) => {
    setProjects((prevProjects) => {
      const updatedProjects = prevProjects.map((project) => {
        if (project.id === id) {
          return {
            ...project,
            title: newName,
          };
        }
        return project;
      });
      return updatedProjects;
    });
  };

  const updateTargetHours = (id: number, newTarget: number) => {
    setProjects((prevProjects) => {
      const updatedProjects = prevProjects.map((project) => {
        if (project.id === id) {
          return {
            ...project,
            targetHours: newTarget,
          };
        }
        return project;
      });
      return updatedProjects;
    });
  };

  const handleHourInput = (id: number, newHours: number, dayKey: DayKey) => {
    if (isNaN(newHours)) {
      newHours = 0;
    }
    setProjects((prevProjects) => {
      const updatedProjects = prevProjects.map((project) => {
        if (project.id === id) {
          return {
            ...project,
            time: [
              {
                ...project.time[0],
                [dayKey]: newHours,
              },
            ],
          };
        }
        return project;
      });
      return updatedProjects;
    });
  };

  function calculateTotalHours(project: Project) {
    const time = project.time[0];

    const totalHours = Object.values(time).reduce((total: number, hour: number | "") => {
      return total + (hour !== "" ? hour : 0);
    }, 0);
    return totalHours;
  }

  function calculateRemainingHours(project: Project) {
    const remainingHours = project.targetHours - calculateTotalHours(project);
    return Math.max(0, remainingHours);
  }
  const deleteProject = (id: number) => {
    setProjects((prevProjects) => prevProjects.filter((project) => project.id !== id));
  };

  const clearAllHours = () => {
    setProjects((prevProjects) => {
      const clearedProjects = prevProjects.map((project) => ({
        ...project,
        time: [weekDefault],
      }));
      return clearedProjects;
    });
  };

  const clearProjectHours = (id: number) => {
    setProjects((prevProjects) => {
      const updatedProjects = prevProjects.map((project) => {
        if (project.id === id) {
          return {
            ...project,
            time: [weekDefault],
          };
        }
        return project;
      });
      return updatedProjects;
    });
  };

  const makePieChartData = (project: Project) => {
    const pieChartData = {
      labels: ["Total", "Remaining"],
      datasets: [
        {
          label: "number of hours",
          data: [calculateTotalHours(project), calculateRemainingHours(project)],
          backgroundColor: ["black", "white"],
          borderColor: ["black", "black"],
          borderWidth: 0.5,
        },
      ],
    };
    return pieChartData;
  };

  return (
    <>
      <Form
        createNewProject={createNewProject}
        handleNewProjectName={handleNewProjectName}
        projectName={projectName}
        handleNewTargetHours={handleNewTargetHours}
        targetHours={targetHours}
      />

      <div>
        <button onClick={clearAllHours}>Clear All Hours</button>
      </div>

      <div className="section-pie-chart">
        {projects.map((project) => {
          const data = makePieChartData(project);
          return (
            <div key={project.id}>
              <p>{project.title}</p>
              <PieChart data={data} />
            </div>
          );
        })}
      </div>

      <Table
        projects={projects}
        updateProjectName={updateProjectName}
        updateTargetHours={updateTargetHours}
        handleHourInput={handleHourInput}
        calculateTotalHours={calculateTotalHours}
        calculateRemainingHours={calculateRemainingHours}
        deleteProject={deleteProject}
        clearProjectHours={clearProjectHours}
      />
    </>
  );
}

export default App;
