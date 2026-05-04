import { StyleSheet, Text, View } from "react-native";

import { tokens, typography } from "@/constants/theme";

export type MarketBar = {
  label: string;
  value: string;
  width: number;
};

export function MarketSizeBars({ bars }: { bars: MarketBar[] }) {
  return (
    <View style={styles.container}>
      {bars.map((bar) => (
        <View key={bar.label}>
          <View style={styles.row}>
            <Text style={styles.label}>{bar.label}</Text>
            <Text style={styles.value}>{bar.value}</Text>
          </View>
          <View style={styles.track}>
            <View style={[styles.fill, { width: `${Math.max(0, Math.min(1, bar.width)) * 100}%` }]} />
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  row: {
    marginBottom: 4,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 8,
  },
  label: {
    flex: 1,
    minWidth: 0,
    flexShrink: 1,
    color: tokens.inkMuted,
    ...typography.eyebrowStrong,
    letterSpacing: 0.7,
  },
  value: {
    flexShrink: 0,
    color: tokens.accent,
    ...typography.titleMono,
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 0.4,
  },
  track: {
    height: 12,
    width: "100%",
    backgroundColor: tokens.elevated,
  },
  fill: {
    height: "100%",
    backgroundColor: tokens.accent,
  },
});
