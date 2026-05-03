import { StyleSheet, Text, View } from "react-native";

import { tokens } from "@/constants/theme";

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
            <Text style={styles.label} numberOfLines={2}>{bar.label}</Text>
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
    color: tokens.inkMuted,
    fontFamily: "SpaceMono_700Bold",
    fontSize: 9,
    letterSpacing: 0.8,
  },
  value: {
    color: tokens.accent,
    fontFamily: "SpaceMono_700Bold",
    fontSize: 11,
    letterSpacing: 0.6,
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
