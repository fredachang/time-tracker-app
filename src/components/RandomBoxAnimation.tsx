import React, { useEffect, useRef } from "react";

type CanvasProps = React.DetailedHTMLProps<
  React.CanvasHTMLAttributes<HTMLCanvasElement>,
  HTMLCanvasElement
> & { className: string };

const RandomBoxAnimation: React.FC<CanvasProps> = ({ className, ...props }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }
    const boxWidth = 7;
    const boxHeight = 7;
    const boxPadding = 0;
    const totalBoxes = 5;
    const animationDuration = 1000; // Animation duration in milliseconds
    const framesPerSecond = 60; // Number of frames per second

    // Calculate the available width for boxes
    const availableWidth =
      canvas.width - totalBoxes * (boxWidth + boxPadding) + boxPadding;
    const spacing = availableWidth / (totalBoxes - 1);

    // Create the box objects
    const boxes = Array.from({ length: totalBoxes }, (_, i) => ({
      x: i * (boxWidth + boxPadding + spacing),
      y: 0,
      isBlack: Math.random() < 0.5, // Randomly assign black or transparent
    }));

    // Calculate the animation increment
    const animationIncrement =
      1 / ((animationDuration / 1000) * framesPerSecond);

    // Start the animation loop
    let requestId: number;
    const animate = () => {
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw the boxes
      boxes.forEach((box) => {
        // Randomly switch between black and transparent
        if (Math.random() < animationIncrement) {
          box.isBlack = !box.isBlack;
        }

        // Draw the box with the current fill color
        if (box.isBlack) {
          ctx.fillStyle = "#000"; // Black fill
          ctx.fillRect(box.x, box.y, boxWidth, boxHeight);
        } else {
          ctx.clearRect(box.x, box.y, boxWidth, boxHeight); // Clear the box
        }
      });

      requestId = requestAnimationFrame(animate);
    };

    // Start the animation
    requestId = requestAnimationFrame(animate);

    return () => {
      // Cleanup function to cancel the animation frame when the component unmounts
      cancelAnimationFrame(requestId);
    };
  }, []); // Empty dependency array to run the effect only once on component mount

  return (
    <canvas
      ref={canvasRef}
      width={props.width}
      height={props.height}
      className={className}
    />
  );
};

export default RandomBoxAnimation;
