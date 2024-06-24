import { conditionTranslations } from "@/lib/conditionTranslations";
import { DailyForecastData, DailyForecastT } from "@/lib/types";
import Image from "next/image";
import React from "react";
import { IoSunnyOutline } from "react-icons/io5";

const Day = ({ day, logo }: any) => {
  const sunIcon = <IoSunnyOutline />;

  const getWeekday = (dateString: string): string => {
    const date = new Date(dateString);
    const days = [
      "Bazar",
      "Bazar ertəsi",
      "Çərşənbə axşamı",
      "Çərşənbə",
      "Cümə axşamı",
      "Cümə",
      "Şənbə",
    ];
    return days[date.getDay()];
  };

  const weekDay = getWeekday(day.date);
  const conditionText = day.day.condition.text;
  const condition = conditionTranslations[conditionText] || conditionText;

  return (
    <div className="border-r-2 border-[#eceeff] gap-2 flex flex-col w-32 border-indigo-500 items-center justify-center py-4">
      <p className="h-8 text-center">{weekDay}</p>
      <Image alt={`${logo}`} src={logo} width={48} height={48} />
      <p>{`${day.day.maxtemp_c}C`}</p>
      <p className="font-light text-slate-400 text-center h-8 flex items-center justify-center">
        {condition}
      </p>
    </div>
  );
};

export default Day;
