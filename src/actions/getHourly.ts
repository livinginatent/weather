export const getHourly = async ({
  lat,
  lon,
}: {
  lat: number;
  lon: number;
}) => {
  const data = await fetch(
    `http://localhost:3000/api/weather/hourly?lat=${lat}&lon=${lon}`
  );
  if (!data.ok) {
    throw new Error("Failed to fetch data");
  }
  const res = await data.json();
  return res;
};
