"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A bar chart with an active bar";

const chartData = [
  { browser: "chrome", visitors: 187, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 275, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
];
const getAQIColor = (aqi: number) => {
  if (aqi <= 50) return "#00e400"; // Good (Green)
  if (aqi <= 100) return "#FCDE70"; // Moderate (Yellow)
  if (aqi <= 150) return "#ff7e00"; // Unhealthy for Sensitive Groups (Orange)
  if (aqi <= 200) return "#ff0000"; // Unhealthy (Red)
  if (aqi <= 300) return "#8f3f97"; // Very Unhealthy (Purple)
  return "#7e0023"; // Hazardous (Maroon)
};

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: getAQIColor(32),
  },
  safari: {
    label: "Safari",
    color: getAQIColor(45),
  },
  firefox: {
    label: "Firefox",
    color: getAQIColor(65),
  },
  edge: {
    label: "Edge",
    color: getAQIColor(85),
  },
  other: {
    label: "Other",
    color: getAQIColor(105),
  },
} satisfies ChartConfig;

export function ForecastChart() {
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
              dataKey="browser"
              tickLine={false}
              tickMargin={10}
              axisLine={true}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="visitors"
              strokeWidth={2}
              radius={8}
              activeIndex={2}
              barSize={120}
              activeBar={({ ...props }) => {
                return (
                  <Rectangle
                    {...props}
                    fillOpacity={0.8}
                    stroke={props.payload.fill}
                    strokeDasharray={4}
                    strokeDashoffset={4}
                  />
                );
              }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
