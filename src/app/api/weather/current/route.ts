export async function GET(request: Request) {
  const API_KEY = process.env.API_KEY;
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const city = searchParams.get("city");

  let url;

  if (city) {
    url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`;
  } else if (lat && lon) {
    url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${lat},${lon}&aqi=no`;
  } else {
    return new Response(JSON.stringify({ error: "Missing query parameters" }), {
      status: 400,
    });
  }

  try {
    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
    });
  }
}
