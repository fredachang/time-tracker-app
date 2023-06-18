interface Props {
  text: string;
  title: string;
  type: "submit" | "button" | "reset";
  viewBox: string;
  svgPath: string;
  lightTheme: boolean;
}

export function SubmitButton(props: Props) {
  const { text, title, type, viewBox, svgPath, lightTheme } = props;
  return (
    <div className="button-container">
      <button className="button" title={title} type={type}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox}>
          <path
            d={svgPath}
            fill="none"
            stroke={lightTheme ? "#000" : "rgb(0,255,0)"}
            stroke-width="1"
          />
        </svg>
      </button>
      <div className="button-description">{text}</div>
    </div>
  );
}
