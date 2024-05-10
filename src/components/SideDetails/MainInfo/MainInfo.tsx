"use client";
import React from "react";
import { CiLocationArrow1 } from "react-icons/ci";
import { CiCalendar } from "react-icons/ci";
import { FiSunrise } from "react-icons/fi";
import { FiSunset } from "react-icons/fi";
import { IoSunnyOutline } from "react-icons/io5";
import { MainDetailsT } from "./types";

type Props = {};

const MainInfo = ({
  country,
  city,
  temp,
  sunset,
  sunrise,
  condition,
}: MainDetailsT) => {
  return (
    <div className="flex flex-col gap-5 color-white justify-center align-center mt-20">
      <div className="flex justify-center align-center gap-10">
        <div className="flex gap-2">
          <CiLocationArrow1 color="white" className="mt-1" />
          <p className="text-slate-50">
            {city},{country}
          </p>
        </div>
        <div className="flex gap-2 ">
          <FiSunrise color="white" className="mt-1" />
          <p className="text-slate-50">{sunrise}</p>
        </div>
      </div>
      <div className="flex justify-center align-center gap-10">
        <div className="flex gap-2">
          <CiCalendar color="white" className="mt-1 color-white" />
          <p className="text-slate-50">Monday 19 April</p>
        </div>
        <div className="flex gap-2 ">
          <FiSunset color="white" className="mt-1" />
          <p className="text-slate-50">{sunset}</p>
        </div>
      </div>
      <div className="flex  justify-center align-center mt-20">
        <div className=" text-8xl text-slate-50 ">{temp}</div>
      </div>
      <div className="flex justify-center gap-4 mr-10">
        <IoSunnyOutline color="white" size={"2em"} className="" />
        <p className="text-slate-50 text-xl font-light">{condition}</p>
      </div>
    </div>
  );
};

export default MainInfo;
