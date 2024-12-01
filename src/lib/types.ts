import { ReactElement } from "react";

export type AirQuality = {
  co: number;
  no2: number;
  o3: number;
  so2: number;
  pm2_5: number;
  pm10: number;
  "us-epa-index": number;
  "gb-defra-index": number;
};

type Condition = {
  text: string;
  icon: string;
  code: number;
};

type Day = {
  maxtemp_c: number;
  maxtemp_f: number;
  mintemp_c: number;
  mintemp_f: number;
  avgtemp_c: number;
  avgtemp_f: number;
  maxwind_mph: number;
  maxwind_kph: number;
  totalprecip_mm: number;
  totalprecip_in: number;
  totalsnow_cm: number;
  avgvis_km: number;
  avgvis_miles: number;
  avghumidity: number;
  daily_will_it_rain: number;
  daily_chance_of_rain: number;
  daily_will_it_snow: number;
  daily_chance_of_snow: number;
  condition: Condition;
  uv: number;
  air_quality: AirQuality;
};

export type Astro = {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moon_phase: string;
  moon_illumination: number;
  is_moon_up: number;
  is_sun_up: number;
};

type Hour = {
  time_epoch: number;
  time: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: Condition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  snow_cm: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  windchill_c: number;
  windchill_f: number;
  heatindex_c: number;
  heatindex_f: number;
  dewpoint_c: number;
  dewpoint_f: number;
  will_it_rain: number;
  chance_of_rain: number;
  will_it_snow: number;
  chance_of_snow: number;
  vis_km: number;
  vis_miles: number;
  gust_mph: number;
  gust_kph: number;
  uv: number;
  air_quality: AirQuality;
};

type ForecastDay = {
  date: string;
  date_epoch: number;
  day: Day;
  astro: Astro;
  hour: Hour[];
};

type Forecast = {
  forecastday: ForecastDay[];
};

export type Coordinates = {
  lon?: number | null;
  lat?: number | null;
};
export type HistoryData = {
  lon: number | null | undefined;
  lat: number | null | undefined;
  date: string;
};

export type HistoricalDataT = {
  daily: {
    time: string[]; // Array of ISO date strings
    weatherCode: { [key: number]: number }; // Object with numeric keys and weather codes as values
    apparentTemperatureMax: { [key: number]: number }; // Object with numeric keys and temperature values
    apparentTemperatureMin: { [key: number]: number }; // Object with numeric keys and temperature values
    rainSum: { [key: number]: number }; // Object with numeric keys and rain sum values
    snowfallSum: { [key: number]: number }; // Object with numeric keys and snowfall sum values
    windSpeed10mMax?: { [key: number]: number }; // Optional: Object with numeric keys and wind speed values
  };
};


export type Location = {
  city: string;
  coord: Coordinates;
};

export type CurrentWeatherDataT = {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime: string;
    localtime_epoch: number;
  };
  current: {
    last_updated_epoch: number;
    last_updated: string;
    temp_c: number;
    temp_f: number;
    is_day: number;
    condition: Condition;
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    vis_km: number;
    vis_miles: number;
    uv: number;
    gust_mph: number;
    gust_kph: number;
    air_quality: AirQuality;
  };
  forecast: Forecast;
};

export type HourlyWeatherDataT = {
  forecast: Forecast;
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime: string;
    localtime_epoch: number;
  };
  current: {
    time_epoch: number | undefined;
    time: string;
    temp_c: number;
    temp_f: number;
    is_day: number;
    condition: Condition;
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    snow_cm: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    windchill_c: number;
    windchill_f: number;
    heatindex_c: number;
    heatindex_f: number;
    dewpoint_c: number;
    dewpoint_f: number;
    will_it_rain: number;
    chance_of_rain: number;
    will_it_snow: number;
    chance_of_snow: number;
    vis_km: number;
    vis_miles: number;
    gust_mph: number;
    gust_kph: number;
    uv: number;
    air_quality: AirQuality;
  };
};
export type AQILevelT = {
  label: string;
  color: string;
  description: string;
  icon: string;
  range: string;
};
export type HourlyForecastT = {
  hourlyWeatherData: HourlyWeatherDataT | null;
  loading?: boolean;
};

export type DailyForecastData = {
  weeklyWeatherData: DailyForecastT | null;
};

export type Humidity = {
  humidity: number;
};
export type Wind = {
  wind: number;
};
export type UVIndex = {
  UVindex: number;
};

export type FeelsLike = {
  feelsLike: number;
};

export type MainContainerT = {
  title: string;
  icon: ReactElement;
  value: any;
  unit: string;
};

export type WarningT = {
  location: string;
  pm2_5: number;
};
export type ForecastChartT = {
  forecastData: DailyForecastT;
};

export type AQIWeeklyT = {
  forecastData: DailyForecastT;
};
export type DailyForecastT = {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
  };
  current: {
    last_updated_epoch: number;
    last_updated: string;
    temp_c: number;
    temp_f: number;
    is_day: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    windchill_c: number;
    windchill_f: number;
    heatindex_c: number;
    heatindex_f: number;
    dewpoint_c: number;
    dewpoint_f: number;
    vis_km: number;
    vis_miles: number;
    uv: number;
    gust_mph: number;
    gust_kph: number;
    air_quality: {
      aqi_data: null;
      pm2_5: number;
      co: number;
      no2: number;
      pm10: number;
      o3: number;
      so2: number;
      "gb-defra-index": number;
      "us-epa-index": number;
    };
  };
  forecast: {
    forecastday: Array<{
      date: string;
      date_epoch: number;
      day: {
        maxtemp_c: number;
        maxtemp_f: number;
        mintemp_c: number;
        mintemp_f: number;
        avgtemp_c: number;
        avgtemp_f: number;
        maxwind_mph: number;
        maxwind_kph: number;
        totalprecip_mm: number;
        totalprecip_in: number;
        totalsnow_cm: number;
        avgvis_km: number;
        avgvis_miles: number;
        avghumidity: number;
        daily_will_it_rain: number;
        daily_chance_of_rain: number;
        daily_will_it_snow: number;
        daily_chance_of_snow: number;
        condition: {
          text: string;
          icon: string;
          code: number;
        };
        uv: number;
        air_quality: {
          pm2_5: number;
          co: number;
          no2: number;
          pm10: number;
          o3: number;
          so2: number;
          "gb-defra-index": number;
          "us-epa-index": number;
        };
      };
      astro: {
        sunrise: string;
        sunset: string;
        moonrise: string;
        moonset: string;
        moon_phase: string;
        moon_illumination: string;
        is_moon_up: number;
        is_sun_up: number;
      };
      hour: Array<{
        time_epoch: number;
        time: string;
        temp_c: number;
        temp_f: number;
        is_day: number;
        condition: {
          text: string;
          icon: string;
          code: number;
        };
        wind_mph: number;
        wind_kph: number;
        wind_degree: number;
        wind_dir: string;
        pressure_mb: number;
        pressure_in: number;
        precip_mm: number;
        precip_in: number;
        snow_cm: number;
        humidity: number;
        cloud: number;
        feelslike_c: number;
        feelslike_f: number;
        windchill_c: number;
        windchill_f: number;
        heatindex_c: number;
        heatindex_f: number;
        dewpoint_c: number;
        dewpoint_f: number;
        will_it_rain: number;
        chance_of_rain: number;
        will_it_snow: number;
        chance_of_snow: number;
        vis_km: number;
        vis_miles: number;
        gust_mph: number;
        gust_kph: number;
        uv: number;
      }>;
    }>;
  };
};

export type RecommendationsT = {
  recommendations: Array<{
    icon: React.ReactNode;
    recommendation: string;

    actionText: string;
  }>;
};

export type RecommendationsCardT = {
  icon: React.ReactNode;
  recommendation: string;

  actionText: string;
};
