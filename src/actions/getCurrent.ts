export const currentTemp = async () => {
  const data = await fetch(
    `http://localhost:3000/api/weather/current`
  );
  if (!data.ok) {
    throw new Error("Failed to fetch data");
  }
  const res = await data.json()
  return res;
};
