import Image from "next/image";

export const WeatherIconLabel = ({ x, y,icon,value }: any) => (
  <g transform={`translate(${x - 12},${y - 60})`}>
    <foreignObject width={30} height={30}>
      <Image
        alt="test"
        width={64}
        height={64}
        src={value}
      />
    </foreignObject>
  </g>
);

export const TimeLabel = ({ x, y, value }: any) => (
  <g transform={`translate(${x - 12},${y - 65})`}>
    <text className="text-[10px] md:text-[14px] lg:text-[16px] xl:text-[18px]" >{value}</text>
  </g>
);

export const TempLabel = ({ x, y, value }: any) => (
  <g transform={`translate(${x - 8},${y - 15})`}>
    <text fontSize={12}>{`${value}C`}</text>
  </g>
);
