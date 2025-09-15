import { NextRequest, NextResponse } from "next/server";
import { fetchWeatherApi } from "openmeteo";
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const params = {
    latitude: lat,
    longitude: lon,
    forecast_days: 16,
    _t: new Date().getTime(),
    daily: [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "rain_sum",
      "snowfall_sum",
      "wind_speed_10m_max",
    ],
    current: "wind_speed_10m",
    
  };

  const url = "https://api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherApi(url, params);

  const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
  try {
    const response = responses[0];

    const utcOffsetSeconds = response.utcOffsetSeconds();
    const daily = response.daily()!;
    const current = response.current()!;

    const weatherData = {
      daily: {
        time: range(
          Number(daily.time()),
          Number(daily.timeEnd()),
          daily.interval()
        ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
        weatherCode: daily.variables(0)!.valuesArray()!,
        temperature2mMax: daily.variables(1)!.valuesArray()!,
        temperature2mMin: daily.variables(2)!.valuesArray()!,
        rainSum: daily.variables(3)!.valuesArray()!,
        snowfallSum: daily.variables(4)!.valuesArray()!,
        windSpeed10mMax: daily.variables(0)!.valuesArray()!,
      },
      current: {
        time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
        windSpeed10m: current.variables(0)!.value(),
      },
    };

    return NextResponse.json(weatherData, {
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
