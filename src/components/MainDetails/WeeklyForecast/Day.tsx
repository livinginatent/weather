import { DailyForecastT } from "@/lib/types";
import React from "react";
import { IoSunnyOutline } from "react-icons/io5";

type Props = {};

function Day(/* data: DailyForecastT, index: number */) {
  const sunIcon = <IoSunnyOutline/>
  return <div className="border-r-4 flex flex-col w-32 border-indigo-500 ...">
    <p>Monday</p>
    {sunIcon}

  </div>;
}

export default Day;
