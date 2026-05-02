import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppHeader } from "@/components/app-header";

export default function ProfileScreen() {
  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-bg">
      <AppHeader />
      <View className="flex-1 items-center justify-center px-6">
        <Text className="font-mono text-[11px] tracking-terminal text-ink-muted">
          GUEST OPERATOR
        </Text>
      </View>
    </SafeAreaView>
  );
}
