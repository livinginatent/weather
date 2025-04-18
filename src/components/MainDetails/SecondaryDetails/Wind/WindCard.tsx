import React from "react";
import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card";
import { BsWind } from "react-icons/bs";
import dynamic from "next/dynamic";
import { Wind } from "@/lib/types";
const GaugeComponent = dynamic(() => import("react-gauge-component"), {
  ssr: false,
});

const WindCard = ({ wind }: Wind) => {
  return (
    <Card className="h-[195px]  rounded-2xl">
      <CardHeader className="p-0 m-4">
        <CardTitle className="text-base p-0 font-semibold flex justify-between">
          Külək sürəti
          {<BsWind style={{ marginBottom: 2 }} color="#77bae8" size={30} />}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex mt-[-10px] flex-col justify-center p-0 text-xl font-bold items-center">
        <GaugeComponent
          type="semicircle"
          arc={{
            width: 0.2,
            padding: 0.004,
            cornerRadius: 4,
            nbSubArcs: 5,
            subArcs: [
              {
                color: "#77bae8",
              },
              {
                color: "#77bae8",
              },
              {
                color: "#77bae8",
              },
              {
                color: "#77bae8",
              },
            ],
          }}
          pointer={{
            color: "#77bae8",
            length: 0.7,
            width: 12,
            animate: true,
          }}
          labels={{
            valueLabel: {
              formatTextValue: (value) => value + "km/saat",
              style: {
                fontSize: "36px",
                textShadow:"none",
                fill:'black'
                
              },
            },
            tickLabels: {
              type: "outer",

              ticks: [
                { value: 30 },
                { value: 50 },
                { value: 70 },
                { value: 90 },
              ],
            },
          }}
          minValue={10}
          maxValue={110}
          value={wind}
        />
      </CardContent>
    </Card>
  );
};

export default WindCard;
