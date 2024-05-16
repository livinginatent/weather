import React from "react";

const ProgressBar = ({ value, color,width }:any) => {
  const progressStyle = {
    width: `${value}%`,
    backgroundColor: color,
  };
  const w = {
    width:width
  }

  return (
    <div className="bg-gray-200 rounded-full h-2 mt-2" style={w}>
      <div className="h-full rounded-full" style={progressStyle}></div>
    </div>
  );
};

export default ProgressBar;
