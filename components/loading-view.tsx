import { Pressable, ScrollView, Text, View } from "react-native";

import { DiagnosticPipeline } from "@/components/diagnostic-pipeline";
import { SynthesizingRadar } from "@/components/synthesizing-radar";

type Props = {
  onCancel?: () => void;
};

export function LoadingView({ onCancel }: Props) {
  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingBottom: 32 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="gap-8 px-5 pt-8">
        <View className="items-center">
          {onCancel ? (
            <Pressable
              onPress={onCancel}
              accessibilityRole="button"
              accessibilityLabel="Cancel stress test"
            >
              <SynthesizingRadar size={260} />
            </Pressable>
          ) : (
            <SynthesizingRadar size={260} />
          )}
        </View>

        <View className="items-center">
          <Text className="text-center font-display text-[40px] leading-[42px] text-accent">
            SYNTHESIZING{"\n"}VERDICT...
          </Text>
          <Text className="mt-4 font-mono text-[12px] tracking-wide2 text-ink">
            REALITY CHECK INCOMING.
          </Text>
        </View>

        <DiagnosticPipeline />

        <View className="flex-row items-start justify-between border-t border-hairline pt-4">
          <FooterCell label="AUDIT_ID:" value="9X-2241" />
          <FooterCell label="LATENCY:" value="14MS" />
          <FooterCell label="SECURITY:" value="ENCRYPTED" />
        </View>
      </View>
    </ScrollView>
  );
}

function FooterCell({ label, value }: { label: string; value: string }) {
  return (
    <View>
      <Text className="font-mono text-[9px] tracking-wide2 text-ink-faint">{label}</Text>
      <Text className="mt-1 font-mono-bold text-[10px] tracking-wide2 text-ink-muted">
        {value}
      </Text>
    </View>
  );
}
