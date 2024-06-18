export async function GET(request: Request) {
  const API_KEY = process.env.API_KEY;
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const city = searchParams.get("city");

  const url = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${lat},${lon}&aqi=no`;

  try {
    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();
    console.log(data,'jello')
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
    });
  }
}
