import React from "react";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  ResponsiveContainer,
  LabelList,
} from "recharts";

type Props = {};

const DailyForecast = (props: Props) => {


    
  const getHourlyData = () => {
    const hours = [];
    const now = new Date(); // Current date and time
    for (let i = 0; i < 12; i++) {
      now.setHours(now.getHours() + 1);
      hours.push({
        windSpeed: `${Math.floor(Math.random() * 10)}kmh`,
        chanceOfRain: Math.floor(Math.random() * 10),
        bar: 20,
        temp: `${Math.floor(Math.random() * 10+1)}C`,
      });
    }
    return hours;
  };

  const data = getHourlyData();
  return (
    <>
      <div className="bg-white w-5/6 h-80 mt-10 rounded-2xl flex flex-col justify-between">
        <div className="px-4 py-2"></div>
        <div className=" pb-4">
    
          <ComposedChart
            width={1250}
            height={200}
            data={data}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <XAxis dataKey="windSpeed" />

            <Area
              type="monotone"
              dataKey="chanceOfRain"
              fill="#5c9ce5"
              stroke="transparent"
            />
            <Bar dataKey="bar" barSize={2} fill="#C7C8CC">
              <LabelList dataKey="temp" position="top" />
            </Bar>
          </ComposedChart>
        </div>
      </div>
    </>
  );
};

export default DailyForecast;
