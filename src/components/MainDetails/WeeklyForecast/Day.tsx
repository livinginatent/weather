import { DailyForecastT } from "@/lib/types";
import React from "react";

type Props = {};

function Day(data: DailyForecastT,index:number) {
  const weatherData = data.forecast.forecastday[index]
  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          10-Day Weather Forecast
        </h2>
      </div>
      <div>
        <div className="flex items-center justify-between p-4 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <span className="font-medium text-gray-700">{'Friday'}</span>
            <span className="text-gray-500">{weatherData.date}</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <span className="text-xl font-bold text-gray-800">
                {weatherData.day.maxtemp_c}°
              </span>
              <span className="text-gray-500"> / {weatherData.day.mintemp_c}°</span>
            </div>
            <div className="flex flex-col">
              {/* <span className="text-gray-700">{day.description}</span>
              <span className="text-gray-500">{day.nightDescription}</span> */}
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-gray-500">{weatherData.day.totalprecip_mm}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Day;
