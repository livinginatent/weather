import React from "react";

import { AirQuality } from "@/lib/types";
import { LuCross } from "react-icons/lu";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import { ChartConfig } from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { HoverInfo } from "@/components/HoverInfo/HoverInfo";
import { formatTextValue } from "@/utils/formatTextValue";

const AirQualityCard = ({ airQuality }: { airQuality: AirQuality }) => {
  const getGradientColor = (index: number) => {
    const colors = [
      "#00FF00", // Green
      "#7FFF00", // Chartreuse
      "#FFB200", // Yellow
      "#FF7F00", // Orange
      "#e0582e", // Red
      "#FF0000", // Dark Red
    ];
  
    return colors[index - 1];
  };
  const chartData = [
    {
      airQuality: airQuality["us-epa-index"],
      fill: getGradientColor(airQuality["us-epa-index"]),
    },
  ];

  const chartConfig = {
    airQuality: {
      label: "airQuality",
      color: getGradientColor(airQuality["us-epa-index"]),
    },
  } satisfies ChartConfig;



  return (
    <Card className="h-[195px] rounded-2xl">
      <CardHeader className="p-0 m-4">
        <CardTitle className="text-base p-0  font-semibold flex justify-between">
          <div className="flex justify-center items-center gap-2 ">
            <p>Hava keyfiyyəti</p>
             {/*  <HoverInfo title="test" info="test" /> */}
          </div>
          {<LuCross style={{ marginBottom: 2 }} color="#77bae8" size={30} />}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex h-[150px] mt-[-14px]">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-h-[160px] self-center "
        >
          <RadialBarChart
            data={chartData}
            startAngle={90}
            endAngle={-270}
            innerRadius={70}
            outerRadius={100}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[66, 54]}
            />
            <RadialBar
              dataKey="airQuality"
              background
              cornerRadius={10}
              data={chartData}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {airQuality["us-epa-index"]}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 18}
                          className="fill-muted-foreground"
                        >
                          {formatTextValue(airQuality["us-epa-index"])}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
            
    </Card>
  );
};

export default AirQualityCard;
