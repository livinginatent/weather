const airQuality = {
  co: 290.4,
  no2: 20.1,
  o3: 25.8,
  so2: 11.1,
  pm2_5: 4.2,
  pm10: 5.9,
  "us-epa-index": 1,
  "gb-defra-index": 1,
};

function getRecommendations(data:any) {
  const recommendations = [];

  // Recommendation 1 - Based on US-EPA Index
  if (data["us-epa-index"] <= 1) {
    recommendations.push({
      icon: "🏃‍♂️",
      message:
        "The air quality is good. People can enjoy outdoor activities without concern.",
      action: "No action needed.",
    });
  } else {
    recommendations.push({
      icon: "🚴‍♂️",
      message: "Sensitive groups should reduce outdoor exercise.",
      action: "Limit outdoor activities.",
    });
  }

  // Recommendation 2 - Based on CO level
  if (data.co < 300) {
    recommendations.push({
      icon: "🌬️",
      message:
        "Keep your windows open. Fresh air is safe, and indoor ventilation is recommended.",
      action: "No purifier required.",
    });
  } else {
    recommendations.push({
      icon: "🔒",
      message: "Close your windows to avoid dirty outdoor air.",
      action: "Get an air purifier.",
    });
  }

  // Recommendation 3 - Based on PM2.5 and PM10 levels
  if (data.pm2_5 < 12 && data.pm10 < 20) {
    recommendations.push({
      icon: "🚶‍♀️",
      message:
        "Exercise freely. Enjoy outdoor workouts with no concerns about air pollution.",
      action: "No restrictions.",
    });
  } else {
    recommendations.push({
      icon: "😷",
      message: "Sensitive groups should wear a mask outdoors.",
      action: "Get a mask.",
    });
  }

  // Recommendation 4 - Based on O3 level
  if (data.o3 < 50) {
    recommendations.push({
      icon: "🔄",
      message:
        "Sensitive groups can continue normal activities. The air is clean and poses no significant risk.",
      action: "No precautions required.",
    });
  } else {
    recommendations.push({
      icon: "🚫",
      message:
        "Reduce outdoor activities for sensitive groups due to high ozone levels.",
      action: "Stay indoors during peak ozone hours.",
    });
  }

  return recommendations;
}

const recommendations = getRecommendations(airQuality);

// Displaying recommendations
recommendations.forEach((rec) => {
  console.log(`${rec.icon} ${rec.message} ${rec.action}`);
});
