import React from "react";
import HumidityCard from "./Humidity/HumidityCard";
import { BeatLoader } from "react-spinners";
import WindCard from "./Wind/WindCard";
import UVIndexCard from "./UVIndex/UVIndexCard";
import { HourlyForecastT } from "@/lib/types";
import AirQualityCard from "./AirQuality/AirQualityCard";
import SunTimes from "./SunTimes/SunTimesCard";
import ExtraDetailsCard from "./ExtraDetails/ExtraDetailsCard";

const SecondaryDetails = ({ hourlyWeatherData }: HourlyForecastT) => {

  const humidity = hourlyWeatherData?.current.humidity ?? 0;
  const wind = hourlyWeatherData?.current.wind_kph ?? 0;
  const UVIndex = hourlyWeatherData?.current.uv ?? 0;
  const airQuality = hourlyWeatherData?.current.air_quality ?? {
    co: 0,
    no2: 0,
    o3: 0,
    so2: 0,
    pm2_5: 0,
    pm10: 0,
    "us-epa-index": 0,
    "gb-defra-index": 0,
  };

  const sunrise =
    hourlyWeatherData?.forecast.forecastday[0].astro.sunrise ?? "";
  const sunset = hourlyWeatherData?.forecast.forecastday[0].astro.sunset ?? "";
   const current = hourlyWeatherData?.current

  return (
    <div className="container mt-4 w-full h-full pb-1 px-1 grid grid-cols-1 md:grid-cols-3 gap-2">
      <HumidityCard humidity={humidity} />
      <WindCard wind={wind} />
      <UVIndexCard UVindex={UVIndex} />
      <AirQualityCard airQuality={airQuality} />
      <SunTimes
        sunrise={sunrise}
        sunset={sunset}
        moonrise={""}
        moonset={""}
        moon_phase={""}
        moon_illumination={0}
        is_moon_up={0}
        is_sun_up={0}
      />
      <ExtraDetailsCard
        current={current}
        forecast={{
          forecastday: [],
        }}
      />
    </div>
  );
};

export default SecondaryDetails;
