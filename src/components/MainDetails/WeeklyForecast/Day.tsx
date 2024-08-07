import { conditionTranslations } from "@/lib/conditionTranslations";
import Image from "next/image";
import React from "react";
import { FaWind } from "react-icons/fa6";
import { getIcon } from "@/utils/getIcon";
import { ClipLoader } from "react-spinners";

const Day = ({ day, logo, loading }: any) => {
  const conditionText = day.day.condition.text.trim();
  const condition = conditionTranslations[conditionText] || conditionText;

  const date = new Date(day.date).toLocaleDateString("az-AZ", {
    day: "2-digit",
    month: "long",
  });

  const dayOfTheWeek = new Date(day.date).toLocaleDateString("az-AZ", {
    weekday: "short",
  });

  const maxTemp = Math.round(day.day.maxtemp_c);
  const minTemp = Math.round(day.day.mintemp_c);
  const wind = Math.round(day.day.maxwind_kph);

  const windIcon = <FaWind color="#686D76" />;

  const localIconPath = getIcon(day.day.condition.icon);

  return (
    <div className="flex flex-col items-center justify-center w-32 py-4 border-b-2 border-[#eceeff] lg:border-b-0 lg:border-r-2 xl:border-r-2 gap-2">
      <p className="h-8 text-center font-medium">{date}</p>
      <p className="h-8 text-center font-normal text-slate-400">
        {dayOfTheWeek}
      </p>
      <Image alt={`${logo}`} src={localIconPath} width={48} height={48} />
      <div className="flex gap-2">
        <p className="font-semibold">{`${maxTemp}°`}</p>
        <p className="font-extralight mt-2">{`${minTemp}°`}</p>
      </div>
      <p className="font-light text-slate-400 text-center h-8 flex ">
        {condition}
      </p>
      <p className="self-start font-thin ml-2 flex justify-center items-center">
        {windIcon} {wind} km/saat
      </p>
    </div>
  );
};

export default Day;
