import useWeatherStore from "@/store/store";
import React from "react";


const WeeklyForecast = () => {
    const searchCity = useWeatherStore((state) => state.coordinates);
    const { showHourlyForecast, setShowHourlyForecast } = useWeatherStore();

    const handleClick = (showHourly: boolean) => {
      setShowHourlyForecast(showHourly);
    };

    useEffect(() => {
      const fetchWeatherData = async () => {
        setLoading(true);
        try {
          let data;
          if (searchCity.lat != null && searchCity.lon != null) {
            data = await getSearchCityHourly({
              lat: searchCity.lat,
              lon: searchCity.lon,
            });
          } else {
            data = await getHourly();
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
    }, [searchCity]);
  return (
   <div></div>
  );
};

export default WeeklyForecast;
