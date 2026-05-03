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
        bg: "#0a0a0a",
        surface: "#141414",
        elevated: "#1c1c1c",
        border: "#2a2a2a",
        hairline: "#1f1f1f",
        ink: {
          DEFAULT: "#ffffff",
          muted: "#a1a1aa",
          dim: "#71717a",
          faint: "#52525b",
        },
        accent: {
          DEFAULT: "#F5C842",
          glow: "#FFD24A",
          dim: "#7a6321",
        },
        status: {
          pass: "#F5C842",
          syncing: "#a1a1aa",
          wait: "#52525b",
          danger: "#ef4444",
          warn: "#F5C842",
        },
      },
      fontFamily: {
        sans: ["Inter_400Regular"],
        "sans-medium": ["Inter_500Medium"],
        "sans-semibold": ["Inter_600SemiBold"],
        "sans-bold": ["Inter_700Bold"],
        display: ["Inter_900Black"],
        mono: ["SpaceMono_400Regular"],
        "mono-bold": ["SpaceMono_700Bold"],
      },
      letterSpacing: {
        terminal: "0.08em",
        wide2: "0.12em",
      },
    },
  },
  plugins: [],
};
