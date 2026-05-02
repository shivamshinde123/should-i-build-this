import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppHeader } from "@/components/app-header";

export default function ValidateScreen() {
  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-bg">
      <AppHeader />
      <View className="flex-1 justify-center px-6">
        <View className="mb-4 self-start rounded-sm bg-accent px-2 py-1">
          <Text className="font-mono text-[11px] font-semibold tracking-terminal text-bg">
            VALIDATION ENGINE V2.4
          </Text>
        </View>
        <Text className="text-5xl font-black leading-[1.05] text-ink">
          STRESS{"\n"}TEST <Text className="text-accent">YOUR</Text>{"\n"}IDEA
        </Text>
        <Text className="mt-6 font-mono text-[11px] tracking-terminal text-ink-muted">
          STAGE_0 :: SCAFFOLD_READY
        </Text>
      </View>
    </SafeAreaView>
  );
}
