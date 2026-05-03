import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

import { tokens } from "@/constants/theme";

export function AppHeader() {
  return (
    <View className="flex-row items-center justify-between border-b border-hairline px-5 py-4">
      <View className="flex-row items-center gap-2">
        <Ionicons name="terminal-sharp" size={16} color={tokens.accent} />
        <Text className="font-mono-bold text-[12px] tracking-wide2 text-accent">
          SHOULD I BUILD THIS?
        </Text>
      </View>
      <View
        className="h-7 w-7 items-center justify-center rounded-full border border-accent bg-elevated"
        style={{
          shadowColor: tokens.accent,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.4,
          shadowRadius: 4,
        }}
      >
        <Ionicons name="person" size={12} color={tokens.accent} />
      </View>
    </View>
  );
}
