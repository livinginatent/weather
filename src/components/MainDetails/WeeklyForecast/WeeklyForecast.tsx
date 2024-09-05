import useWeatherStore from "@/store/store";
import React, { useEffect, useState } from "react";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Day from "./Day";
import { getWeekly } from "@/actions/getWeekly";
import { DailyForecastT } from "@/lib/types";
import { getIcon } from "@/utils/getIcon";
import { ClipLoader } from "react-spinners";
import { DayCarousel } from "./DayCarousel";

const WeeklyForecast = () => {
  const [weeklyWeatherData, setWeeklyWeatherData] =
    useState<DailyForecastT | null>(null);

  const searchCity = useWeatherStore((state) => state.coordinates);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = await getWeekly({
          lat: searchCity.lat,
          lon: searchCity.lon,
        });

        if (data) {
          setWeeklyWeatherData(data);
        }
      } catch (error) {
        console.error("Error fetching weather data", error);
      }
    };

    fetchWeatherData();
  }, [searchCity]);

  if (!weeklyWeatherData) {
    return <ClipLoader color="#36d7b7" />;
  }

  return (
    <div className="w-3/4 flex flex-col items-center justify-around">
      
      <div className=" border border-[#F7F9F2] rounded-2xl bg-white">
        <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row justify-center items-center lg:justify-around">
          {weeklyWeatherData?.forecast?.forecastday?.map((day, index) => (
            <Day key={index} day={day} />
          ))}
        </div>
        {/* <DayCarousel/> */}
      </div>
    </div>
  );
};

export default WeeklyForecast;
