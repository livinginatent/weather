export const categorizeHumidity = (humidity:number) => {
  if (humidity < 30) {
    return "Az";
  } else if (humidity >= 30 && humidity < 60) {
    return "Orta";
  } else if (humidity >= 60 && humidity < 80) {
    return "Yüksək";
  } else {
    return "Çox yüksək";
  }
};
