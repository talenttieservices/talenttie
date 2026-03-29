import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#2ECA7F", dark: "#1FA866", light: "#4EDBA2", 50: "#ECFDF5", 100: "#D1FAE5", 200: "#A7F3D0", 300: "#6EE7B7", 400: "#34D399", 500: "#2ECA7F", 600: "#1FA866", 700: "#15803D", 800: "#166534", 900: "#14532D" },
        navy: { DEFAULT: "#1C2E3D", light: "#2A4A5F", dark: "#0F1923", 50: "#F0F4F8", 100: "#D9E2EC", 200: "#BCCCDC", 300: "#9FB3C8", 400: "#829AB1", 500: "#627D98", 600: "#486581", 700: "#334E68", 800: "#1C2E3D", 900: "#0F1923" },
      },
      fontFamily: { sans: ["Inter", "system-ui", "-apple-system", "sans-serif"] },
      boxShadow: {
        "3d": "0 1px 1px rgba(0,0,0,0.08), 0 2px 2px rgba(0,0,0,0.06), 0 4px 4px rgba(0,0,0,0.05), 0 8px 8px rgba(0,0,0,0.04), 0 16px 16px rgba(0,0,0,0.03)",
        "3d-lg": "0 2px 2px rgba(0,0,0,0.06), 0 4px 4px rgba(0,0,0,0.05), 0 8px 8px rgba(0,0,0,0.04), 0 16px 16px rgba(0,0,0,0.03), 0 32px 32px rgba(0,0,0,0.02)",
        glow: "0 0 20px rgba(46,202,127,0.3), 0 0 40px rgba(46,202,127,0.1)",
        "glow-lg": "0 0 30px rgba(46,202,127,0.4), 0 0 60px rgba(46,202,127,0.15)",
      },
      animation: { float: "float 6s ease-in-out infinite", shimmer: "shimmer 1.5s infinite", "pulse-ring": "pulse-ring 2s cubic-bezier(0,0,0.2,1) infinite", "bounce-soft": "bounce-soft 3s ease-in-out infinite", marquee: "marquee 30s linear infinite" },
      keyframes: {
        float: { "0%, 100%": { transform: "translateY(0px)" }, "50%": { transform: "translateY(-20px)" } },
        shimmer: { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
        "pulse-ring": { "0%": { transform: "scale(0.8)", opacity: "1" }, "100%": { transform: "scale(2)", opacity: "0" } },
        "bounce-soft": { "0%, 100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
      },
    },
  },
  plugins: [],
}
export default config
