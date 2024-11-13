/* import { Coordinates } from "@/lib/types";

export const getMeteo = async ({ lat, lon }: Coordinates) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const data = await fetch(
    `${baseUrl}/api/weather/meteo?lat=${lat}&lon=${lon}`
  );
  if (!data.ok) {
    throw new Error("Failed to fetch data");
  }
  const res = await data.json();
  return res;
};
 */