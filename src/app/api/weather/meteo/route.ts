import { NextRequest, NextResponse } from "next/server";
import { fetchWeatherApi } from "openmeteo";
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const date = searchParams.get("date");
  const params = {
    latitude: lat,
    longitude: lon,
    start_date: date,
    end_date: date,

    daily: ["weather_code", "apparent_temperature_max", "apparent_temperature_min", "rain_sum", "snowfall_sum", "wind_speed_10m_max"],
    timezone: "Europe/Moscow",
  };

  const url = "https://archive-api.open-meteo.com/v1/archive";
  const responses = await fetchWeatherApi(url, params);
  const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
  try {
    const response = responses[0];

    // Attributes for timezone and location
    const utcOffsetSeconds = response.utcOffsetSeconds();
 

    const daily = response.daily()!;

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = {
      daily: {
        time: range(
          Number(daily.time()),
          Number(daily.timeEnd()),
          daily.interval()
        ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
        weatherCode: daily.variables(0)!.valuesArray()!,
        apparentTemperatureMax: daily.variables(1)!.valuesArray()!,
        apparentTemperatureMin: daily.variables(2)!.valuesArray()!,
        rainSum: daily.variables(3)!.valuesArray()!,
        snowfallSum: daily.variables(4)!.valuesArray()!,
        windSpeed10mMax: daily.variables(5)!.valuesArray()!,
      },
    };

    return NextResponse.json(weatherData);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
