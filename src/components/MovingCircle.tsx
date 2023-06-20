import { useEffect, useRef } from "react";

type CanvasProps = React.DetailedHTMLProps<
  React.CanvasHTMLAttributes<HTMLCanvasElement>,
  HTMLCanvasElement
> & { className: string };

export const MovingCircle: React.FC<CanvasProps> = ({
  className,
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    // Function to handle mouse movement
    const handleMouseMove = (event: MouseEvent) => {
      // Clear the canvas
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Calculate the position of the mouse relative to the canvas
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      // Calculate the distance between the mouse position and the center of the circle
      const distance = Math.sqrt(
        (mouseX - canvas.width / 2) ** 2 + (mouseY - canvas.height / 2) ** 2
      );

      // Check if the distance is less than the minimum distance
      if (distance < 500) {
        // Calculate the offset based on the minimum distance
        const ratio = 500 / distance;
        const offsetX = (canvas.width / 2 - mouseX) * ratio;
        const offsetY = (canvas.height / 2 - mouseY) * ratio;

        // Draw the circle with an offset from the mouse position
        context.beginPath();
        context.arc(mouseX + offsetX, mouseY + offsetY, 500, 0, Math.PI * 2);
        context.strokeStyle = "red";
        context.lineWidth = 2;
        context.stroke();
      } else {
        // Draw the circle at the center of the canvas
        context.beginPath();
        context.arc(canvas.width / 2, canvas.height / 2, 500, 0, Math.PI * 2);
        context.strokeStyle = "red";
        context.lineWidth = 2;
        context.stroke();
      }
    };

    // Add event listener for mouse movement
    canvas.addEventListener("mousemove", handleMouseMove);

    // Clean up the event listener when the component unmounts
    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={props.width}
      height={props.height}
      className={className}
    />
  );
};
