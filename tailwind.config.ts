import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
      },
      colors: {
        brand: {
          50:  "#f0f4ff",
          100: "#dce7fd",
          200: "#b9d0fb",
          300: "#86aff8",
          400: "#5585f2",
          500: "#3461e8",
          600: "#2148d4",
          700: "#1b38b0",
          800: "#1c3090",
          900: "#1b2d78",
        },
        gold: {
          50:  "#fdf8ee",
          100: "#f9edd0",
          200: "#f2d89d",
          300: "#e9bc62",
          400: "#dfa235",
          500: "#c9871e",
          600: "#b06a15",
          700: "#8f5014",
          800: "#753f17",
          900: "#613517",
        },
        dark: {
          50:  "#f0f0f2",
          100: "#d6d6dc",
          200: "#adadba",
          300: "#848494",
          400: "#5e5e6e",
          500: "#3c3c4e",
          600: "#2a2a3c",
          700: "#1e1e2e",
          800: "#141420",
          900: "#0c0c16",
        },
      },
      backgroundImage: {
        "hero-pattern": "linear-gradient(135deg, #0c0c16 0%, #1e1e2e 60%, #2a1a0e 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
