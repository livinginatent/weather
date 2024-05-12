"use client";
import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { CiCalendar } from "react-icons/ci";
import { IoSunnyOutline } from "react-icons/io5";
import { MainDetailsT } from "./types";
import { BeatLoader } from "react-spinners";

const MainInfo = ({
  country,
  city,
  temp,
  sunset,
  sunrise,
  condition,
  loading,
  date,
}: MainDetailsT) => {
  if (loading) {
    return (
      <div className="flex  justify-center align-center mt-20">
        <BeatLoader style={{ marginTop: 200 }} color="#98E4FF" />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-5 color-white justify-center align-center mt-20">
      <div className="flex justify-center align-center gap-10">
        <div className="flex gap-2">
          <CiLocationOn color="white" size={24} className="mt-0.5" />
          <p className="text-slate-50 text-xl">
            {city},{country}
          </p>
        </div>
      </div>
      <div className="flex justify-center align-center gap-10"></div>
      <div className="flex  justify-center align-center mt-10">
        <div className=" text-8xl text-slate-50 ">{temp}</div>
      </div>
      <div className="flex flex-col justify-center gap-4 ">
        <div className="flex justify-center align-center gap-4">
          <IoSunnyOutline color="white" size={"2em"} className="" />
          <p className="text-slate-50 text-xl font-light">{condition}</p>
        </div>
        <div className="flex pt-20 justify-center align-center gap-2">
          <CiCalendar color="white" size={24} className="mt-0.5 color-white" />
          <p className="text-slate-50 text-xl">{date}</p>
        </div>
      </div>
    </div>
  );
};

export default MainInfo;
