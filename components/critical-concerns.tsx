import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

import { tokens } from "@/constants/theme";

export type Concern = {
  title: string;
  description: string;
  severity?: "warn" | "info";
};

export function CriticalConcerns({ concerns }: { concerns: Concern[] }) {
  return (
    <View className="gap-3">
      <View className="flex-row items-center gap-2">
        <Ionicons name="warning" size={14} color={tokens.accent} />
        <Text className="font-mono-bold text-[11px] tracking-wide2 text-ink">
          CRITICAL CONCERNS
        </Text>
      </View>
      <View className="gap-2">
        {concerns.map((c) => {
          const color = c.severity === "info" ? tokens.inkMuted : tokens.accent;
          return (
            <View key={c.title} className="border border-border bg-surface p-3">
              <View className="mb-2 flex-row items-center gap-2">
                <Ionicons name="warning-outline" size={12} color={color} />
                <Text
                  className="font-mono-bold text-[10px] tracking-wide2"
                  style={{ color }}
                >
                  {c.title}
                </Text>
              </View>
              <Text className="font-sans text-[12px] leading-[16px] text-ink-muted">
                {c.description}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
