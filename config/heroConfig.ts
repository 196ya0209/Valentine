// config/heroConfig.ts
export const heroConfig = {
  name: "Amritha",
  
  // Pet names for heartbeat animation cycle
  petNamesForAnimation: [
    "Amritha",
    "Mookie",
    "My Doll",
    "Kissmiss QT",
    "Cute",
    "Brilliant",
    "Idol",
    "Minion",
    "Artist",
    "Cook",
    "Hot"
  ],
  
  // CRITICAL: Big, Bold, Playfair Display Font
  font: {
    family: "'Playfair Display', serif",
    size: 180, // Large
    weight: 700,
    responsive: {
      mobile: 80,
      tablet: 120,
      desktop: 180
    }
  },
  
  // Particle text settings - warm orange radiant theme
  particles: {
    count: 8000,
    color: {
      primary: "#FFD6BA",    // Apricot Blush
      glow: "#E85D04",       // Burnt Orange
      core: "#FFFBF5"        // Ivory
    },
    glow: {
      enabled: true,
      intensity: 2.2,
      color: "#E85D04"
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
  
  subtitle: "For My Mookie",
  occasion: "Happy Valentine's Day 2026",
  tagline: "From your biggest fan and forever love"
}
