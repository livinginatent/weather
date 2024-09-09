import { AQILevelT } from "@/lib/types";
import React from "react";



const aqiLevels: AQILevelT[] = [
  {
    label: "Yaxşı",
    color: "bg-good",
    description: "Yaxşı",
    icon: "😊", // Replace with actual icon
    range: "1",
  },
  {
    label: "Orta",
    color: "bg-moderate",
    description: "Orta",
    icon: "😐", // Replace with actual icon
    range: "2",
  },
  {
    label: "Həssas qruplar üçün qeyri-sağlam",
    color: "bg-unhealthy",
    description: "Pis",
    icon: "😷", // Replace with actual icon
    range: "3",
  },
  {
    label: "Qeyri-sağlam",
    color: "bg-veryUnhealthy",
    description: "Qeyri-sağlam",
    icon: "🤒", // Replace with actual icon
    range: "4",
  },
  {
    label: "Çox qeyri-sağlam",
    color: "bg-dangerous",
    description: "Zərərli",
    icon: "😷", // Replace with actual icon
    range: "5",
  },
  {
    label: "Təhlükəli",
    color: "bg-hazardous",
    description: "Təhlükəli",
    icon: "☠️", // Replace with actual icon
    range: "6",
  },
];

const AQILevel: React.FC = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center space-y-6 p-4">
      <h2 className="text-2xl font-bold">Hava Keyfiyyəti İndeksi (AQI)</h2>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        {aqiLevels.map((level) => (
          <div
            className="flex flex-col  justify-center items-center"
            key={level.label}
          >
            <div
              key={level.label}
              className={`flex flex-col items-center px-12 py-1 ${level.color} text-white `}
            >
              
            </div>
            <p className="text-lg text-bold">{level.range}</p>
            <p className="text-xs  ">{level.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AQILevel;
