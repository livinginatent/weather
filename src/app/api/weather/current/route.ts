export const dynamic = "force-dynamic";
export const revalidate = 10;
const { signal } = new AbortController();
export async function GET() {
  const API_KEY = process.env.API_KEY;
  try {
    const res = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=Baku&aqi=no`,
      { next: { revalidate: 10 } }
    );
    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
    });
  }
}
