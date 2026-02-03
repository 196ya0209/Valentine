// config/transitionConfig.ts
export const heartCloudTransitionConfig = {
  // 60 hearts floating in a cloudy pink/white mist
  heartCount: 60,
  duration: 1500, // ms
  cloudColors: {
    primary: "rgba(255, 182, 193, 0.7)", // Pink
    secondary: "rgba(255, 255, 255, 0.9)" // White
  },
  heartColors: ["#E63946", "#FFB4C2", "#FF69B4"],
  animation: {
    heartsFloat: true,
    cloudsMove: true,
    fadeInOut: true
  }
}
