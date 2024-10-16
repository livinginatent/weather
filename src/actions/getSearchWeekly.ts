import { Coordinates } from "@/lib/types";

export const getSearchWeekly = async ({ lat, lon }: Coordinates) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const data = await fetch(
    `${baseUrl}/api/weather/search-weekly?lat=${lat}&lon=${lon}`,
    {
      cache: "no-store",
    }
  );
  if (!data.ok) {
    throw new Error("Failed to fetch data");
  }
  const res = await data.json();
  return res;
};
