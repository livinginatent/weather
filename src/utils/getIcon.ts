export const getIcon = (iconUrl:string) => {
    if (!iconUrl) {
      return "/assets/icon.png"; // Return a default icon if iconUrl is invalid
    }
  const urlParts = iconUrl.split("/");
  const dayOrNight = urlParts[urlParts.length - 2]; // 'day' or 'night'
  const iconName = urlParts[urlParts.length - 1]; // '116.png'

  return `/assets/${dayOrNight}/${iconName}`;
};
