export const tokens = {
  bg: "#0a0a0a",
  surface: "#141414",
  elevated: "#1c1c1c",
  border: "#2a2a2a",
  hairline: "#1f1f1f",
  ink: "#ffffff",
  inkMuted: "#a1a1aa",
  inkDim: "#71717a",
  inkFaint: "#52525b",
  accent: "#F5C842",
  accentGlow: "#FFD24A",
  accentDim: "#7a6321",
  pass: "#F5C842",
  syncing: "#a1a1aa",
  wait: "#52525b",
  danger: "#ef4444",
} as const;

export const fonts = {
  monoRegular: "SpaceMono_400Regular",
  monoBold: "SpaceMono_700Bold",
  sansRegular: "Inter_400Regular",
  sansMedium: "Inter_500Medium",
  sansBold: "Inter_700Bold",
  sansBlack: "Inter_900Black",
} as const;

export const typography = {
  eyebrow: {
    fontFamily: fonts.monoRegular,
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 0.45,
  },
  eyebrowStrong: {
    fontFamily: fonts.monoBold,
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 0.45,
  },
  titleMono: {
    fontFamily: fonts.monoBold,
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 0.35,
  },
  titleSans: {
    fontFamily: fonts.sansMedium,
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 0.2,
  },
  body: {
    fontFamily: fonts.sansRegular,
    fontSize: 14,
    lineHeight: 21,
  },
  bodyCompact: {
    fontFamily: fonts.sansRegular,
    fontSize: 13,
    lineHeight: 19,
  },
  bodyStrong: {
    fontFamily: fonts.sansBold,
    fontSize: 13,
    lineHeight: 19,
  },
  buttonLabel: {
    fontFamily: fonts.monoBold,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.35,
  },
  cardValue: {
    fontFamily: fonts.sansBlack,
    fontSize: 26,
    lineHeight: 30,
  },
  sectionValue: {
    fontFamily: fonts.sansBlack,
    fontSize: 38,
    lineHeight: 42,
  },
  reportTitle: {
    fontFamily: fonts.sansMedium,
    fontSize: 24,
    lineHeight: 29,
  },
  hero: {
    fontFamily: fonts.sansBlack,
    fontSize: 54,
    lineHeight: 54,
    letterSpacing: -1.8,
  },
} as const;
