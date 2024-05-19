export const getIcon = (iconUrl:string) => {
  const urlParts = iconUrl.split("/");
  const dayOrNight = urlParts[urlParts.length - 2]; // 'day' or 'night'
  const iconName = urlParts[urlParts.length - 1]; // '116.png'

  return `/assets/${dayOrNight}/${iconName}`;
};
