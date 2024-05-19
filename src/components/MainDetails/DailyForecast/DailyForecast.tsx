import { DailyForecastT } from "@/lib/types";
import React, { useState } from "react";
import { BeatLoader } from "react-spinners";
import {
  ComposedChart,
  Area,
  Bar,
  XAxis,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { SunIconLabel, TempLabel, TimeLabel } from "./labels";

const DailyForecast = ({ hourlyWeatherData, loading }: DailyForecastT) => {
  const getCurrentWeather = () => ({
    time: "İndi",
    windSpeed: `${Math.round(hourlyWeatherData?.current.wind_kph)}kmh`,
    bar: 20,
    temp: hourlyWeatherData?.current.temp_c,
  });

  const [logoUrl, setLogoUrl] = useState("");

  const getHourlyData = () => {
    const hours = [getCurrentWeather()];
    const now = new Date();
    const nextHour = new Date(now.setHours(now.getHours() + 1, 0, 0, 0));

    for (let i = 0; i < 10; i++) {
      const newHour = new Date(nextHour.getTime() + i * 60 * 60 * 1000);
      const hourIndex = newHour.getHours();
      const temp = Math.round(
        hourlyWeatherData?.forecast.forecastday[0].hour[hourIndex]?.temp_c
      );
      const windSpeed = Math.round(
        hourlyWeatherData?.forecast.forecastday[0].hour[hourIndex]?.wind_kph
      );

      hours.push({
        time: newHour
          .toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hourCycle: "h23",
          })
          .replace(/AM|PM/, ""),
        windSpeed: `${windSpeed}kmh`,
        bar: 20,
        temp: temp,
      });
    }

    return hours;
  };

  const data = getHourlyData();

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-20">
        <BeatLoader color="#98E4FF" />
      </div>
    );
  }

  return (
    <div className="bg-white w-full h-70 mt-5 rounded-2xl flex flex-col justify-between">
      <div className="px-4 py-2"></div>
      <h2 className="ml-5">Gün Ərzində</h2>
      <div className="pb-4">
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
              <LabelList content={<SunIconLabel />} position="top" />
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
  );
};

export default DailyForecast;
