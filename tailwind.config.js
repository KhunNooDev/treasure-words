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
        "primary": "#336699",
        "secondary": "#669933",
        "accent": "#993366",
        "neutral": "#444444",
        "base-100": "#222222",
        "info": "#99ccff",
        "success": "#ccffcc",
        "warning": "#ffcc99",
        "error": "#ff6666"
      },
      light: {
        "primary": "#99ccff",
        "secondary": "#669933",
        "accent": "#993366",
        "neutral": "#dddddd",
        "base-100": "#ffffff",
        "info": "#99ccff",
        "success": "#ccffcc",
        "warning": "#ffcc99",
        "error": "#ff6666"
      }
    }]
  }
}
