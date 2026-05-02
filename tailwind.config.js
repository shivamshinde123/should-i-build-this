/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        bg: "#000000",
        surface: "#0e0e10",
        elevated: "#161618",
        border: "#26262a",
        hairline: "#1c1c20",
        ink: {
          DEFAULT: "#ffffff",
          muted: "#9ca3af",
          dim: "#6b7280",
          faint: "#4b5563",
        },
        accent: {
          DEFAULT: "#F5C842",
          glow: "#FFD24A",
          dim: "#7a6321",
        },
        status: {
          pass: "#4ade80",
          syncing: "#9ca3af",
          wait: "#52525b",
          danger: "#ef4444",
          warn: "#F5C842",
        },
      },
      fontFamily: {
        mono: ["SpaceMono", "Menlo", "Consolas", "monospace"],
        sans: ["System", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        terminal: "0.08em",
      },
    },
  },
  plugins: [],
};
