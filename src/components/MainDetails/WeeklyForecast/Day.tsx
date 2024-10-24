import { conditionTranslations } from "@/lib/conditionTranslations";
import Image from "next/image";
import React from "react";
import { FaWind } from "react-icons/fa6";
import { getIcon } from "@/utils/getIcon";
import { ClipLoader } from "react-spinners";

const Day = ({ day, logo, loading }: any) => {
  const weekdaysAz = [
    "Bazar günü", // Sunday
    "Bazar ertəsi", // Monday
    "Çərşənbə axşamı", // Tuesday
    "Çərşənbə", // Wednesday
    "Cümə axşamı", // Thursday
    "Cümə", // Friday
    "Şənbə", // Saturday
  ];

  const conditionText = day.day.condition.text.trim();
  const condition = conditionTranslations[conditionText] || conditionText;

  // Create a Date object from the day.date string
  const dateObj = new Date(day.date);

  // Get the numeric day and month
  const dayOfMonth = dateObj.getDate(); // Day of the month (1-31)
  const month = dateObj.getMonth() + 1; // Month (1-12), add 1 because getMonth() returns 0-11

  // Format the date as "DD/MM"
  const dateCustom = `${dayOfMonth}/${month}`;

  // Get the day index (0 for Sunday, 6 for Saturday)
  const dayIndex = dateObj.getDay();

  // Get the weekday in Azerbaijani from the array
  const dayOfTheWeekAz = weekdaysAz[dayIndex];

  function capitalizeWords(str: string) {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  const dayOfTheWeekCapitalized = capitalizeWords(dayOfTheWeekAz);
  const maxTemp = Math.round(day.day.maxtemp_c);
  const minTemp = Math.round(day.day.mintemp_c);
  const wind = Math.round(day.day.maxwind_kph);

  const windIcon = <FaWind color="#686D76" />;
  const localIconPath = getIcon(day.day.condition.icon);

  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-2 items-center justify-evenly w-full p-2 py-4 border-b-2 border-[#eceeff]">
      <p className="col-span-2 md:col-span-1 text-center">{dateCustom}</p>
      <p className="col-span-2 md:col-span-1 text-center">
        {dayOfTheWeekCapitalized}
      </p>
      <div className="col-span-2 md:col-span-1 flex justify-center items-center text-center">
        <Image alt={`${logo}`} src={localIconPath} width={48} height={48} />
      </div>
      <p className="col-span-2 md:col-span-1 text-center">{condition}</p>
      <p className="col-span-2 md:col-span-1 text-center">{`${maxTemp}° / ${minTemp}°`}</p>
      <p className="col-span-2 md:col-span-1 flex justify-center items-center text-center">
        {windIcon} {wind} <span className="ml-1">km/saat</span>
      </p>
    </div>
  );
};

export default Day;
