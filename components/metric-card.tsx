import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

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
    <View className="flex-1 border border-border bg-surface p-4">
      <View className="mb-2 flex-row items-center justify-between">
        <Text className="font-mono text-[9px] tracking-wide2 text-ink-muted" numberOfLines={1}>
          {label}
        </Text>
        {icon ? <Ionicons name={icon} size={14} color={tokens.accent} /> : null}
      </View>
      <View className="flex-row items-baseline gap-1">
        <Text className={`font-display text-[28px] leading-[32px] ${colorClass}`}>{value}</Text>
        {unit ? (
          <Text className="font-mono text-[12px] text-ink-dim">{unit}</Text>
        ) : null}
      </View>
      {progress !== undefined ? (
        <View className="mt-2 h-[2px] w-full bg-elevated">
          <View
            className="h-full bg-accent"
            style={{ width: `${Math.max(0, Math.min(1, progress)) * 100}%` }}
          />
        </View>
      ) : null}
      {subtitle ? (
        <Text
          className="mt-2 font-mono text-[9px] tracking-wide2 text-ink-dim"
          numberOfLines={2}
        >
          {subtitle.toUpperCase()}
        </Text>
      ) : null}
    </View>
  );
}
