import React from "react";
import HumidityCard from "./Humidity/HumidityCard";
import { DailyForecastT } from "@/lib/types";
import { BeatLoader } from "react-spinners";
import WindCard from "./Wind/WindCard";

const SecondaryDetails = ({ hourlyWeatherData, loading }: DailyForecastT) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center mt-20">
        <BeatLoader color="#98E4FF" />
      </div>
    );
  }
  return (
    <div className="container mt-4 w-full px-1 grid grid-cols-1 md:grid-cols-3 gap-2">
      <HumidityCard humidity={hourlyWeatherData?.current.humidity} />
      <WindCard/>
    </div>
  );
};

export default SecondaryDetails;
