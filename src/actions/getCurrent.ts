export const getCurrent = async ({
  lat,
  lon,
}: {
  lat: number;
  lon: number;
}) => {
  const data = await fetch(
    `http://localhost:3000/api/weather/current?lat=${lat}&lon=${lon}`
  );
  if (!data.ok) {
    throw new Error("Failed to fetch data");
  }
  const res = await data.json();
  return res;
};
