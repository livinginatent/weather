import React from "react";
import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card";
import { BsWind } from "react-icons/bs";
import dynamic from "next/dynamic";
import { Wind } from "@/lib/types";
const GaugeComponent = dynamic(() => import("react-gauge-component"), {
  ssr: false,
});

const AirQualityCard = (airQuality: number) => {
  return (
    <Card className="h-[195px] w-80 rounded-2xl">
      <CardHeader className="p-0 m-4">
        <CardTitle className="text-base p-0 mt-[-10px] font-semibold flex justify-between">
          Hava Keyfiyyəti
          {<BsWind style={{ marginBottom: 2 }} color="#77bae8" size={30} />}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-center p-0 text-xl font-bold items-center">
        <GaugeComponent
          id="gauge-component4"
          arc={{
            gradient: true,
            width: 0.15,
            padding: 0,
            subArcs: [
              {
                limit: 15,
                color: "#EA4228",
                showTick: true,
              },
              {
                limit: 37,
                color: "#F5CD19",
                showTick: true,
              },
              {
                limit: 58,
                color: "#5BE12C",
                showTick: true,
              },
              {
                limit: 75,
                color: "#F5CD19",
                showTick: true,
              },
              { color: "#EA4228" },
            ],
          }}
          value={50}
          pointer={{ type: "arrow", elastic: true }}
        />
      </CardContent>
    </Card>
  );
};

export default AirQualityCard;
