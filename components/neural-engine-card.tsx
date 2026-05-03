import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

import { tokens } from "@/constants/theme";

export function NeuralEngineCard() {
  return (
    <View className="overflow-hidden border border-border bg-surface">
      <View className="h-28 items-center justify-center bg-elevated">
        <Ionicons name="hardware-chip" size={48} color={tokens.inkDim} />
      </View>
      <View className="flex-row items-center gap-2 border-t border-hairline px-4 py-3">
        <View className="h-2 w-2 rounded-full bg-status-pass" />
        <Text className="font-mono-bold text-[10px] tracking-wide2 text-ink">
          NEURAL ENGINE ACTIVE
        </Text>
      </View>
    </View>
  );
}
