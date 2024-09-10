import { AQIWeeklyT } from "@/lib/types";
import { formatTextValue } from "@/utils/formatTextValue";
import { getAQIColor } from "@/utils/getAQIColor";
import { getIcon } from "@/utils/getIcon";
import Image from "next/image";
import React from "react";

const AQIWeekly = ({ forecastData }: AQIWeeklyT) => {
  const formattedData = forecastData.forecast.forecastday.map((day) => {
    const date = new Date(day.date).toLocaleDateString("az-AZ", {
      day: "numeric",
      month: "numeric",
    });

    const dayOfTheWeek = new Date(day.date).toLocaleDateString("az-AZ", {
      weekday: "long",
    });

    function capitalizeWords(str: string) {
      return str
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }

    const dayOfTheWeekCapitalized = capitalizeWords(dayOfTheWeek);

    const aqi = day.day.air_quality["us-epa-index"];
    const localIconPath = getIcon(day.day.condition.icon);
    const temp = Math.round(day.day.avgtemp_c);
    const windSpeed = Math.round(day.day.maxwind_kph)

    return {
      date: dayOfTheWeekCapitalized,
      aqi,
      localIconPath,
      temp,
      windSpeed
    };
  });

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

      <div className="grid rounded-md  bg-[#ffffff]    h-full">
        {formattedData.slice(0, 5).map((day, index) => (
          <div
            key={index}
            className="grid grid-cols-5 text-center justify-center items-center"
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
