interface Props {
  mousePosition: { x: number; y: number };
  theme: string;
}

export const LineIntersection = (props: Props) => {
  const { theme, mousePosition } = props;

  const backgroundColor = theme === "light" ? "black" : "rgb(0,255,0)";

  const emptySpace = 120;

  const emptyCoordinates = ({ x, y }, emptySpace: number) => ({
    verticalTop: y - emptySpace,
    verticalBottom: y + emptySpace,
    horizontalLeft: x - emptySpace,
    horizontalRight: x + emptySpace,
  });

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: mousePosition.x,
          bottom:
            window.innerHeight -
            emptyCoordinates(mousePosition, emptySpace).verticalTop,
          width: "0.5px",
          backgroundColor: backgroundColor,
          pointerEvents: "none",
          zIndex: 1000,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: emptyCoordinates(mousePosition, emptySpace).verticalBottom,
          bottom: 0,
          left: mousePosition.x,
          width: "0.5px",
          backgroundColor: backgroundColor,
          pointerEvents: "none",
          zIndex: 1000,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: mousePosition.y,
          left: emptyCoordinates(mousePosition, emptySpace).horizontalRight,
          right: 0,
          height: "0.5px",
          backgroundColor: backgroundColor,
          pointerEvents: "none",
          zIndex: 2000,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: mousePosition.y,
          right:
            window.innerWidth -
            emptyCoordinates(mousePosition, emptySpace).horizontalLeft,
          left: 0,
          height: "0.5px",
          backgroundColor: backgroundColor,
          pointerEvents: "none",
          zIndex: 2000,
        }}
      />
    </>
  );
};
