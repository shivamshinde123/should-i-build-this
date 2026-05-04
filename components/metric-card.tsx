import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { tokens, typography } from "@/constants/theme";

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
        <Text style={styles.label}>{label}</Text>
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
        <Text style={styles.subtitle}>{subtitle}</Text>
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
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 8,
  },
  label: {
    flex: 1,
    minWidth: 0,
    flexShrink: 1,
    color: tokens.inkMuted,
    ...typography.eyebrow,
  },
  valueRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    flexWrap: "wrap",
    gap: 4,
  },
  value: {
    ...typography.cardValue,
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
    ...typography.titleMono,
    fontSize: 11,
    lineHeight: 16,
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
    flexShrink: 1,
    color: tokens.inkDim,
    ...typography.eyebrow,
  },
});
