export const getLocationName = (
  lat: number | null | undefined,
  lon: number | null | undefined,
  locations: { [key: string]: { lat: number | null; lon: number | null } }
): string | null => {
  for (const [name, coords] of Object.entries(locations)) {
    if (coords.lat === lat && coords.lon === lon) {
      return name;
    }
  }
  return "Bakı";
};
