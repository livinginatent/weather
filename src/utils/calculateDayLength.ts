export const calculateDayLength = (sunrise: string, sunset: string) => {
  // Helper function to parse time string
  const parseTimeString = (timeString: string) => {
    const [time, modifier] = timeString.split(" ");

    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) {
      hours += 12;
    } else if (modifier === "AM" && hours === 12) {
      hours = 0;
    }

    return { hours, minutes };
  };

  // Parse the sunrise and sunset times
  const sunriseTime = parseTimeString(sunrise);
  const sunsetTime = parseTimeString(sunset);

  // Create Date objects for both times (using the same date, e.g., today)
  const today = new Date();
  const sunriseDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    sunriseTime.hours,
    sunriseTime.minutes
  );
  const sunsetDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    sunsetTime.hours,
    sunsetTime.minutes
  );

  // Calculate the difference in milliseconds
  const diffMs = sunsetDate.getTime() - sunriseDate.getTime();

  // Convert milliseconds to hours and minutes
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  return `${diffHours} saat ${diffMinutes} dəqiqə`;
};
