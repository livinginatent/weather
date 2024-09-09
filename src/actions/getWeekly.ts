import { Coordinates } from "@/lib/types";

export const getWeekly = async ({ lat, lon }: Coordinates = {}) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const url =
    lat && lon
      ? `${baseUrl}/api/weather/weekly?lat=${lat}&lon=${lon}`
      : `${baseUrl}/api/weather/weekly`;

  const data = await fetch(url);
  if (!data.ok) {
    throw new Error("Failed to fetch data");
  }
  const res = await data.json();
  return res;
};
