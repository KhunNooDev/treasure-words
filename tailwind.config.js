/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        sml: '390px',
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [{
      dark: {
        "primary": "#3498db",
        "primary-content": "#fffeff",
        "secondary": "#2ecc71",
        "secondary-focus": "#bd0091",
        "secondary-content": "#fffeff",
        "accent": "#37cdbe",
        "accent-focus": "#2aa79b",
        "accent-content": "#fffeff",
        "neutral": "#2a2e37",
        "neutral-focus": "#16181d",
        "neutral-content": "#fffeff",
        "base-100": "#3d4451",
        "base-200": "#2a2e37",
        "base-300": "#16181d",
        "base-content": "#ebecf0",
        "info": "#66c6ff",
        "success": "#87d039",
        "warning": "#e2d562",
        "error": "#ff6f6f"
      },
      light: {
        "primary": "#3498db",
        "primary-content": "#fffeff",
        "secondary": "#2ecc71",
        "secondary-focus": "#bd0091",
        "secondary-content": "#fffeff",
        "accent": "#37cdbe",
        "accent-focus": "#2aa79b",
        "accent-content": "#fffeff",
        "neutral": "#ebecf0",
        "neutral-focus": "#fffeff",
        "neutral-content": "#fffeff",
        "base-100": "#fffeff",
        "base-200": "#ebecf0",
        "base-300": "#dfe1e6",
        "base-content": "#16181d",
        "info": "#66c6ff",
        "success": "#87d039",
        "warning": "#e2d562",
        "error": "#ff6f6f"
      },
    }],
  },
};
