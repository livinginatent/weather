import React from "react";
import HumidityCard from "./Humidity/HumidityCard";
import { BeatLoader } from "react-spinners";
import WindCard from "./Wind/WindCard";
import UVIndexCard from "./UVIndex/UVIndexCard";
import { HourlyForecastT } from "@/lib/types";
import AirQualityCard from "./AirQuality/AirQualityCard";

const SecondaryDetails = ({ hourlyWeatherData, loading }: HourlyForecastT) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center mt-20">
        <BeatLoader color="#98E4FF" />
      </div>
    );
  }
  return (
    <div className="container mt-4 w-full h-full pb-1 px-1 grid grid-cols-1 md:grid-cols-3 gap-2">
      <HumidityCard humidity={hourlyWeatherData?.current.humidity} />
      <WindCard wind={hourlyWeatherData?.current.wind_kph} />
      <UVIndexCard UVindex={hourlyWeatherData?.current.uv} />
      <AirQualityCard airQuality={hourlyWeatherData.current.air_quality}/>
    </div>
  );
};

export default SecondaryDetails;
