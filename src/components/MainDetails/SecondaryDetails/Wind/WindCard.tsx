import React from "react";
import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card";
import { BsWind } from "react-icons/bs";
import GaugeComponent from "react-gauge-component";
type Props = {};

const WindCard = (props: Props) => {
  return (
    <Card className="min-h-32 w-96 rounded-2xl">
      <CardHeader className="p-0 m-4">
        <CardTitle className="text-base p-0 mt-[-10px] font-semibold flex justify-between">
          Külək
          {<BsWind style={{ marginBottom: 2 }} color="#77bae8" size={30} />}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-center p-0 text-xl font-bold items-center">
        <div className="w-3/4">
          <GaugeComponent
            type="semicircle"
            arc={{
              width: 0.2,
              padding: 0.005,
              cornerRadius: 5,

              subArcs: [
                {
                  color: "#77bae8",
                  showTick: true,
                },
                {
                  color: "#77bae8",
                  showTick: true,
                },
                {
                  color: "#77bae8",
                  showTick: true,
                },
                {
                  color: "#77bae8",
                  showTick: true,
                },
                {
                  color: "#77bae8",
                  showTick: true,
                },
              ],
            }}
            pointer={{
              color: "#345243",
              length: 0.8,
              width: 15,
            }}
           
            value={22.5}
            minValue={0}
            maxValue={100}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default WindCard;
