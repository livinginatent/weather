import { MainContainerT } from "@/lib/types";
import React from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { airQualityExplanations } from "@/utils/airQualityExplanations";
import { formatTextValue } from "@/utils/formatTextValue";

const MainContainer = ({ title, icon, value, unit }: MainContainerT) => {
  const info = <IoInformationCircleOutline size={16} color="black" />;

  const getDescription = (title: string) => {
    switch (title) {
      case "PM2.5 (Çirkli partikullar)":
        return airQualityExplanations.pm2_5.description;
      case "Karbon Monoksid (CO)":
        return airQualityExplanations.co.description;
      case "Azot Dioksid (NO₂)":
        return airQualityExplanations.no2.description;
      case "Hava Keyfiyyəti İndeksi":
        return airQualityExplanations.us_epa_index.description;
      default:
        return "No description available.";
    }
  };

  const getBackgroundColor = (title: string, value: number) => {
    switch (title) {
      case "PM2.5 (Çirkli partikullar)":
        if (value <= 12) return "#24ce11";
        if (value <= 35) return "#FFCC00";
        if (value <= 55) return "#FF9900";
        return "#FF0000";

      case "Karbon Monoksid (CO)":
        if (value <= 4.4) return "#24ce11";
        if (value <= 9.4) return "#FFCC00";
        if (value <= 12.4) return "#FF9900";
        return "#FF0000";

      case "Azot Dioksid (NO₂)":
        if (value <= 53) return "#24ce11";
        if (value <= 100) return "#FFCC00";
        if (value <= 360) return "#FF9900";
        return "#FF0000";

      case "Hava Keyfiyyəti İndeksi":
        if (value === 1) return "#24ce11";
        if (value === 2) return "#FFCC00";
        if (value === 3) return "#FF9900";
        if (value === 4) return "#ff3700";
        if (value === 5) return "#ff2200";
        return "#FF0000";
      default:
        return "#24ce11";
    }
  };

  return (
    <div className="flex flex-col mt-6 items-center gap-4 h-36 bg-[#ffffff] rounded-xl relative">
      <div className="flex p-2 mt-2 self-start items-center justify-center gap-2">
        {icon}
        <p className="text-xl text-black">{`${title}`}</p>
      </div>

      <div
        className="flex p-2 w-2/3 h-14 justify-center items-center rounded-3xl"
        style={{ backgroundColor: getBackgroundColor(title, value) }}
      >
        <p className="text-lg flex justify-center items-center gap-2">
          {`${title === "Hava Keyfiyyəti İndeksi" ? ` ${value} ` : value} `}
          {title === "Hava Keyfiyyəti İndeksi" && (
            <span style={{ fontSize: "0.75em" }}>
              ({formatTextValue(value)})
            </span>
          )}
          {` ${unit}`}
        </p>
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <div className="absolute bottom-2 right-2 cursor-pointer">{info}</div>
        </PopoverTrigger>
        <PopoverContent>
          <p className="p-2">{getDescription(title)}</p>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default MainContainer;
