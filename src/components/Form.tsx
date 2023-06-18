import { SubmitButton } from "./SubmitButton";

interface Props {
  createNewProject: (e: React.FormEvent<HTMLFormElement>) => void;
  handleNewProjectName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  projectName: string;
  handleNewTargetHours: (e: React.ChangeEvent<HTMLInputElement>) => void;
  targetHours: number;
  lightTheme: boolean;
}

export function Form(props: Props) {
  const {
    createNewProject,
    handleNewProjectName,
    projectName,
    handleNewTargetHours,
    targetHours,
    lightTheme,
  } = props;
  return (
    <>
      <form onSubmit={(e) => createNewProject(e)}>
        <div
          className={
            lightTheme ? "new-entries-form-light" : "new-entries-form-dark"
          }
        >
          <div
            className={
              lightTheme
                ? "new-project-name-field-light"
                : "new-project-name-field-dark"
            }
          >
            <label htmlFor="new-project-name-input">PROJECT NAME:</label>
            <input
              className={
                lightTheme
                  ? "new-project-name-input-light"
                  : "new-project-name-input-dark"
              }
              id="new-project-name-input"
              placeholder="enter project name"
              type="text"
              onChange={handleNewProjectName}
              value={projectName}
            ></input>
          </div>

          <div
            className={
              lightTheme
                ? "new-target-hour-field-light"
                : "new-target-hour-field-dark"
            }
          >
            <label htmlFor="new-target-hour-input">TARGET HOURS:</label>
            <input
              className={
                lightTheme
                  ? "new-target-hour-input-light"
                  : "new-target-hour-input-dark"
              }
              id="new-target-hour-input"
              placeholder="enter target hours"
              onChange={handleNewTargetHours}
              value={targetHours !== 0 ? targetHours : ""}
              type="number"
            ></input>
          </div>

          <SubmitButton
            text="ADD NEW"
            title="add new project"
            type="submit"
            viewBox="-5 -5 60 60"
            svgPath="m41.93,25c0,9.35-7.58,16.93-16.93,16.93s-16.93-7.58-16.93-16.93S15.65,8.07,25,8.07s16.93,7.58,16.93,16.93Zm-16.93-8.5c-4.69,0-8.5,3.8-8.5,8.5s3.8,8.5,8.5,8.5,8.5-3.8,8.5-8.5-3.8-8.5-8.5-8.5ZM1.03,25h47.94M25,1.03v47.94"
            lightTheme={lightTheme}
          />
        </div>
      </form>
    </>
  );
}
