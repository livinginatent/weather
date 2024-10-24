import { AQIWeeklyT } from "@/lib/types";
import { formatTextValue } from "@/utils/formatTextValue";
import { getAQIColor } from "@/utils/getAQIColor";
import { getIcon } from "@/utils/getIcon";
import Image from "next/image";
import React from "react";

const AQIWeekly = ({ forecastData }: AQIWeeklyT) => {
    const weekdaysAz = [
      "Bazar günü", // Sunday
      "Bazar ertəsi", // Monday
      "Çərşənbə axşamı", // Tuesday
      "Çərşənbə", // Wednesday
      "Cümə axşamı", // Thursday
      "Cümə", // Friday
      "Şənbə", // Saturday
    ];
  const formattedData = forecastData.forecast.forecastday.map((day) => {
    const dateObj = new Date(day.date);
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

    const aqi = day.day.air_quality["us-epa-index"];
    const localIconPath = getIcon(day.day.condition.icon);
    const temp = Math.round(day.day.maxtemp_c);
    const windSpeed = Math.round(day.day.maxwind_kph);

    return {
      date: dayOfTheWeekCapitalized,
      aqi,
      localIconPath,
      temp,
      windSpeed,
    };
  });
    
  const numOfDays = forecastData.forecast.forecastday.filter(
    (day) => day.day.air_quality["us-epa-index"] !== undefined
  ).length;
  
  return (
    <div className="w-full h-full lg:p-6 xl:p-6 mb-6">
      <h2 className="font-bold text-center text-xl">
        Növbəti Günlərdə Hava Keyfiyyəti
      </h2>
      <div className="grid grid-cols-5 mb-4 w-full text-center font-bold mt-4  ">
        <p className="py-2">Tarix</p>
        <p className="py-2">Hava Keyfiyyəti</p>
        <p className="py-2">Hava</p>
        <p className="py-2">Tempratur</p>
        <p className="py-2">Külək</p>
      </div>

      <div className="grid rounded-md   bg-[#ffffff]    h-full">
        {formattedData.slice(0, numOfDays).map((day, index) => (
          <div
            key={index}
            className="grid grid-cols-5 text-center border-b-2 border-slate-200 justify-center items-center"
          >
            
            <p className="py-2">{day.date}</p>

            <div
              style={{ backgroundColor: getAQIColor(day.aqi) }}
              className="w-full flex py-2 justify-center items-center rounded-sm mb-2"
            >
              {formatTextValue(day.aqi)}
            </div>

            <div className="py-2 flex justify-center items-center">
              <Image
                alt={`weather`}
                src={day.localIconPath}
                width={48}
                height={48}
              />
            </div>

            <p className="py-2">{`${day.temp}C°`}</p>

            <p className="py-2">{`${day.windSpeed} km/saat`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AQIWeekly;
