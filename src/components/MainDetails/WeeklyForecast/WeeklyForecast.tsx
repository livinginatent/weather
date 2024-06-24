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

const WeeklyForecast = () => {
  const [weeklyWeatherData, setWeeklyWeatherData] =
    useState<DailyForecastT | null>(null);
  const [loading, setLoading] = useState(true);
  const searchCity = useWeatherStore((state) => state.coordinates);
  const { showHourlyForecast, setShowHourlyForecast } = useWeatherStore();
  const [logoUrl, setLogoUrl] = useState<string>("");

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
          const localIconPath = getIcon(data.current.condition.icon);
          setLogoUrl(localIconPath);
        }
      } catch (error) {
        console.error("Error fetching weather data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [searchCity]);
  const data = weeklyWeatherData?.forecast.forecastday.map((day) => {
    const date = new Date(day.date).toLocaleDateString("az-AZ", {
      day: "2-digit",
      month: "short",
      
    });
    const temp = day.day.maxtemp_c; // or use day.day.maxtemp_c / day.day.mintemp_c based on your requirement
    const wind = day.day.maxwind_kph
    return { date, temp,wind };
  });

  console.log(weeklyWeatherData)
  return (
    <div className="w-3/4  flex flex-col border border-[#F7F9F2] rounded-xl bg-red  bg-white">
      <ResponsiveContainer width="100%" height={195}>
        <ComposedChart
          data={data}
          margin={{ top: 20, right: 10, bottom: 10, left: 10 }}
        >
          <Tooltip active={false} />
          <XAxis
            padding={{ left: 25, right: 25 }}
            interval={0}
            type="category"
            tickLine={false}
            axisLine={false}
            unit='km/s'
            dataKey="wind"
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
      <div className="flex justify-around">
        {weeklyWeatherData &&
          weeklyWeatherData.forecast.forecastday.map((day, index) => (
            <Day logo={logoUrl} key={index} day={day} />
          ))}
      </div>
    </div>
  );
};

export default WeeklyForecast;
