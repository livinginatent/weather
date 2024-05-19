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
      {type === "UV" && (
        <p className="text-[14px] text-gray-600 text-center">{range}</p>
      )}
      {type === "feelsLike" && (
        <div className="absolute top-[-20px] w-full flex justify-between text-[14px] text-gray-600">
          {range.map((label: string, index: number) => (
            <span key={index}>{label}</span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
