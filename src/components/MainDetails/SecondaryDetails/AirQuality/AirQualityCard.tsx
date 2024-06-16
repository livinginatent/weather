import React from "react";
import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card";
import { BsWind } from "react-icons/bs";
import dynamic from "next/dynamic";
import { AirQuality } from "@/lib/types";
import { LuCross } from "react-icons/lu";

const GaugeComponent = dynamic(() => import("react-gauge-component"), {
  ssr: false,
});

const AirQualityCard = ({ airQuality }: { airQuality: AirQuality }) => {
  const formatTextValue = (value: number) => {
   const valueTextMap: { [key: number]: string } = {
     1: "Yaxşı",
     2: "Orta",
     3: "Həssas Qruplar üçün Zərərli",
     4: "Zərərli",
     5: "Çox Zərərli",
     6: "Təhlükəli",
   };
    return valueTextMap[value] || value;
  };

  return (
    <Card className="h-[195px]  rounded-2xl">
      <CardHeader className="p-0 m-4">
        <CardTitle className="text-base p-0 mt-[-10px] font-semibold flex justify-between">
          Hava Keyfiyyəti
          {<LuCross style={{ marginBottom: 2 }} color="#77bae8" size={30} />}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-center p-0 text-xl font-bold items-center">
        <p>{formatTextValue(airQuality["us-epa-index"])}</p>
        <div className="relative">
          <GaugeComponent
            type="semicircle"
            arc={{
              padding: 0.02,
              nbSubArcs: 6,
              cornerRadius: 4,
              subArcs: [
                { limit: 1, color: "#9ADE7B", showTick: true },
                { limit: 2, color: "#C3FF93", showTick: true },
                { limit: 3, color: "#FFC100", showTick: true },
                { limit: 4, color: "#FF8A08", showTick: true },
                { limit: 5, color: " #FF6500", showTick: true },
                { limit: 6, color: "#C40C0C", showTick: true },
              ],
            }}
            pointer={{
              color: "#77bae8",
              length: 0.7,
              width: 12,
              animate: true,
              type: "blob",
            }}
            value={airQuality["us-epa-index"]}
            minValue={1}
            maxValue={6}
            style={{ marginTop: "-30px" }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AirQualityCard;
