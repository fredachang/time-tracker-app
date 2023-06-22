import { SubmitButton } from "./SubmitButton";

interface Props {
  createNewProject: (e: React.FormEvent<HTMLFormElement>) => void;
  handleNewProjectName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  projectName: string;
  handleNewTargetHours: (e: React.ChangeEvent<HTMLInputElement>) => void;
  targetHours: number;
  theme: string;
}

const inputStyleLight =
  "bg-green rounded w-full block mr-5 hover:bg-greenLight focus:bg-greenLight";

const inputStyleDark =
  "bg-black rounded w-full block mr-5 hover:bg-zinc-900 hover:rounded focus:bg-zinc-900";

export function Form(props: Props) {
  const {
    createNewProject,
    handleNewProjectName,
    projectName,
    handleNewTargetHours,
    targetHours,
    theme,
  } = props;
  return (
    <>
      <form onSubmit={(e) => createNewProject(e)} className="w-full">
        <div className="flex w-4/5 justify-between items-center m-0">
          <div className="pl-2 w-3/5 text-base">
            <label htmlFor="new-project-name-input">
              <p>PROJECT NAME:</p>
            </label>
            <input
              className={theme === "light" ? inputStyleLight : inputStyleDark}
              id="new-project-name-input"
              placeholder="enter project name"
              type="text"
              onChange={handleNewProjectName}
              value={projectName}
            ></input>
          </div>

          <div className="pl-2 w-2/5 text-base border-l border-black dark:border-l dark:border-green">
            <label htmlFor="new-target-hour-input">
              <p>TARGET HOURS:</p>
            </label>
            <input
              className={theme === "light" ? inputStyleLight : inputStyleDark}
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
            theme={theme}
          />
        </div>
      </form>
    </>
  );
}
