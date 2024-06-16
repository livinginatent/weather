import MainDetails from "@/components/MainDetails/MainDetails";
import SideDetails from "@/components/SideDetails/SideDetails";



export default async function Home() {
  return (
    <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row">
      <SideDetails />
      <MainDetails />
    </div>
  );
}
