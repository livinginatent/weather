import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import { TbUvIndex } from "react-icons/tb";
import ProgressBar from "@/components/ui/ProgressBar/ProgressBar";
import { UVIndex } from "@/lib/types";
import { categorizeUVIndex } from "@/utils/categorizeUvIndex";

const UVIndexCard = ({ UVindex }: UVIndex) => {
  const ranges = ["0-2", "3-5", "6-7", "8-10", "11+"];

  const calculateProgressBarWidth = (index:number, UVindex:number) => {
    const thresholds = [0, 2, 5, 7, 10,11];
    if (UVindex >= thresholds[index + 1]) {
      return 100;
    } else if (UVindex > thresholds[index] && UVindex < thresholds[index + 1]) {
      return (
        ((UVindex - thresholds[index]) /
          (thresholds[index + 1] - thresholds[index])) *
        100
      );
    } else {
      return 0;
    }
  };

  const UVIndexLevel = categorizeUVIndex(UVindex)

  return (
    <Card className="h-[195px] w-80 rounded-2xl ">
      <CardHeader className="p-0 m-4">
        <CardTitle className="text-base p-0 mt-[-10px] font-semibold flex justify-between">
          Ultrabənövşəyi İndeks
          {<TbUvIndex style={{ marginBottom: 2 }} color="#77bae8" size={32} />}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-center gap-8 p-0 text-xl font-bold items-center">
        <div className="flex gap-1 justify-center items-center">
          <p>{`${UVindex}`}</p>
          <p className="text-sm text-center font-normal">{UVIndexLevel}</p>
        </div>
        <div className="flex justify-center items-center w-full gap-1">
          {ranges.map((range, index) => (
            <ProgressBar
              key={index}
              width="12%"
              value={calculateProgressBarWidth(index, UVindex)}
              color="#77bae8"
              range={range}
              type="UV"
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UVIndexCard;
