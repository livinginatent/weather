import config from "../../tailwind.config";

const colors = config.theme.extend.colors;

export const getAQIColor = (aqi: number) => {
  if (aqi === 1) return colors.good;
  if (aqi === 2) return colors.moderate;
  if (aqi === 3) return colors.unhealthy;
  if (aqi === 4) return colors.veryUnhealthy;
  if (aqi === 5) return colors.dangerous;
  return colors.hazardous;
};
