import React from "react";
import HumidityCard from "./Humidity/Humidity";
import { DailyForecastT, HourlyWeatherDataT } from "@/lib/types";

type Props = {};

const SecondaryDetails = ({hourlyWeatherData}:DailyForecastT) => {
  return (
    <div className="container mt-4 w-full px-1 grid grid-cols-1 md:grid-cols-3 gap-2">
      <HumidityCard humidity={hourlyWeatherData.current.humidity} />
    </div>
  );
};

export default SecondaryDetails;
