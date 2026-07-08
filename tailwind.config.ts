import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta da marca (manual da marca)
        cream: {
          DEFAULT: "#F6F4E0",
          50: "#FAF9EC",
          100: "#F6F4E0",
          200: "#ECE8CC",
        },
        forest: {
          DEFAULT: "#16210E",
          900: "#0F1809",
          800: "#16210E",
          700: "#20301A",
          600: "#2C4124",
        },
        rust: {
          DEFAULT: "#C05A16",
          500: "#C05A16",
          600: "#A54B10",
          400: "#D06B24",
        },
        caramel: {
          DEFAULT: "#C08653",
          500: "#C08653",
          400: "#CE9968",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        brand: "0.18em",
      },
    },
  },
  plugins: [],
};

export default config;
