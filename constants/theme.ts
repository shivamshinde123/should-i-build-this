import { Platform } from "react-native";

export const tokens = {
  bg: "#000000",
  surface: "#0e0e10",
  elevated: "#161618",
  border: "#26262a",
  hairline: "#1c1c20",
  ink: "#ffffff",
  inkMuted: "#9ca3af",
  inkDim: "#6b7280",
  accent: "#F5C842",
  accentGlow: "#FFD24A",
  pass: "#4ade80",
  syncing: "#9ca3af",
  wait: "#52525b",
  danger: "#ef4444",
} as const;

const sharedDark = {
  text: tokens.ink,
  background: tokens.bg,
  tint: tokens.accent,
  icon: tokens.inkMuted,
  tabIconDefault: tokens.inkDim,
  tabIconSelected: tokens.accent,
};

export const Colors = {
  light: sharedDark,
  dark: sharedDark,
};

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Courier New', monospace",
  },
});
