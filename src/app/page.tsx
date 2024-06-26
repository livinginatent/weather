import MainDetails from "@/components/MainDetails/MainDetails";
import SideDetails from "@/components/SideDetails/SideDetails";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Havam.az | Bakı Hava Proqnozu - Müasir və dəqiq hava proqnozu",
  description: "Hava Proqnozu",
};
export default function Home() {
  return (
    <>
      <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row">
        <SideDetails />
        <MainDetails />
      </div>
    </>
  );
}
