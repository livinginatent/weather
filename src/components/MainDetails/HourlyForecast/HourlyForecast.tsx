import { HourlyForecastT } from "@/lib/types";
import React, { useState, useEffect } from "react";
import {
  ComposedChart,
  Area,
  Bar,
  XAxis,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { WeatherIconLabel, TempLabel, TimeLabel } from "./labels";
import { getIcon } from "@/utils/getIcon";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const HourlyForecast = ({ hourlyWeatherData }: HourlyForecastT) => {
  const [hoursToShow, setHoursToShow] = useState<number>(15);
  const [chartWidth, setChartWidth] = useState<string | number>("100%");

  const updateChartSettings = () => {
    const width = window.innerWidth;
    if (width <= 768) {
      setChartWidth(hoursToShow * 80); 
    } else {
      setChartWidth("100%");
    }
  };

  useEffect(() => {
    updateChartSettings();
    window.addEventListener("resize", updateChartSettings);
    return () => {
      window.removeEventListener("resize", updateChartSettings);
    };
  }, []);

  const getCurrentWeather = () => ({
    time: "İndi",
    windSpeed: `${Math.round(
      hourlyWeatherData?.current?.wind_kph ?? 0
    )}km/saat`,
    bar: 20,
    temp: hourlyWeatherData?.current?.temp_c ?? 0,
    icon: getIcon(hourlyWeatherData?.current?.condition?.icon ?? ""),
  });

  const getHourlyData = () => {
    const hours = [getCurrentWeather()];
    const now = new Date();
    const currentHour = now.getHours();

    const remainingHoursToday = 24 - currentHour;
    const displayHours = Math.min(hoursToShow, remainingHoursToday);

    const nextHour = new Date(now.setHours(now.getHours() + 1, 0, 0, 0));

    for (let i = 0; i < displayHours - 1; i++) {
      const newHour = new Date(nextHour.getTime() + i * 60 * 60 * 1000);
      const hourIndex = newHour.getHours();
      const temp = Math.round(
        hourlyWeatherData?.forecast?.forecastday[0]?.hour[hourIndex]?.temp_c ??
          0
      );
      const windSpeed = Math.round(
        hourlyWeatherData?.forecast?.forecastday[0]?.hour[hourIndex]
          ?.wind_kph ?? 0
      );

      hours.push({
        time: newHour
          .toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hourCycle: "h23",
          })
          .replace(/AM|PM/, ""),
        windSpeed: `${windSpeed}km/saat`,
        bar: 20,
        temp: temp,
        icon: getIcon(
          hourlyWeatherData?.forecast?.forecastday[0]?.hour[hourIndex]
            ?.condition?.icon ?? ""
        ),
      });
    }

    return hours;
  };

  const data = getHourlyData();

  return (
    <div className="bg-white xl:w-full w-full rounded-2xl flex flex-col p-4 justify-between">
      <div className="px-4 py-2"></div>

      <div className="pb-4 px-4 overflow-x-auto">
        <div style={{ minWidth: chartWidth }}>
          <ResponsiveContainer width="100%" height={225}>
            <ComposedChart
              data={data}
              margin={{ top: 80, right: 20, bottom: 10, left: 20 }}
            >
              <Area type="monotone" dataKey="temp" fill="#77bae8" />
              <XAxis style={{ fontSize: 12 }} dataKey="windSpeed" />
              <Bar dataKey="bar" barSize={2} fill="#C7C8CC">
                <LabelList
                  dataKey="time"
                  content={<TimeLabel />}
                  position="top"
                />
                <LabelList
                  dataKey="icon"
                  content={<WeatherIconLabel />}
                  position="top"
                />
                <LabelList
                  content={<TempLabel />}
                  dataKey="temp"
                  position="top"
                />
              </Bar>
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default HourlyForecast;
