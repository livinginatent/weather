"use client";
import React, { useEffect, useState } from "react";
import HourlyForecast from "./HourlyForecast/HourlyForecast";
import { HourlyWeatherDataT } from "@/lib/types";
import { DEFAULT_LOCATION } from "@/lib/config";
import { getHourly } from "@/actions/getHourly";
import SecondaryDetails from "./SecondaryDetails/SecondaryDetails";
import { BeatLoader, ClipLoader } from "react-spinners";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import useWeatherStore from "@/store/store";
import { getSearchCityHourly } from "@/actions/getSearchCityHourly";

type Props = {};

const MainDetails = (props: Props) => {
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [hourlyWeatherData, setHourlyWeatherData] =
    useState<HourlyWeatherDataT>();
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const searchCity = useWeatherStore((state) => state.coordinates);

  useEffect(() => {
    const getLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lon: longitude });
        },
        (error) => {
          console.error("Error getting location", error);
          setLocation(DEFAULT_LOCATION); // Use default location on error
        },
        { timeout: 10000 }
      );
    };

    getLocation();
  }, []);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      try {
        let data;
        if (searchCity.lat != null && searchCity.lon !== null) {
          data = await getSearchCityHourly({
            lat: searchCity.lat,
            lon: searchCity.lon,
          });
        } else if (location) {
          data = await getHourly(location);
        }

        setHourlyWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [location, searchCity]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-75">
        <ClipLoader color="#36d7b7" size={50} />
      </div>
    );
  }

  return (
    <section className="bg-[#e4f1ff] flex flex-col justify-center items-center w-full h-full lg:h-screen rounded-l-[30px] pl-8">
      <HourlyForecast hourlyWeatherData={hourlyWeatherData} />
      <SecondaryDetails hourlyWeatherData={hourlyWeatherData} />
      <AlertDialog open={isOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Lokasiya icazəsi</AlertDialogTitle>
            <AlertDialogDescription>
              Biz sizin yerinizi təyin edə bilmədik. Hal-hazırda göstərilən hava
              məlumatları standart olaraq paytaxt Bakı üçün göstərilir. Cari
              yerinizin hava məlumatlarını əldə etmək üçün zəhmət olmasa
              lokasiyanızın təyin edilməsinə icazə verin.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsOpen(false)}>
              Bağla
            </AlertDialogCancel>
            {/*  <AlertDialogAction
              style={{ backgroundColor: "#5c9ce5" }}
              onClick={requestGeolocationPermission}
            >
              İcazə ver
            </AlertDialogAction> */}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};

export default MainDetails;
