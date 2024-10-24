import useWeatherStore from "@/store/store";
import React, { useEffect, useState } from "react";

import Day from "./Day";
import { getWeekly } from "@/actions/getWeekly";
import { DailyForecastT } from "@/lib/types";
import { getSearchWeekly } from "@/actions/getSearchWeekly";

const WeeklyForecast = () => {
  const [weeklyWeatherData, setWeeklyWeatherData] =
    useState<DailyForecastT | null>(null);

  const searchCity = useWeatherStore((state) => state.coordinates);

  useEffect(() => {
    const fetchWeatherData = async () => {
      /* const meteo = await getMeteo()
      console.log(meteo) */
      try {
        let data;

        if (searchCity.lat != null && searchCity.lon != null) {
          data = await getSearchWeekly({
            lat: searchCity.lat,
            lon: searchCity.lon,
          });
        } else {
          data = await getWeekly();
        }

        if (data) {
          setWeeklyWeatherData(data);
        }
      } catch (error) {
        console.error("Error fetching weather data", error);
      }
    };

    fetchWeatherData();
  }, [searchCity]);

  return (
    <div className="w-full  flex items-center justify-center mt-4">
      <div className="border border-[#F7F9F2] rounded-2xl bg-white">
        <div className="flex flex-col justify-center items-center w-full">
          {weeklyWeatherData?.forecast?.forecastday?.map((day, index) => (
            <Day key={index} day={day} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeeklyForecast;
