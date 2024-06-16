import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card";
import { Astro } from "@/lib/types";
import { calculateDayLength } from "@/utils/calculateDayLength";
import React from "react";
import { FiSunrise, FiSunset } from "react-icons/fi";
import { GoSun } from "react-icons/go";
import { PiSunDuotone } from "react-icons/pi";


const SunTimes = ({sunrise,sunset}:Astro) => {
      const dayLength = calculateDayLength(sunrise,sunset);

  return (
    <Card className="h-[195px]   rounded-2xl">
      <CardHeader className="p-0 m-4">
        <CardTitle className="text-base p-0 mt-[-10px] font-semibold flex justify-between">
          Gün doğumu və batımı
          {
            <PiSunDuotone
              style={{ marginBottom: 2 }}
              color="#77bae8"
              size={30}
            />
          }
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col  gap-8 p-0 text-xl font-bold">
        <div className="flex flex-col gap-2 ">
          <div className="flex gap-2 justify-between items-center">
            <GoSun color="#FFDA78" style={{ marginLeft: 10 }} size={30} />
            <p className="text-base font-normal m-2">{dayLength}</p>
          </div>
          <div className="flex gap-2 justify-between items-center">
            <FiSunrise color="#FFDA78" style={{ marginLeft: 10 }} size={30} />
            <p className="text-base font-normal m-2">{sunrise}</p>
          </div>
          <div className="flex gap-2 justify-between items-center">
            <FiSunset color="#535C91" style={{ marginLeft: 10 }} size={30} />
            <p className="text-base font-normal m-2">{sunset}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SunTimes;
