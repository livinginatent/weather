import { Coordinates } from "@/lib/types";
import { create } from "zustand";

type WeatherState = {
  coordinates: Coordinates;
  setCoordinates: (newCoordinates: Coordinates) => void;
  resetCoordinates: () => void;
  city: string | null; // Add city property as string (or null if no city)
  setCity: (newCity: string) => void; // Function to update city
  showHourlyForecast: boolean;
  setShowHourlyForecast: (show: boolean) => void;
};

const useWeatherStore = create<WeatherState>((set) => ({
  coordinates: { lat: null, lon: null },
  setCoordinates: (newCoordinates: Coordinates) =>
    set(() => ({ coordinates: newCoordinates })),
  resetCoordinates: () =>
    set(() => ({ coordinates: { lat: null, lon: null } })),
  city: null, // Initialize city as null
  setCity: (newCity: string) => set(() => ({ city: newCity })),
  showHourlyForecast: true, // default to showing the hourly forecast
  setShowHourlyForecast: (show: boolean) =>
    set(() => ({ showHourlyForecast: show })),
}));

export default useWeatherStore;
