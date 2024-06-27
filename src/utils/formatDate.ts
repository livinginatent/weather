import { days, months } from "@/lib/dateTranslations";

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const dayOfWeek = days[date.toLocaleString("en-US", { weekday: "long" })];
  const month = months[date.toLocaleString("en-US", { month: "long" })];
  const dayOfMonth = date.getDate();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const time = `${hours}:${minutes}`;
  return `${dayOfWeek}, ${dayOfMonth} ${month}, ${time} `;
};
