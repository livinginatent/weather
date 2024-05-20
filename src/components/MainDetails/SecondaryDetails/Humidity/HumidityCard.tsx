import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import { MdOutlineWaterDrop } from "react-icons/md";
import ProgressBar from "@/components/ui/ProgressBar/ProgressBar";
import { Humidity } from "@/lib/types";
import { categorizeHumidity } from "@/utils/categorizeHumidity";

const HumidityCard = ({ humidity }: Humidity) => {
  const humidityLevel = categorizeHumidity(humidity)
  return (
    <Card className="h-[195px] w-80 rounded-2xl">
      <CardHeader className="p-0 m-4">
        <CardTitle className="text-base p-0 mt-[-10px] font-semibold flex justify-between">
          {
            <MdOutlineWaterDrop
              style={{ marginBottom: 2 }}
              color="#77bae8"
              size={30}
            />
          }
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-center gap-8 p-0 text-xl font-bold items-center">
        <div className="flex gap-1 justify-center items-center">
          <p className="text-xl">{`${humidity}%`}</p>
          <p className="text-sm text-center font-normal">{humidityLevel}</p>
        </div>
        <ProgressBar width="40%" value={humidity} color="#77bae8" />
      </CardContent>
    </Card>
  );
};

export default HumidityCard;
