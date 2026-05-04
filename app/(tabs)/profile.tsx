import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppHeader } from "@/components/app-header";

export default function ProfileScreen() {
  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-bg">
      <AppHeader />
      <View className="flex-1 items-center justify-center px-6">
        <Text className="font-mono-bold text-[11px] tracking-wide2 text-ink-muted">
          Guest profile
        </Text>
      </View>
    </SafeAreaView>
  );
}
