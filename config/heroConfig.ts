// config/heroConfig.ts
export const heroConfig = {
  name: "Amritha",
  
  // CRITICAL: Big, Bold, Romantic Cursive Font
  font: {
    family: "'Great Vibes', cursive",
    size: 180, // Large
    weight: 400,
    responsive: {
      mobile: 80,
      tablet: 120,
      desktop: 180
    }
  },
  
  // Particle text settings
  particles: {
    count: 8000,
    color: {
      primary: "#FFB4C2",
      glow: "#FF69B4",
      core: "#FFFFFF"
    },
    glow: {
      enabled: true,
      intensity: 2,
      color: "#FF69B4"
    },
    float: {
      enabled: true,
      amplitude: 5,
      speed: 0.5
    }
  },
  
  // CRITICAL: Ensure name never folds or cuts
  textRendering: {
    singleLine: true,
    noWrap: true,
    overflow: "visible"
  },
  
  subtitle: "For My Mookie 🧸",
  occasion: "Happy Valentine's Day 2026",
  tagline: "From your biggest fan and forever love"
}
