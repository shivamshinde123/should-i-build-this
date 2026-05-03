import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

import { tokens } from "@/constants/theme";

export function NeuralEngineCard() {
  return (
    <View className="overflow-hidden rounded-sm border border-border bg-surface">
      <View className="h-24 items-center justify-center bg-elevated">
        <Ionicons name="hardware-chip-outline" size={40} color={tokens.inkDim} />
      </View>
      <View className="flex-row items-center gap-2 px-4 py-3">
        <View className="h-2 w-2 rounded-full bg-status-pass" />
        <Text className="font-mono text-[11px] tracking-terminal text-ink">
          NEURAL ENGINE ACTIVE
        </Text>
      </View>
    </View>
  );
}
