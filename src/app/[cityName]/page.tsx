import { notFound } from "next/navigation";
import { cities, locationNames } from "@/lib/locationNames"; // adjust path accordingly
import { Droplets, Sunrise, Sunset, Wind } from "lucide-react";
import { Card } from "@/components/ui/card";
import { getHourly } from "@/actions/getHourly";
import { getSearchWeekly } from "@/actions/getSearchWeekly";
import Image from "next/image";
import Head from "next/head";
import { getIcon } from "@/utils/getIcon";
import HourlyForecast from "@/components/MainDetails/HourlyForecast/HourlyForecast";
import WeeklyForecast from "@/components/MainDetails/WeeklyForecast/WeeklyForecast";

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
const canonicalMap: Record<string, string> = {
  agarak: "qubadli",
  haftoni: "lankaran",
  mugan: "hajigabul",
  kedabeko: "gedebey",
  dilagarda: "beyleqan",
  nukha: "shaki",
  ismailly: "ismailli",
  shushi: "shusha",
  hadrut: "jabrayil",
  qaracala: "shirvan",
  qabaqcol: "balakan",
};
export async function generateMetadata({ params }: Props) {
  const { cityName } = params;
  const cityKey = Object.keys(cities).find(
    (key) => key.toLowerCase() === cityName.toLowerCase()
  );

  if (!cityKey) return { title: "City Not Found" };

  const nativeCity = cities[cityKey];

  return {
    title: `${nativeCity} Hava Proqnozu - Ən Dəqiq Hava Məlumatı | Havam.az`,
    description: `${nativeCity} üçün hava proqnozu. Gündəlik və həftəlik hava durumu. ${nativeCity} Hava məlumatı. Havam.az vasitəsi ilə dəqiq hava proqnozu əldə edin.`,
  };
}

export default async function CityPage({ params }: Props) {
  const cityKey = Object.keys(cities).find(
    (key) => key.toLowerCase() === params.cityName.toLowerCase()
  );

  if (!cityKey) {
    notFound(); // Will show 404 page
  }
  const canonicalCityKey = canonicalMap[cityKey.toLowerCase()] ?? cityKey;
  const canonicalCityName = cities[canonicalCityKey];

  // Build canonical URL:
  const canonicalUrl = `https://havam.az/city/${canonicalCityKey.toLowerCase()}`;
  const nativeCity = cities[cityKey];
  const coords = locationNames[nativeCity];
  if (!coords) {
    console.error(`Coordinates for ${nativeCity} are missing!`);
    return notFound(); // Optionally return a 404 page
  }

  const hourlyWeather = await getHourly({ lat: coords.lat, lon: coords.lon });
  const weeklyWeather = await getSearchWeekly({
    lat: coords.lat,
    lon: coords.lon,
  });

  const temp =
    hourlyWeather?.current?.temp_c != null
      ? `${Math.round(hourlyWeather.current.temp_c)}°C`
      : "";
  const feelsLike =
    hourlyWeather?.current?.feelslike_c != null
      ? `${Math.round(hourlyWeather.current.temp_c)}°C`
      : "";
  const windSpeed = Math.round(hourlyWeather.current.wind_kph);
  const humidity = hourlyWeather.current.humidity;
  const maxTemp = Math.round(
    weeklyWeather.forecast.forecastday[0].day.maxtemp_c
  );
  const minTemp = Math.round(
    weeklyWeather.forecast.forecastday[0].day.mintemp_c
  );
  const uvIndex = hourlyWeather.current.uv;
  const sunrise = hourlyWeather?.forecast?.forecastday[0]?.astro?.sunrise ?? "";
  const sunset = hourlyWeather?.forecast?.forecastday[0]?.astro?.sunset ?? "";
  const chanceOfRain =
    hourlyWeather?.forecast?.forecastday[0].day.daily_chance_of_rain;
  const localIconPath = getIcon(hourlyWeather.current.condition.icon);
  const condition = hourlyWeather.current.condition.icon;

  return (
    <>
      <Head>
        <link rel="canonical" href={canonicalUrl} />
      </Head>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {nativeCity} Hava Proqnozu
          </h1>
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
                <div className="flex items-center justify-start gap-4">
                  <div>
                    <div className="text-5xl font-bold">{temp}</div>
                    <div className="text-muted-foreground">
                      Hiss olunan {feelsLike}
                    </div>
                  </div>
                  <Image
                    alt={`${condition}`}
                    src={localIconPath}
                    width={64}
                    height={64}
                  />
                </div>

                <div className="mt-6 flex flex-col gap-4">
                  <p className="text-lg font-bold">Külək sürəti</p>
                  <div className="flex justify-start items-center gap-2">
                    <Wind className="h-5 w-5 text-muted-foreground" />
                    <span>{windSpeed} km/saat</span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="text-sm text-muted-foreground mb-1">
                  Gün ərzində
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-500">Yuxarı: {maxTemp}°C</span>
                  <span className="mx-2">|</span>
                  <span className="text-blue-500">Aşağı: {minTemp}°C</span>
                </div>
                <p className="text-lg font-bold mt-4 underline">
                  Gün ərzində yağış yağma ehtimalı: {chanceOfRain}%
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card className="p-4 bg-muted/50">
                <div className="text-sm font-medium mb-2">
                  Ultra Bənövşəyi İndeks (Günəş şüaları)
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{uvIndex}</div>
                  <div
                    className={`px-2 py-1 rounded text-xs ${
                      uvIndex <= 2
                        ? "bg-green-100 text-green-800"
                        : uvIndex <= 5
                          ? "bg-yellow-100 text-yellow-800"
                          : uvIndex <= 7
                            ? "bg-orange-100 text-orange-800"
                            : "bg-red-100 text-red-800"
                    }`}
                  >
                    {uvIndex <= 2
                      ? "Aşağı"
                      : uvIndex <= 5
                        ? "Orta"
                        : uvIndex <= 7
                          ? "Yuxarı"
                          : "Təhlükəli"}
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-muted/50">
                <div className="text-sm font-medium mb-2">Rütubət</div>
                <div className="text-2xl font-bold">{humidity}%</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${humidity}%` }}
                  ></div>
                </div>
              </Card>

              <Card className="p-4 bg-muted/50">
                <div className="text-sm font-medium mb-2">Gün doğumu</div>
                <div className="flex items-center gap-2">
                  <Sunrise className="h-5 w-5 text-yellow-500" />
                  <span className="text-xl font-medium">{sunrise}</span>
                </div>
              </Card>

              <Card className="p-4 bg-muted/50">
                <div className="text-sm font-medium mb-2">Gün batışı</div>
                <div className="flex items-center gap-2">
                  <Sunset className="h-5 w-5 text-orange-500" />
                  <span className="text-xl font-medium">{sunset}</span>
                </div>
              </Card>
            </div>
          </div>
        </Card>
        <div className="bg-white bg-opacity-90 rounded-lg shadow-md p-4">
          {" "}
          <h2 className="text-xl text-center mb-2 font-bold">{`${nativeCity} üçün hava proqnozu`}</h2>
          <p className="text-center">
            {`${nativeCity} şəhəri üçün təqdim etdiyimiz hava proqnozu dəqiqdir və daima yenilənir. Hava şəraiti gün ərzində dəyişə bilər, buna görə də sizə ən son məlumatları təqdim edirik. Şəhərinizin temperaturu, hava proqnozu, yağış və külək kimi hava şəraitləri haqqında proqnozları bir səhifədə. `}
            <a
              className="font-bold"
              href="https://havam.az"
              target="_blank"
              rel="noopener noreferrer"
            >
              Havam.az
            </a>
            {` ${nativeCity} şəhəri üçün hər zaman dəqiq və etibarlı hava məlumatları təqdim edir.`}
          </p>
        </div>
        <div className="mt-6">
          <h3 className="text-xl text-center font-bold">{`${nativeCity} saatlıq hava proqnozu`}</h3>
          <HourlyForecast hourlyWeatherData={hourlyWeather} />
          <h3 className="text-xl text-center font-bold">{`${nativeCity} həftəlik hava proqnozu`}</h3>

          <WeeklyForecast lat={coords.lat} lon={coords.lon} />
        </div>
      </div>
    </>
  );
}
