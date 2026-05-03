import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

import { tokens } from "@/constants/theme";

type Level = "LOW" | "MEDIUM" | "HIGH";

type Props = {
  level?: Level;
  saturation?: number;
  description?: string;
};

export function MarketSentimentCard({
  level = "HIGH",
  saturation = 0.82,
  description = "Current market conditions show extreme saturation in SaaS productivity tools. New entries require 10x differentiation.",
}: Props) {
  const pct = Math.max(0, Math.min(1, saturation)) * 100;

  return (
    <View className="rounded-sm border border-border bg-surface p-4">
      <View className="mb-3 flex-row items-center justify-between">
        <Text className="font-mono text-[12px] tracking-terminal text-ink">MARKET SENTIMENT</Text>
        <Ionicons name="bar-chart" size={14} color={tokens.accent} />
      </View>

      <View className="mb-2 flex-row items-center justify-between">
        <Text className="font-mono text-[10px] tracking-terminal text-ink-muted">SATURATION INDEX</Text>
        <Text className="font-mono text-[11px] font-bold tracking-terminal text-accent">{level}</Text>
      </View>

      <View className="mb-3 h-1 w-full overflow-hidden rounded-full bg-elevated">
        <View className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
      </View>

      <Text className="font-sans text-[12px] leading-[18px] text-ink-muted">{description}</Text>
    </View>
  );
}
