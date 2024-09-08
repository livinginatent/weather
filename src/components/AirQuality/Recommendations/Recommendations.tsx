import React from 'react'
import RecommendationCard from './RecommendationCard/RecommendationCard';
import { RecommendationsT } from '@/lib/types';



const Recommendations = ({recommendations}: RecommendationsT) => {
  return (
    <div className="fborder-2  p-2 rounded-md mt-8 w-full ">
      <h2 className='font-bold mb-2 text-center text-xl'>Mövcud hava üçün tövsiyələr</h2>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 p-6   rounded-lg">
        {recommendations.map((rec, index) => (
          <RecommendationCard
            key={index}
            icon={rec.icon}
            recommendation={rec.recommendation}
           
            actionText={rec.actionText}
          />
        ))}
      </div>
    </div>
  );
}

export default Recommendations