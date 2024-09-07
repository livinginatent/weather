import { RecommendationsCardT } from "@/lib/types";
import React from "react";

const RecommendationCard = ({
  icon,
  recommendation,

  actionText,
}: RecommendationsCardT) => {
  return (
    <div className="flex flex-col bg-[#b9c0da] w-full  items-center p-4 items-center justify-center rounded-lg shadow-md text-center">
      <div className="text-4xl mb-2">{icon}</div>
      <p className="mb-4 text-sm">{recommendation}</p>
      <p className="text-blue-500  text-sm font-medium">{actionText}</p>
    </div>
  );
};

export default RecommendationCard;
