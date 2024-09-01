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
const HourlyForecast = ({ hourlyWeatherData }: HourlyForecastT) => {
  const [hoursToShow, setHoursToShow] = useState<number>(10);

  const updateHoursToShow = () => {
    const width = window.innerWidth;
    if (width <= 768) {
      setHoursToShow(5);
    } else {
      setHoursToShow(10);
    }
  };

  useEffect(() => {
    updateHoursToShow();
    window.addEventListener("resize", updateHoursToShow);
    return () => {
      window.removeEventListener("resize", updateHoursToShow);
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
    const nextHour = new Date(now.setHours(now.getHours() + 1, 0, 0, 0));

    for (let i = 0; i < hoursToShow - 1; i++) {
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
    <div className="bg-white xl:w-full w-screen h-70 rounded-2xl flex flex-col p-4 justify-between">
      <h1 className="text-2xl self-center">Gün Ərzində Hava Proqnozu</h1>
      <div className="px-4 py-2"></div>
      
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
        {/*  <ForecastToggle onChange={setIsChecked} checked={checked} /> */}
      </div>
    </div>
  );
};

export default HourlyForecast;
