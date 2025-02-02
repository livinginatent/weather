import { MonthlyDataT } from "@/lib/types";
import React from "react";
import { BsChatLeftQuoteFill } from "react-icons/bs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image"; // Import next/image
import doctor from "../../../public/assets/25.webp"; // Directly import the image

interface MonthlyRecommendationProps {
  monthlyData: MonthlyDataT | null;
}

const MonthlyRecommendationDisplay: React.FC<MonthlyRecommendationProps> = ({
  monthlyData,
}) => {
  return (
    <div className="flex flex-col bg-[#F2C3AD] justify-center items-center border rounded-sm border-[#595959]">
      <p className="p-2">
        Fevral ayında Azərbaycanda hava soyuq ola bilər, buna görə də gəzinti
        üçün səhər və ya günorta saatlarını seçin. İsti və rahat geyim geyinin,
        nazik amma bir neçə qat geyinmək daha yaxşıdır. Fiziki fəaliyyət zamanı həddindən artıq
        yorulmamağa diqqət edin və su balansını qorumaq üçün kifayət qədər maye
        için. Sağlamlığınız üçün özünüzə qayğı göstərin.
      </p>
      <BsChatLeftQuoteFill size={26} />

      <Image
        src={doctor}
        alt="Dr. Panah Panahov"
        width={80} // Set appropriate width
        height={80} // Set appropriate height
        className="rounded-full" // Ensure the image is rounded
      />
      <a
        className="text-sm underline"
        href="https://mercan.az/hekimler/uzman-dr-emin-haqverdiyev/"
      >
        Uzman Ginekoloq - Uzman. Dr. Emin Haqverdiyev
      </a>
    </div>
  );
};

export default MonthlyRecommendationDisplay;
