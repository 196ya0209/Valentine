// config/siteConfig.ts
// =====================================================
// IMPORTANT: Customize these values before deploying!
// Replace all placeholder values with your actual data.
// =====================================================
export const siteConfig = {
  herName: "Amritha",
  particleName: "Amritha",
  yourName: "[YOUR_NAME]", // TODO: Replace with your name
  
  // Password settings - NO HINT
  // TODO: Replace with your secret password
  password: "[YOUR_SECRET_CODE]",
  showHint: false,
  hint: null,
  
  petNames: {
    primary: "Mookie",
    all: [
      { name: "Mookie", emoji: "🧸", category: "special" },
      { name: "Kissmiss QT", emoji: "💋", category: "romantic" },
      { name: "My Doll", emoji: "🎀", category: "romantic" },
      { name: "Idol", emoji: "⭐", category: "admiring" },
      { name: "Cute", emoji: "🥰", category: "cute" },
      { name: "Brilliant", emoji: "🧠", category: "admiring" },
      { name: "Intelligent", emoji: "📚", category: "admiring" },
      { name: "Hot", emoji: "🔥", category: "romantic" },
      { name: "Artist", emoji: "🎨", category: "talent" },
      { name: "Coder", emoji: "💻", category: "talent" },
      { name: "Samsung Employee", emoji: "📱", category: "proud" },
      { name: "School Ppl Leader", emoji: "👑", category: "proud" },
      { name: "Chutti Vikadan Cover Photo Face", emoji: "📰", category: "funny" },
      { name: "Minion", emoji: "💛", category: "cute" },
      { name: "Cook", emoji: "👩‍🍳", category: "talent" },
      { name: "Double Chin Cutist", emoji: "😊", category: "cute" }
    ]
  },
  
  transitions: {
    type: "heart-cloud",
    duration: 1500,
    particleCount: 60
  }
}
