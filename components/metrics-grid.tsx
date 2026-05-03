import { View } from "react-native";

import { MetricCard, type MetricCardProps } from "@/components/metric-card";

type Layout = "grid" | "stack";

type Props = {
  metrics: MetricCardProps[];
  layout?: Layout;
};

export function MetricsGrid({ metrics, layout = "grid" }: Props) {
  if (metrics.length === 0) return null;

  if (layout === "stack") {
    return (
      <View className="gap-2">
        {metrics.map((m) => (
          <MetricCard key={m.label} {...m} />
        ))}
      </View>
    );
  }

  const rows: MetricCardProps[][] = [];
  for (let i = 0; i < metrics.length; i += 2) {
    rows.push(metrics.slice(i, i + 2));
  }

  return (
    <View className="gap-2">
      {rows.map((row) => (
        <View key={row.map((r) => r.label).join("|")} className="flex-row gap-2">
          {row.map((m) => (
            <MetricCard key={m.label} {...m} />
          ))}
          {row.length < 2 ? <View className="flex-1" /> : null}
        </View>
      ))}
    </View>
  );
}
