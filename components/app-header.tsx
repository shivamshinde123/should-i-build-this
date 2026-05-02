import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

import { tokens } from "@/constants/theme";

export function AppHeader() {
  return (
    <View className="flex-row items-center justify-between border-b border-hairline px-5 py-3">
      <View className="flex-row items-center gap-2">
        <Ionicons name="terminal-outline" size={18} color={tokens.accent} />
        <Text className="font-mono text-[13px] tracking-terminal text-accent">
          SHOULD I BUILD THIS?
        </Text>
      </View>
      <View className="h-7 w-7 items-center justify-center rounded-full border border-border bg-elevated">
        <Ionicons name="person" size={14} color={tokens.inkMuted} />
      </View>
    </View>
  );
}
