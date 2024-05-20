import React from "react";

const ProgressBar = ({ value, color, width, type, range }: any) => {
  const progressStyle = {
    width: `${value}%`,
    backgroundColor: color,
  };
  const w = {
    width: width,
  };

  return (
    <div className="bg-gray-200 rounded-full h-2 mt-2 relative" style={w}>
      <div className="h-full rounded-full" style={progressStyle}></div>
      {type === "feelsLike" && (
        <p className="text-[14px] text-gray-600 text-center">{range}</p>
      )}
    </div>
  );
};

export default ProgressBar;
