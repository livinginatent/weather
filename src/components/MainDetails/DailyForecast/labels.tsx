import { IoSunnyOutline } from "react-icons/io5";

export const SunIconLabel = ({ x, y }: any) => (
  <g transform={`translate(${x - 8},${y - 50})`}>
    <IoSunnyOutline style={{ marginBottom: 20 }} size={20} />
  </g>
);

export const TimeLabel = ({ x, y, value }: any) => (
  <g transform={`translate(${x - 12},${y - 65})`}>
    <text fontSize={14}>{value}</text>
  </g>
);

export const TempLabel = ({ x, y, value }: any) => (
  <g transform={`translate(${x - 8},${y - 15})`}>
    <text fontSize={12}>{`${value}C`}</text>
  </g>
);
