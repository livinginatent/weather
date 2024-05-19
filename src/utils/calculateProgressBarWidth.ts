export const calculateProgressBarWidth = (index: number, UVindex: number) => {
  const thresholds = [0, 2, 5, 7, 10, 11];
  if (UVindex >= thresholds[index + 1]) {
    return 100;
  } else if (UVindex > thresholds[index] && UVindex < thresholds[index + 1]) {
    return (
      ((UVindex - thresholds[index]) /
        (thresholds[index + 1] - thresholds[index])) *
      100
    );
  } else {
    return 0;
  }
};
