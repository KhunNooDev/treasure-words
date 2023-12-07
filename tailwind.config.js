/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {},
  plugins: [require("daisyui")],
  daisyui: {
    themes: [{
      dark: {
        "primary": "#ff9eb8",    // Light Pink
        "secondary": "#add8e6",  // Light Blue
        "accent": "#ffd700",     // Gold
        "neutral": "#1a1a1a",    // Dark Gray
        "base-100": "#333333",   // Very Dark Gray
        "info": "#87ceeb",       // Sky Blue
        "success": "#98fb98",    // Pale Green
        "warning": "#ffc0cb",    // Pink
        "error": "#ff9eb8"       // Light Pink (matching primary)
      },

      light: {
        "primary": "#ffb6c1",    // Light Pink
        "secondary": "#add8e6",  // Light Blue
        "accent": "#ffd700",     // Gold
        "neutral": "#f0f0f0",    // Very Light Gray
        "base-100": "#ffffff",   // White
        "info": "#87ceeb",       // Sky Blue
        "success": "#98fb98",    // Pale Green
        "warning": "#ffc0cb",    // Pink
        "error": "#ffb6c1"       // Light Pink (matching primary)
      }
    }]
  }
}
