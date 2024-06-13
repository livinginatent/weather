import { Coordinates } from "@/lib/types";
import { create } from "zustand";

type WeatherState = {
  coordinates: Coordinates;
  setCoordinates: (newCoordinates: Coordinates) => void;
  resetCoordinates: () => void;
};

const useWeatherStore = create<WeatherState>((set) => ({
  coordinates: { lat: null, lon: null },
  setCoordinates: (newCoordinates: Coordinates) =>
    set(() => ({ coordinates: newCoordinates })),
  resetCoordinates: () =>
    set(() => ({ coordinates: { lat: null, lon: null } })),
}));

export default useWeatherStore;
