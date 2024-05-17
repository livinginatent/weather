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
    <Card className="h-[195px] w-80 rounded-2xl">
      <CardHeader className="p-0 m-4">
        <CardTitle className="text-base p-0 mt-[-10px] font-semibold flex justify-between">
          Külək
          {<BsWind style={{ marginBottom: 2 }} color="#77bae8" size={30} />}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-center p-0 text-xl font-bold items-center">
        <GaugeComponent
          type="semicircle"
         
          arc={{
            width: 0.2,
            padding: 0.005,
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
            // elastic: true,
          }}
          labels={{
            valueLabel: {
              formatTextValue: (value) => value + "km/saat",
              style: {
                fontSize: "32px",
                fill: "#454545",
              },
            },
            tickLabels: {
              type: "outer",
              valueConfig: {
                formatTextValue: (value) => value + "ºB",
                fontSize: 10,
              },
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
