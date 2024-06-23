import useWeatherStore from "@/store/store";
import React, { useEffect } from "react";
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

const WeeklyForecast = () => {
  const data = [
    { date: "23 Jun", temp: 22 },
    { date: "24 Jun", temp: 25 },
    { date: "25 Jun", temp: 20 },
    { date: "26 Jun", temp: 27 },
    { date: "27 Jun", temp: 24 },
    { date: "28 Jun", temp: 23 },
    { date: "29 Jun", temp: 26 },
  ];
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
      <Day/>
    </div>
  );
};

export default WeeklyForecast;
