import MonthlyForecast from "@/components/MonthlyForecast/MonthlyForecast";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Aylıq Hava Proqnozu | Bakı 10 Günlük Hava Proqnozu - Havam.az",
  description:
    "Bakı və Azərbaycanda aylıq hava proqnozu. Ən dəqiq və etibarlı aylıq hava proqnozu artıq sizlərlə. Havam.az ilə 10 günlük hava proqnozu.",
};

type Props = {};

const Monthly = (props: Props) => {
  return (
    <div className="flex  flex-col items-center justify-center gap-4">
      <MonthlyForecast />
    </div>
  );
};

export default Monthly;
