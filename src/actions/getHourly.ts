export const getHourly = async ({
  lat,
  lon,
}: {
  lat: number;
  lon: number;
}) => {
  const data = await fetch(
    `https:///weather-sand-one.vercel.app/api/weather/hourly?lat=${lat}&lon=${lon}`
  );
  if (!data.ok) {
    throw new Error("Failed to fetch data");
  }
  const res = await data.json();
  return res;
};
