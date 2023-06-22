interface Props {
  text: string;
  title: string;
  type: "submit" | "button" | "reset";
  viewBox: string;
  svgPath: string;
  theme: string;
}

export function SubmitButton(props: Props) {
  const { text, title, type, viewBox, svgPath, theme } = props;
  return (
    <div className="flex">
      <button
        className="bg-transparent w-7 h-7 p-0 border-0"
        title={title}
        type={type}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox}>
          <path
            d={svgPath}
            fill="none"
            stroke={theme === "light" ? "#000" : "rgb(0,255,0)"}
            stroke-width="1"
          />
        </svg>
      </button>
      <div className="relative r-3 text-sm">{text}</div>
    </div>
  );
}
