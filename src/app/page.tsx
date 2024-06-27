import MainDetails from "@/components/MainDetails/MainDetails";
import SideDetails from "@/components/SideDetails/SideDetails";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Havam.az | Hava Durumu",
  description: "Ən dəqiq və müasir hava proqnozu - Hava Durumu",
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
