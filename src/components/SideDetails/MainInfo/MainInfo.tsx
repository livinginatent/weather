import React from "react";
import { CiLocationArrow1 } from "react-icons/ci";
import { CiCalendar } from "react-icons/ci";
import { FiSunrise } from "react-icons/fi";
import { FiSunset } from "react-icons/fi";
import { MainDetailsT } from "./types";

type Props = {};

const MainInfo = ({ country, city, temp ,sunset,sunrise}: MainDetailsT) => {
  return (
    <div className="flex flex-col gap-5 color-white justify-center align-center mt-20">
      <div className="flex justify-center align-center gap-10">
        <div className="flex gap-2">
          <CiLocationArrow1 className="mt-1" />
          <p className="text-slate-50">
            {city},{country}
          </p>
        </div>
        <div className="flex gap-2 ">
          <FiSunrise className="mt-1" />
          <p className="text-slate-50">{sunrise}</p>
        </div>
      </div>
      <div className="flex justify-center align-center gap-8">
        <div className="flex gap-2">
            <CiCalendar  className="mt-1 color-white"/>
          <p className="text-slate-50">Monday 19 April</p>
        </div>
        <div className="flex gap-2 ">
          <FiSunset className="mt-1" />
          <p className="text-slate-50">{sunset}</p>
        </div>
      </div>
    </div>
  );
};

export default MainInfo;
