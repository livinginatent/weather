import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import { MdOutlineWaterDrop } from "react-icons/md";
import ProgressBar from "@/components/ui/ProgressBar/ProgressBar";
import { FeelsLike } from "@/lib/types";

const FeelsLikeCard = ({ feelsLike }: FeelsLike) => {
  const ranges = ["0", "25", "50"];
  return (
    <Card className="h-[195px] w-80 rounded-2xl">
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
      <CardContent className="flex flex-col justify-center gap-8 p-0 text-xl font-bold items-center">
        <div className="flex gap-1 justify-center items-center">
          <p className="text-xl">{`${feelsLike}C°`}</p>
        </div>
        <div className="flex justify-center items-center w-full gap-1">
          <ProgressBar
            value={34}
            width="70%"
            color="#77bae8"
            type="feelsLike"
            range={ranges}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default FeelsLikeCard;
