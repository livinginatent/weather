import { DailyForecastT } from "@/lib/types";
import React from "react";
import { IoSunnyOutline } from "react-icons/io5";

type Props = {};

 const Day = (/* data: DailyForecastT, index: number */) => {
  const sunIcon = <IoSunnyOutline />;
  return (
    <div className="border-r-2 border-[#eceeff] gap-4 flex flex-col w-32 border-indigo-500 items-center justify-center py-4">
      <p className="">Monday</p>
      {sunIcon}
      <p>13C</p>
    </div>
  );
}

export default Day;
