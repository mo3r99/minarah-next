import React from "react";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "medium",
  color = "#6bbaa7",
}) => {
  const getSize = () => {
    switch (size) {
      case "small":
        return 16;
      case "large":
        return 48;
      default:
        return 32;
    }
  };

  return (
    <>
      <div className="absolute bg-[rgba(0,0,0,0.2)] backdrop-blur-xs w-screen h-screen z-10"></div>
      <div className="absolute z-20 flex justify-center items-center w-full h-screen">
        <div
          className="animate-spin"
          style={{
            width: getSize(),
            height: getSize(),
            borderRadius: "50%",
            border: `2px solid ${color}`,
            borderTopColor: "transparent",
          }}
        />
      </div>
    </>
  );
};

export default LoadingSpinner;
