import { Table } from "./components/Table";
import { Form } from "./components/Form";
import { DayKey, initialProjects, weekDefault } from "./data";
import { Project } from "./data";
import { PieChart } from "./components/PieChart";
import { useLocalStorage } from "react-use";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [projects, setProjects] = useLocalStorage<Project[]>("projects", initialProjects);
  const [projectName, setProjectName] = useLocalStorage<string>("projectName", "");
  const [targetHours, setTargetHours] = useLocalStorage<number>("targetHours", 0);

  const projectsDeault = projects ?? initialProjects;
  const projectNameDefault = projectName ?? "";
  const targetHoursDefault = targetHours ?? 0;

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
    if (isNaN(newHours)) {
      newHours = 0;
    }
    const updatedProjects = projectsDeault.map((project) => {
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
    setProjects(updatedProjects);
  };

  const deleteProject = (id: string) => {
    setProjects(projectsDeault.filter((project) => project.id !== id));
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

  return (
    <>
      <Form
        createNewProject={createNewProject}
        handleNewProjectName={handleNewProjectName}
        projectName={projectNameDefault}
        handleNewTargetHours={handleNewTargetHours}
        targetHours={targetHoursDefault}
      />

      <div>
        <button onClick={clearAllHours}>Clear All Hours</button>
      </div>

      <div className="section-pie-chart">
        {projectsDeault.map((project) => {
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
        projects={projectsDeault}
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
