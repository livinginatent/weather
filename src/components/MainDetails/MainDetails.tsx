"use client";
import React from "react";
import { BarChart } from "@mui/x-charts";
import DailyForecast from "./DailyForecast/DailyForecast";
type Props = {};

const MainDetails = (props: Props) => {
  return (
    <section className="bg-[#e4f1ff] flex flex-col items-start justify-start w-full h-screen rounded-l-[30px] px-8">
      <h1 className="font-normal mt-10 text-xl self-start">
        Həftəlik və günlük hava proqnozu
      </h1>
      <DailyForecast />
    </section>
  );
};

export default MainDetails;
