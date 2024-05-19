export const categorizeUVIndex = (uvIndex:number) => {
  if (uvIndex <= 2) {
    return "Az";
  } else if (uvIndex >= 3 && uvIndex <= 5) {
    return "Orta";
  } else if (uvIndex >= 6 && uvIndex <= 7) {
    return "Yüksək";
  } else if (uvIndex >= 8 && uvIndex <= 10) {
    return "Çox yüksək";
  } else {
    return "Təhlükəli";
  }
};
