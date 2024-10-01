import { Coordinates } from "@/lib/types";
export const getSearchCity = async ({ lat, lon }: Coordinates) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const data = await fetch(
    `${baseUrl}/api/weather/hourly?lat=${lat}&lon=${lon}`,
    {
      cache: "no-store", // This ensures the request is not cached
    }
  );
  if (!data.ok) {
    throw new Error("Failed to fetch data");
  }
  const res = await data.json();
  return res;
};
