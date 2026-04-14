import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        brand: {
          50:  "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
        surface: {
          0:   "#ffffff",
          50:  "#f8f8f8",
          100: "#f0f0f0",
          200: "#e4e4e4",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
          950: "#0a0a0a",
        },
      },
      animation: {
        "fade-in":    "fadeIn 0.4s ease-out",
        "slide-up":   "slideUp 0.4s cubic-bezier(0.16,1,0.3,1)",
        "scale-in":   "scaleIn 0.2s cubic-bezier(0.16,1,0.3,1)",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
        "shimmer":    "shimmer 1.5s linear infinite",
        "heart-pop":  "heartPop 0.4s cubic-bezier(0.16,1,0.3,1)",
        "story-ring": "storyRing 3s linear infinite",
      },
      keyframes: {
        fadeIn:     { from: { opacity: "0" }, to: { opacity: "1" } },
        slideUp:    { from: { opacity: "0", transform: "translateY(16px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        scaleIn:    { from: { opacity: "0", transform: "scale(0.92)" }, to: { opacity: "1", transform: "scale(1)" } },
        pulseSoft:  { "0%,100%": { opacity: "1" }, "50%": { opacity: "0.5" } },
        shimmer:    { from: { backgroundPosition: "-200% 0" }, to: { backgroundPosition: "200% 0" } },
        heartPop:   { "0%": { transform: "scale(1)" }, "50%": { transform: "scale(1.4)" }, "100%": { transform: "scale(1)" } },
        storyRing:  { from: { strokeDashoffset: "0" }, to: { strokeDashoffset: "-440" } },
      },
      backgroundImage: {
        "gradient-story": "linear-gradient(135deg, #f9a825, #e91e8c, #9c27b0, #3f51b5)",
        "gradient-mesh":  "radial-gradient(at 40% 20%, #e0f2fe 0px, transparent 50%), radial-gradient(at 80% 0%, #bae6fd 0px, transparent 50%), radial-gradient(at 0% 50%, #f0f9ff 0px, transparent 50%)",
      },
    },
  },
  plugins: [],
};

export default config;
