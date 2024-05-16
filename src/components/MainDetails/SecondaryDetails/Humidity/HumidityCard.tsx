import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import { MdOutlineWaterDrop } from "react-icons/md";
import ProgressBar from "@/components/ui/ProgressBar/ProgressBar";
import { Humidity } from "@/lib/types";

const HumidityCard = ({ humidity }: Humidity) => {
  return (
    <Card className="min-h-32 w-96 rounded-2xl">
      <CardHeader className="p-0 m-4">
        <CardTitle className="text-base p-0 mt-[-10px] font-semibold flex justify-between">
          Nəmişlik
          {
            <MdOutlineWaterDrop
              style={{ marginBottom: 2 }}
              color="#77bae8"
              size={30}
            />
          }
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-center p-0 text-xl font-bold items-center">
        <div className="flex gap-1 justify-center items-center">
          <p>{`${humidity}%`}</p>
          <p className="text-base font-normal">çox</p>
        </div>
        <ProgressBar width="40%" value={humidity} color="#5c9ce5" />
      </CardContent>
    </Card>
  );
};

export default HumidityCard;
