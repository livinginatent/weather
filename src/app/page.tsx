import AllCities from "@/components/AllCities/AllCities";
import CitySelector from "@/components/CitySelector/CitySelector";
import MainDetails from "@/components/MainDetails/MainDetails";
import SideDetails from "@/components/SideDetails/SideDetails";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Bakı Hava Proqnozu | Hava Proqnozu",
  description:
    "Bakı və digər şəhərlərin hava proqnozu Havam.az ilə qarşınızda. Günlük, həftəlik hava proqnozu. Bakıda hava.",
  /*   alternates: {
    canonical: "https://havam.az",
  }, */
};
export default function Home() {
  return (
    <>
      <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row custom-height-903">
        <SideDetails />
        <MainDetails />
      </div>
    </>
  );
}
