"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ForecastChartT } from "@/lib/types";
import { formatTextValue } from "@/utils/formatTextValue";
import config from "../../../../tailwind.config";
import { getAQIColor } from "@/utils/getAQIColor";

export const description = "A bar chart with an active bar";

const getDayLabel = (index: number) => {
  if (index === 0) return "Sabah";
  const date = new Date();
  date.setDate(date.getDate() + index + 1);
  if (window.innerWidth < 768) {
    return date.toLocaleDateString("az-AZ", {
      month: "short",
      day: "numeric",
    });
  } else {
    return date.toLocaleDateString("az-AZ", {
      weekday: "short",
      month: "long",
      day: "numeric",
    });
  }
};
// Get the color based on AQI value

export function ForecastChart({ forecastData }: ForecastChartT) {
  const days = forecastData.forecast.forecastday;
  const getAQIHeight = (aqi: number) => {
    if (aqi === 1) return 6;
    if (aqi === 2) return 5;
    if (aqi === 3) return 4;
    if (aqi === 4) return 3;
    if (aqi === 5) return 2;
    return 1;
  };

  const chartData = days.slice(0, 4).map((day, index) => {
    const aqi =
      forecastData.forecast.forecastday[index].day.air_quality["us-epa-index"];
    return {
      day: getDayLabel(index),
      air_quality: aqi,
      inverted_aqi: getAQIHeight(aqi),
      fill: getAQIColor(aqi),
    };
  });

  const chartConfig = {
    inverted_aqi: {
      label: "Hava keyfiyyəti: ",
    },
  } satisfies ChartConfig;

  return (
    <Card className=" bg-transparent border-none lg:w-3/4 xl:w-2/3">
      <CardHeader>
        <CardTitle className="self-center">
          Növbəti günlərdə hava keyfiyyəti
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full ">
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={true}
              tickFormatter={(value) => value}
              interval={0} // Show all labels, no skipping
              height={50} // Adjust height to fit rotated labels
              style={{
                fontSize: window.innerWidth < 768 ? "12px" : "14px",
              }}
            />
            <ChartTooltip cursor={false} content={<CustomTooltip />} />
            <Bar
              dataKey="inverted_aqi"
              strokeWidth={2}
              radius={[10, 10, 0, 0]}
              barSize={120}
            >
             
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

// Custom tooltip component
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-zinc-50 p-2 rounded-sm">
        <p>{`Hava keyfiyyəti: ${formatTextValue(
          payload[0].payload.air_quality
        )}`}</p>
      </div>
    );
  }

  return null;
};
