import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card";
import { Astro, HourlyWeatherDataT } from "@/lib/types";
import { calculateDayLength } from "@/utils/calculateDayLength";
import React from "react";
import { FiSunrise, FiSunset } from "react-icons/fi";
import { GoSun } from "react-icons/go";
import { CgDetailsMore } from "react-icons/cg";
import { WindDirection, windDirectionTranslations } from "@/utils/windDirections";

const ExtraDetailsCard = ({ current }: HourlyWeatherDataT) => {
const getAzeriWindDirection = (direction: string): any => {
  return windDirectionTranslations[direction];
};
  return (
    <Card className="h-[195px] w-80 rounded-2xl">
      <CardHeader className="p-0 m-4">
        <CardTitle className="text-base p-0 mt-[-10px] font-semibold flex justify-between">
          Əlavə detallar
          {
            <CgDetailsMore
              style={{ marginBottom: 2 }}
              color="#77bae8"
              size={30}
            />
          }
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col  gap-8 p-0 text-xl font-bold">
        <div className="flex flex-col gap-1 ">
          <div className="flex gap-1 justify-between items-center">
            <p className="text-base font-normal m-2">Atmosfer təzyiqi</p>
            <p className="text-base font-normal m-2">{`${current.pressure_mb} mm.c.s`}</p>
          </div>
          <div className="flex gap-2 justify-between items-center">
            <p className="text-base font-normal m-2">Görüş məsafəsi</p>
            <p className="text-base font-normal m-2">{`${current.vis_km} km`}</p>
          </div>
          <div className="flex gap-2 justify-between items-center">
            <p className="text-base font-normal m-2">Külək istiqaməti</p>
            <p className="text-base font-normal m-2">{`${getAzeriWindDirection(
              current.wind_dir
            )}`}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExtraDetailsCard;
