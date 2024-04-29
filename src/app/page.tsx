import { currentTemp } from "@/actions/getCurrent";
import MainDetails from "@/components/MainDetails/MainDetails";
import SideDetails from "@/components/SideDetails/SideDetails";


export default async function Home() {
  const currentData = await currentTemp();

  console.log(currentData);
  
  return (
    <main className="flex">
      <SideDetails temp={currentData.current.temp_c} />
      <MainDetails />
    </main>
  );
}
