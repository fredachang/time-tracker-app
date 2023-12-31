import { useState } from "react";

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
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="flex w-1/5">
      <button
        className="bg-transparent w-7 h-7 p-0 border-0"
        title={title}
        type={type}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox={viewBox}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <path
            d={svgPath}
            fill={
              isHovered
                ? theme === "light"
                  ? "black"
                  : "rgb(0, 255, 0)"
                : "none"
            }
            stroke={theme === "light" ? "#000" : "rgb(0, 255, 0)"}
            strokeWidth="1"
          />
        </svg>
      </button>
      <div className="relative r-3">
        <p>{text}</p>
      </div>
    </div>
  );
}
