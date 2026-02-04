// config/transitionConfig.ts
export const heartCloudTransitionConfig = {
  // 60 hearts floating in a cloudy orange/white mist
  heartCount: 60,
  duration: 1500, // ms
  cloudColors: {
    primary: "rgba(255, 171, 145, 0.7)", // Soft peach
    secondary: "rgba(255, 255, 255, 0.9)" // White
  },
  heartColors: ["#FF6B35", "#FFD700", "#FFAB91"],
  animation: {
    heartsFloat: true,
    cloudsMove: true,
    fadeInOut: true
  }
}
