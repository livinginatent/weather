"use client";
import React, { useEffect, useState } from "react";
import HourlyForecast from "./HourlyForecast/HourlyForecast";
import { HourlyWeatherDataT } from "@/lib/types";
import { getHourly } from "@/actions/getHourly";
import SecondaryDetails from "./SecondaryDetails/SecondaryDetails";
import useWeatherStore from "@/store/store";
import { getSearchCityHourly } from "@/actions/getSearchCityHourly";
import WeeklyForecast from "./WeeklyForecast/WeeklyForecast";
import { ClipLoader } from "react-spinners";
import { cities } from "@/lib/locationNames";

const MainDetails = () => {
  const [hourlyWeatherData, setHourlyWeatherData] =
    useState<HourlyWeatherDataT | null>(null);
  const { showHourlyForecast } = useWeatherStore();

  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lon: number;
    source: string;
  } | null>(null);

  const { coordinates: searchCity } = useWeatherStore((state) => ({
    coordinates: state.coordinates,
  }));
  const [loading, setLoading] = useState(true); // Start with loading=true

  // On component mount, attempt to get the user's location
  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLat = position.coords.latitude;
            const userLon = position.coords.longitude;

            // Update currentLocation to the user's location
            setCurrentLocation({
              lat: userLat,
              lon: userLon,
              source: "geolocation",
            });
          },
          (error) => {
            console.error("Error getting location:", error.message);
            // If geolocation fails, set currentLocation to default (Baku)
            setCurrentLocation({
              lat: 40.4093, // Baku latitude
              lon: 49.8671, // Baku longitude
              source: "default",
            });
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        // If geolocation is not supported, set currentLocation to default
        setCurrentLocation({
          lat: 40.4093, // Baku latitude
          lon: 49.8671, // Baku longitude
          source: "default",
        });
      }
    };

    getUserLocation();
  }, []); // Empty dependency array ensures this runs once on mount

  // Update currentLocation when a city is searched
  useEffect(() => {
    if (searchCity.lat != null && searchCity.lon != null) {
      setCurrentLocation({
        lat: searchCity.lat,
        lon: searchCity.lon,
        source: "search",
      });
    }
  }, [searchCity]);

  // Fetch weather data whenever currentLocation changes
  useEffect(() => {
    if (currentLocation) {
      const fetchWeatherData = async () => {
        try {
          setLoading(true);
          let data;

          if (currentLocation.source === "search") {
            data = await getSearchCityHourly({
              lat: currentLocation.lat,
              lon: currentLocation.lon,
            });
          } else {
            data = await getHourly({
              lat: currentLocation.lat,
              lon: currentLocation.lon,
            });
          }

          if (data) {
            setHourlyWeatherData(data);
          }
        } catch (error) {
          console.error("Error fetching weather data", error);
        } finally {
          setLoading(false);
        }
      };

      fetchWeatherData();
    }
  }, [currentLocation]);

  let localCityName: string | undefined = "";
  if (searchCity.lat === 39.8265 && searchCity.lon === 46.7656) {
    localCityName = "Xankəndi";
  } else {
    localCityName =
      (hourlyWeatherData && cities[hourlyWeatherData.location?.name]) ||
      hourlyWeatherData?.location?.name;
  }

  return (
    <>
      {loading ? (
        <div className="justify-center h-screen items-center flex flex-col w-full xl:justify-center xl:items-center">
          <ClipLoader size={50} color="#36d7b7" loading={loading} />
        </div>
      ) : showHourlyForecast && hourlyWeatherData ? (
        <section className="bg-[#e4f1ff] items-center justify-center xl:items-normal xl:justify-normal p-4 flex flex-col w-full xl:9/12 ">
          <h1 className="text-2xl mt-4 self-center">
            {`${localCityName} Hava Proqnozu`}
          </h1>
          <HourlyForecast hourlyWeatherData={hourlyWeatherData} />
          <SecondaryDetails hourlyWeatherData={hourlyWeatherData} />
        </section>
      ) : (
        <section className="bg-[#e4f1ff] flex flex-col items-center justify-center w-full h-full">
          <h1 className="text-2xl mt-4 self-center">
            {" "}
            {`${localCityName ? localCityName : "Bakı"} Həftəlik Hava Proqnozu`}
          </h1>{" "}
          <div className="h-screen flex flex-col items-center justify-start w-full">
            <WeeklyForecast />
          </div>
        </section>
      )}
    </>
  );
};

export default MainDetails;
