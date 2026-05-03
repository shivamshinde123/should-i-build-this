import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { tokens } from "@/constants/theme";

type Level = "LOW" | "MEDIUM" | "HIGH";

type Props = {
  level?: Level;
  saturation?: number;
  description?: string;
};

export function MarketSentimentCard({
  level = "HIGH",
  saturation = 0.85,
  description = "Current market conditions show extreme saturation in SaaS productivity tools. New entries require 10x differentiation.",
}: Props) {
  const pct = Math.max(0, Math.min(1, saturation)) * 100;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>MARKET SENTIMENT</Text>
        <Ionicons name="bar-chart" size={14} color={tokens.accent} />
      </View>

      <View style={styles.row}>
        <Text style={styles.caption}>SATURATION INDEX</Text>
        <Text style={styles.level}>{level}</Text>
      </View>

      <View style={styles.track}>
        <View style={[styles.fill, { width: `${pct}%` }]} />
      </View>

      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: tokens.border,
    backgroundColor: tokens.surface,
    padding: 16,
  },
  header: {
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: tokens.ink,
    fontFamily: "Inter_500Medium",
    fontSize: 11,
    letterSpacing: 1.2,
  },
  row: {
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  caption: {
    color: tokens.inkMuted,
    fontFamily: "SpaceMono_400Regular",
    fontSize: 9,
    letterSpacing: 1.2,
  },
  level: {
    color: tokens.accent,
    fontFamily: "SpaceMono_700Bold",
    fontSize: 11,
    letterSpacing: 1.2,
  },
  track: {
    marginBottom: 12,
    height: 2,
    width: "100%",
    backgroundColor: tokens.elevated,
  },
  fill: {
    height: "100%",
    backgroundColor: tokens.accent,
  },
  description: {
    color: tokens.inkMuted,
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    lineHeight: 18,
  },
});
