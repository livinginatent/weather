"use client";
import React, { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts";
import HourlyForecast from "./HourlyForecast/HourlyForecast";
import { HourlyWeatherDataT } from "@/lib/types";
import { DEFAULT_LOCATION } from "@/lib/config";
import { getHourly } from "@/actions/getHourly";
import SecondaryDetails from "./SecondaryDetails/SecondaryDetails";
import { getIcon } from "@/utils/getIcon";
import { BeatLoader } from "react-spinners";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Props = {};

const MainDetails = (props: Props) => {
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [hourlyWeatherData, setHourlyWeatherData] =
    useState<HourlyWeatherDataT>();
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const handleGeolocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lon: longitude });
        setIsOpen(false);
      },
      (error) => {
        console.error("Error getting location", error);
        setIsOpen(true);
      },
      { timeout: 5000 }
    );
  };

  useEffect(() => {
    handleGeolocation();
  }, []);

  // Fetch weather data when location is updated
  useEffect(() => {
    if (location !== DEFAULT_LOCATION || loading) {
      getHourly(location)
        .then((data) => {
          setHourlyWeatherData(data);
          setLoading(false);
        })
        .catch((error) => console.error("Error fetching weather data", error));
    }
  }, [location, loading]);



  if (loading) {
    return (
      <div className="flex mt-20">
        <BeatLoader color="#98E4FF" />
      </div>
    );
  }

  return (
    <section className="bg-[#e4f1ff] flex flex-col justify-center items-center w-full h-full lg:h-screen rounded-l-[30px] pl-8">
      <HourlyForecast loading={loading} hourlyWeatherData={hourlyWeatherData} />
      <SecondaryDetails
        loading={loading}
        hourlyWeatherData={hourlyWeatherData}
      />
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
