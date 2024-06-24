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

const WeeklyForecast = () => {
  const data = [
    { date: "23 Jun", temp: 22 },
    { date: "24 Jun", temp: 25 },
    { date: "25 Jun", temp: 20 },

  ];

  const [weeklyWeatherData, setWeeklyWeatherData] =
    useState<DailyForecastT | null>(null);
  const [loading, setLoading] = useState(true);
  const searchCity = useWeatherStore((state) => state.coordinates);
  const { showHourlyForecast, setShowHourlyForecast } = useWeatherStore();

  const handleClick = (showHourly: boolean) => {
    setShowHourlyForecast(showHourly);
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [searchCity]);

console.log(weeklyWeatherData)

  return (
    <div className="w-3/4 h-96 flex flex-col border border-[#F7F9F2] rounded-xl bg-red  bg-white">
      <ResponsiveContainer width="100%" height={195}>
        <ComposedChart
          data={data}
          margin={{ top: 20, right: 10, bottom: 10, left: 10 }}
        >
          <Tooltip active={false} />
          <XAxis
            padding={{ left: 25, right: 25 }}
            interval={0}
            dataKey={"date"}
            tickLine={false}
            axisLine={false}
          />
          <Area
            type="monotone"
            dataKey="temp"
            fill="#eceeff"
            stroke="#77bae8"
            label={{ position: "top", fill: "#333" }}
          />
        </ComposedChart>
      </ResponsiveContainer>
      <div className="flex">
        {weeklyWeatherData &&
          weeklyWeatherData.forecast.forecastday.map((day, index) => (
            <Day key={index} day={day} />
          ))}
      </div>
    </div>
  );
};

export default WeeklyForecast;
