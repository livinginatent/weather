import MainDetails from "@/components/MainDetails/MainDetails";
import SideDetails from "@/components/SideDetails/SideDetails";

export default async function Home() {
  return (
    <main className="sm:flex-col md:flex-col lg:flex-row xl:flex-row h-screen flex">
      <SideDetails />
      <MainDetails />
    </main>
  );
}
