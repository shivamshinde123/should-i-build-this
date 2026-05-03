import { Text, View } from "react-native";

export type MarketBar = {
  label: string;
  value: string;
  width: number;
};

export function MarketSizeBars({ bars }: { bars: MarketBar[] }) {
  return (
    <View className="gap-3">
      {bars.map((bar) => (
        <View key={bar.label}>
          <View className="mb-1 flex-row items-center justify-between">
            <Text
              className="flex-1 font-mono text-[9px] tracking-terminal text-ink-muted"
              numberOfLines={1}
            >
              {bar.label}
            </Text>
            <Text className="ml-2 font-mono text-[11px] tracking-terminal text-ink">
              {bar.value}
            </Text>
          </View>
          <View className="h-2 w-full overflow-hidden rounded-sm bg-elevated">
            <View
              className="h-full bg-accent"
              style={{ width: `${Math.max(0, Math.min(1, bar.width)) * 100}%` }}
            />
          </View>
        </View>
      ))}
    </View>
  );
}
