import { notFound } from "next/navigation";
import { cities, locationNames } from "@/lib/locationNames"; // adjust path accordingly
import { Droplets, Sunrise, Sunset, Wind } from "lucide-react";
import { Card } from "@/components/ui/card";
import { getHourly } from "@/actions/getHourly";


type Props = {
  params: {
    cityName: string;
  };
};

export function generateStaticParams() {
  return Object.keys(cities).map((city) => ({
    cityName: city.toLowerCase(),
  }));
}

export async function generateMetadata({ params }: Props) {
  const { cityName } = params;
  const cityKey = Object.keys(cities).find(
    (key) => key.toLowerCase() === cityName.toLowerCase()
  );

  if (!cityKey) return { title: "City Not Found" };

  const nativeCity = cities[cityKey];
  const coords = locationNames[nativeCity]
 
  return {
    title: `Weather in ${nativeCity}`,
    description: `${nativeCity} üçün hava proqnozu. Gündəlik və həftəlik hava durumu.`,
  };
}

// Placeholder weather data
const getWeatherData = (cityName: string) => {
  // This would be replaced with actual API call
  return {
    current: {
      temp: 24,
      tempMin: 18,
      tempMax: 27,
      windSpeed: 12,
      humidity: 65,
      uvIndex: 6,
      sunrise: "06:15",
      sunset: "20:45",
      condition: "partly-cloudy",
    },
    forecast: [
      {
        day: "Monday",
        tempMin: 18,
        tempMax: 27,
        windSpeed: 12,
        condition: "sunny",
      },
      {
        day: "Tuesday",
        tempMin: 17,
        tempMax: 25,
        windSpeed: 10,
        condition: "partly-cloudy",
      },
      {
        day: "Wednesday",
        tempMin: 16,
        tempMax: 24,
        windSpeed: 8,
        condition: "cloudy",
      },
      {
        day: "Thursday",
        tempMin: 15,
        tempMax: 23,
        windSpeed: 15,
        condition: "rainy",
      },
      {
        day: "Friday",
        tempMin: 14,
        tempMax: 22,
        windSpeed: 18,
        condition: "stormy",
      },
      {
        day: "Saturday",
        tempMin: 16,
        tempMax: 25,
        windSpeed: 9,
        condition: "partly-cloudy",
      },
      {
        day: "Sunday",
        tempMin: 19,
        tempMax: 28,
        windSpeed: 7,
        condition: "sunny",
      },
    ],
  };
};

export default async function CityPage({ params }: Props) {
  
  const cityKey = Object.keys(cities).find(
    (key) => key.toLowerCase() === params.cityName.toLowerCase()
  );

  if (!cityKey) {
    notFound(); // Will show 404 page
  }

  const nativeCity = cities[cityKey];
  const weatherData = getWeatherData(params.cityName);
  const { current, forecast } = weatherData;
  const coords = locationNames[nativeCity];
  if (!coords) {
    console.error(`Coordinates for ${nativeCity} are missing!`);
    return notFound(); // Optionally return a 404 page
  }

  const { lat, lon } = coords;
  const hourlyWeather = await getHourly({ lat: coords.lat, lon: coords.lon });
  console.log(hourlyWeather)
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{nativeCity}</h1>
        <p className="text-muted-foreground">
          {new Date().toLocaleDateString("az-AZ", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Today's Weather Card */}
      <Card className="p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4">
               {/*  <WeatherIcon condition={current.condition} size={64} /> */}
                <div>
                  <div className="text-5xl font-bold">{current.temp}°C</div>
                  <div className="text-muted-foreground">
                    Feels like {current.temp - 2}°C
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Wind className="h-5 w-5 text-muted-foreground" />
                  <span>{current.windSpeed} km/h</span>
                </div>
                <div className="flex items-center gap-2">
                  <Droplets className="h-5 w-5 text-muted-foreground" />
                  <span>{current.humidity}%</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-sm text-muted-foreground mb-1">
                Temperature
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-500">Max: {current.tempMax}°C</span>
                <span className="mx-2">|</span>
                <span className="text-blue-500">Min: {current.tempMin}°C</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="p-4 bg-muted/50">
              <div className="text-sm font-medium mb-2">UV Index</div>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{current.uvIndex}</div>
                <div
                  className={`px-2 py-1 rounded text-xs ${
                    current.uvIndex <= 2
                      ? "bg-green-100 text-green-800"
                      : current.uvIndex <= 5
                        ? "bg-yellow-100 text-yellow-800"
                        : current.uvIndex <= 7
                          ? "bg-orange-100 text-orange-800"
                          : "bg-red-100 text-red-800"
                  }`}
                >
                  {current.uvIndex <= 2
                    ? "Low"
                    : current.uvIndex <= 5
                      ? "Moderate"
                      : current.uvIndex <= 7
                        ? "High"
                        : "Very High"}
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-muted/50">
              <div className="text-sm font-medium mb-2">Humidity</div>
              <div className="text-2xl font-bold">{current.humidity}%</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${current.humidity}%` }}
                ></div>
              </div>
            </Card>

            <Card className="p-4 bg-muted/50">
              <div className="text-sm font-medium mb-2">Sunrise</div>
              <div className="flex items-center gap-2">
                <Sunrise className="h-5 w-5 text-yellow-500" />
                <span className="text-xl font-medium">{current.sunrise}</span>
              </div>
            </Card>

            <Card className="p-4 bg-muted/50">
              <div className="text-sm font-medium mb-2">Sunset</div>
              <div className="flex items-center gap-2">
                <Sunset className="h-5 w-5 text-orange-500" />
                <span className="text-xl font-medium">{current.sunset}</span>
              </div>
            </Card>
          </div>
        </div>
      </Card>

      {/* 7-Day Forecast */}
      <div>
        <h2 className="text-2xl font-bold mb-4">7-Day Forecast</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
         {/*  {forecast.map((day, index) => (
            <DailyForecast key={index} forecast={day} />
          ))} */}
        </div>
      </div>
    </div>
  );
}
