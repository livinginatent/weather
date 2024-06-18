export const getWeekly = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const data = await fetch(`${baseUrl}/api/weather/weekly`);
  if (!data.ok) {
    throw new Error("Failed to fetch data");
  }
  const res = await data.json();
  return res;
};
