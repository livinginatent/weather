import { MonthlyDataT } from "@/lib/types";
import { weatherIcons } from "@/lib/weatherIcons";
import React from "react";

const MonthlyForecast: React.FC<MonthlyDataT> = ({
  daily,
  weatherCodeTexts,
}) => {
  return (
    <div className="p-5 font-sans">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {daily.time.map((date, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg p-4 text-center shadow-sm"
          >
            <h3 className="font-bold text-lg">
              {new Date(date).toLocaleDateString()}
            </h3>
            <div className="text-2xl my-3">
              {/* Replace with actual weather icons */}
              {weatherIcons[daily.weatherCode[index]]}
              {weatherCodeTexts[daily.weatherCode[index]] || "Unknown Weather"}
            </div>
            <p className="text-sm">
              Max Temp: {daily.temperature2mMax[index].toFixed(1)}°C
            </p>
            <p className="text-sm">
              Min Temp: {daily.temperature2mMin[index].toFixed(1)}°C
            </p>
            <p className="text-sm">
              Yağış: {daily.rainSum[index]?.toFixed(1)} mm
            </p>
            <p className="text-sm">
              Qar: {daily.snowfallSum[index]?.toFixed(1)} mm
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthlyForecast;
