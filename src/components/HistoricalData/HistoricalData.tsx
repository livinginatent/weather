import { weatherCodes } from "@/lib/weatherCodes";
import React from "react";

type WeatherDataProps = {
  apparentTemperatureMax: number | null;
  apparentTemperatureMin: number | null;
  rainSum: number | null;
  snowfallSum: number | null;
  weatherCode: number | null;
  windSpeed10mMax: number | null;
  date: string;
};

const HistoricalDataUI = ({
  apparentTemperatureMax,
  apparentTemperatureMin,
  rainSum,
  snowfallSum,
  weatherCode,
  windSpeed10mMax,
  date,
}: WeatherDataProps) => {
  const weatherDescription =
    weatherCode !== null && weatherCodes[weatherCode]
      ? weatherCodes[weatherCode]
      : "Məlumat yoxdur";
  const displayData = (data: number | null, unit: string) => {
    return data !== null ? `${data.toFixed(1)} ${unit}` : "Məlumat tapılmadı";
  };
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
      <h2 className="text-xl font-semibold mb-4">Tarix: {date}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <span className="font-medium">Hava Vəziyyəti:</span>
          <span>{weatherDescription}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-medium">Max Temperatur (Hiss olunan):</span>
          <span>{displayData(apparentTemperatureMax, "°C")}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-medium">Yağış Miqdarı:</span>
          <span>{displayData(rainSum, "mm")}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-medium">Min Temperatur (Hiss olunan):</span>
          <span>{displayData(apparentTemperatureMin, "°C")}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-medium">Qar Miqdarı:</span>
          <span>{displayData(snowfallSum, "mm")}</span>
        </div>

        <div className="flex flex-col">
          <span className="font-medium">Max Külək sürəti:</span>
          <span>{displayData(windSpeed10mMax, "km/h")}</span>
        </div>
      </div>
    </div>
  );
};

export default HistoricalDataUI;
