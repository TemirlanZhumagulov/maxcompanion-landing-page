import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        background: "#0B0C10",
        foreground: "#E6F1FF",
        card: "rgba(255,255,255,0.05)",
        border: "rgba(255,255,255,0.08)",
        accentFrom: "#00FFD1",
        accentTo: "#0077FF",
      },
      backgroundImage: {
        accent: "linear-gradient(135deg, #00FFD1, #0077FF)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(0,255,209,0.15), 0 0 60px rgba(0,119,255,0.1)",
      },
      animation: {
        fadeIn: "fadeIn 1s ease-in forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;




