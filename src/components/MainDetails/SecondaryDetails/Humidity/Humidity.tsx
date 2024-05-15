import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import React, { useState } from "react";
import { WiHumidity } from "react-icons/wi";
import { MdOutlineWaterDrop } from "react-icons/md";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import { Box, Typography } from "@mui/material";
type Props = {};

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const Humidity = (props: Props) => {
     const [progress, setProgress] = useState(10);

     React.useEffect(() => {
       const timer = setInterval(() => {
         setProgress((prevProgress) =>
           prevProgress >= 100 ? 10 : prevProgress + 10
         );
       }, 1200);
       return () => {
         clearInterval(timer);
       };
     }, []);
  return (
    <Card className="min-h-32 w-96 rounded-2xl">
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
      <CardContent className="flex flex-col justify-center p-0 text-xl font-bold items-center">
        <p>82% - Çox</p>

        {/*  <BarChart layout="horizontal" width={70} height={20} data={data}>
          <Bar  radius={5} dataKey="value" fill="#77bae8" />
        </BarChart> */}
        {/* <Box sx={{ width: "100%" }}>
          <LinearProgress value={20} /> 
        </Box> */}
      </CardContent>
    </Card>
  );
};

export default Humidity;
