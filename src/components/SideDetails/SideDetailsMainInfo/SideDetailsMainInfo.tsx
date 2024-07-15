"use client";
import React from "react";
import { CiLocationOn, CiCalendar } from "react-icons/ci";
import { MainDetailsT } from "./types";
import Image from "next/image";
import "react-loading-skeleton/dist/skeleton.css";
const SideDetailsMainInfo = ({
  country,
  city,
  temp,
  condition,
  date,
  logo,
  loading
}: MainDetailsT) => {
 
  return (
    <div className="flex flex-col w-full gap-2 justify-center items-center mt-10">
      <>
        {" "}
        <div className="flex justify-center items-center gap-1 flex-col ">
          <CiLocationOn color="white" size={32} />
          <div>
            <p className="text-slate-50 text-2xl sm:text-lg md:text-xl lg:text-2xl xl:text-2xl">
              {city}
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center mt-10">
          <div className="text-8xl text-slate-50">{temp}</div>
        </div>
        <div className="flex flex-col justify-center lg:gap-2 xl:gap-2 gap-4">
          <div className="flex justify-center items-center self-center lg:gap-1 xl:gap-1 sm:gap-4 md:gap-4">
            <Image alt={`${condition}`} src={logo} width={64} height={64} />
            <p className="text-slate-50 text-lg md:text-lg lg:text-xl xl:text-xl font-light">
              {condition}
            </p>
          </div>
          <div className="flex self-center gap-2 lg:pt-5 xl:pt-5">
            <CiCalendar color="white" size={24} />
            <p className="text-slate-50 s text-lg md:text-lg lg:text-xl xl:text-xl">
              {date}
            </p>
          </div>
        </div>
      </>
    </div>
  );
};

export default SideDetailsMainInfo;
