import { MainContainerT } from "@/lib/types";
import React from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { airQualityExplanations } from "@/utils/airQualityExplanations";

const MainContainer = ({ title, icon, value, unit }: MainContainerT) => {
  const info = <IoInformationCircleOutline size={16} color="white" />;

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

  return (
    <div className="flex flex-col mt-6 items-center gap-4 h-36 bg-[#2e312e] rounded-xl relative">
      <div className="flex p-2 mt-2 self-start items-center justify-center gap-2">
        {icon}
        <p className="text-xl text-white">{`${title}`}</p>
      </div>

      {/* Value and unit section */}
      <div className="flex p-2 w-2/3 h-12 justify-center items-center bg-[#93cc4b] rounded-3xl">
        <p className="text-lg">{`${value} ${unit}`}</p>
      </div>

      <Popover >
        <PopoverTrigger asChild>
          <div className="absolute bottom-2 right-2 cursor-pointer">{info}</div>
        </PopoverTrigger>
        <PopoverContent className="">
          <p className="p-2">{getDescription(title)}</p>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default MainContainer;
