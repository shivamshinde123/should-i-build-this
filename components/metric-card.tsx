import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { tokens } from "@/constants/theme";

export type MetricCardProps = {
  label: string;
  value: string;
  unit?: string;
  subtitle?: string;
  valueColor?: "accent" | "danger" | "ink";
  progress?: number;
  icon?: keyof typeof Ionicons.glyphMap;
};

export function MetricCard({
  label,
  value,
  unit,
  subtitle,
  valueColor = "accent",
  progress,
  icon,
}: MetricCardProps) {
  const colorClass =
    valueColor === "danger"
      ? "text-status-danger"
      : valueColor === "ink"
        ? "text-ink"
        : "text-accent";

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.label} numberOfLines={1}>{label}</Text>
        {icon ? <Ionicons name={icon} size={14} color={tokens.accent} /> : null}
      </View>
      <View style={styles.valueRow}>
        <Text style={[styles.value, colorClass === "text-status-danger" ? styles.danger : colorClass === "text-ink" ? styles.ink : styles.accent]}>{value}</Text>
        {unit ? (
          <Text style={styles.unit}>{unit}</Text>
        ) : null}
      </View>
      {progress !== undefined ? (
        <View style={styles.track}>
          <View style={[styles.fill, { width: `${Math.max(0, Math.min(1, progress)) * 100}%` }]} />
        </View>
      ) : null}
      {subtitle ? (
        <Text style={styles.subtitle} numberOfLines={2}>{subtitle.toUpperCase()}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 146,
    borderWidth: 1,
    borderColor: tokens.border,
    backgroundColor: tokens.surface,
    padding: 16,
  },
  header: {
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    flex: 1,
    color: tokens.inkMuted,
    fontFamily: "SpaceMono_400Regular",
    fontSize: 9,
    letterSpacing: 1.2,
  },
  valueRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 4,
  },
  value: {
    fontFamily: "Inter_900Black",
    fontSize: 28,
    lineHeight: 32,
  },
  accent: {
    color: tokens.accent,
  },
  danger: {
    color: "#fca5a5",
  },
  ink: {
    color: tokens.ink,
  },
  unit: {
    color: tokens.inkDim,
    fontFamily: "SpaceMono_400Regular",
    fontSize: 12,
  },
  track: {
    marginTop: 8,
    height: 2,
    width: "100%",
    backgroundColor: tokens.elevated,
  },
  fill: {
    height: "100%",
    backgroundColor: tokens.accent,
  },
  subtitle: {
    marginTop: 8,
    color: tokens.inkDim,
    fontFamily: "SpaceMono_400Regular",
    fontSize: 9,
    letterSpacing: 1.2,
  },
});
