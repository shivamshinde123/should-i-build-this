import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

import { tokens } from "@/constants/theme";

export type Concern = {
  title: string;
  description: string;
};

export function CriticalConcerns({ concerns }: { concerns: Concern[] }) {
  return (
    <View className="gap-3">
      <View className="flex-row items-center gap-2">
        <Ionicons name="warning-outline" size={14} color={tokens.accent} />
        <Text className="font-mono text-[12px] tracking-terminal text-ink">
          CRITICAL CONCERNS
        </Text>
      </View>
      <View className="gap-2">
        {concerns.map((c) => (
          <View key={c.title} className="rounded-sm border border-border bg-surface p-3">
            <View className="mb-2 flex-row items-center gap-2">
              <Ionicons name="alert-circle-outline" size={13} color={tokens.accent} />
              <Text className="font-mono text-[10px] tracking-terminal text-accent">
                {c.title}
              </Text>
            </View>
            <Text className="font-sans text-[12px] leading-[16px] text-ink-muted">
              {c.description}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
