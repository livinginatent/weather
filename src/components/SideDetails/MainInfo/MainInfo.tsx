"use client";
import React from "react";
import { CiLocationOn, CiCalendar } from "react-icons/ci";
import { IoSunnyOutline } from "react-icons/io5";
import { MainDetailsT } from "./types";
import { BeatLoader } from "react-spinners";
import Image from "next/image";

const MainInfo = ({
  country,
  city,
  temp,
  condition,
  loading,
  date,
}: MainDetailsT) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center mt-20">
        <BeatLoader color="#98E4FF" />
      </div>
    );
  }
  return (
    <div className="flex flex-col w-auto gap-2 justify-center items-center mt-10">
      <div className="flex justify-center items-center gap-1 flex-col sm:flex-row">
        <CiLocationOn  color="white" size={24} />
        <div>
          <p className="text-slate-50 text-sm md:text-lg lg:text-xl xl:text-xl">
            {city}, {country}
          </p>
         
        </div>
      </div>
      <div className="flex justify-center items-center mt-10">
        <div className="text-3xl md:text-5xl lg:text-6xl xl:text-8xl text-slate-50">
          {temp}
        </div>
      </div>
      <div className="flex flex-col justify-center gap-4">
        <div className="flex justify-center items-center lg:gap-4 xl:gap-4 sm:gap-1 md:gap-1">
          <IoSunnyOutline color="white" size={"2em"} />
          <p className="text-slate-50 text-sm md:text-lg lg:text-xl xl:text-xl font-light">
            {condition}
          </p>
        </div>
        <div className="flex gap-2  lg:pt-5 xl:pt-5">
          <CiCalendar color="white"  size={24} />
          <p className="text-slate-50 text-sm md:text-lg lg:text-xl xl:text-xl">
            {date}
          </p>
        </div>
       {/*  <Image alt="maiden" width={400} height={400} src={require('../../../assets/maiden-tower.jpg')}/> */}
      </div>
    </div>
  );
};

export default MainInfo;
