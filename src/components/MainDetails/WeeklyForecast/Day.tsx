import { DailyForecastData, DailyForecastT } from "@/lib/types";
import React from "react";
import { IoSunnyOutline } from "react-icons/io5";



 const Day = (day:any) => {
  const sunIcon = <IoSunnyOutline />;
    const getWeekday = (dateString: string): string => {
      const date = new Date(dateString);
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      return days[date.getDay()];
    };
    const weekDay = getWeekday(day.day.date)

  return (
    <div className="border-r-2 border-[#eceeff] gap-4 flex flex-col w-32 border-indigo-500 items-center justify-center py-4">
      <p className="">{weekDay}</p>
      {sunIcon}
      <p>13C</p>
      <p className="font-light text-slate-400">Will be sunny</p>
    </div>
  );
}

export default Day;
