import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { DiagnosticPipeline } from "@/components/diagnostic-pipeline";
import { SynthesizingRadar } from "@/components/synthesizing-radar";
import { tokens } from "@/constants/theme";

type Props = {
  onCancel?: () => void;
};

export function LoadingView({ onCancel }: Props) {
  return (
    <ScrollView
      style={styles.flex}
      contentContainerStyle={{ paddingBottom: 32 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.content}>
        <View style={styles.center}>
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

        <View style={styles.center}>
          <Text style={styles.headline}>SYNTHESIZING{"\n"}VERDICT...</Text>
          <Text style={styles.kicker}>REALITY CHECK INCOMING.</Text>
        </View>

        <DiagnosticPipeline />

        <View style={styles.footerRow}>
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
      <Text style={styles.footerLabel}>{label}</Text>
      <Text style={styles.footerValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  content: {
    gap: 32,
    paddingHorizontal: 20,
    paddingTop: 32,
  },
  center: {
    alignItems: "center",
  },
  headline: {
    textAlign: "center",
    color: tokens.accent,
    fontFamily: "Inter_900Black",
    fontSize: 40,
    lineHeight: 42,
  },
  kicker: {
    marginTop: 16,
    color: tokens.ink,
    fontFamily: "SpaceMono_400Regular",
    fontSize: 12,
    letterSpacing: 1.2,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: tokens.hairline,
    paddingTop: 16,
  },
  footerLabel: {
    color: tokens.inkFaint,
    fontFamily: "SpaceMono_400Regular",
    fontSize: 9,
    letterSpacing: 1.2,
  },
  footerValue: {
    marginTop: 4,
    color: tokens.inkMuted,
    fontFamily: "SpaceMono_700Bold",
    fontSize: 10,
    letterSpacing: 1.2,
  },
});
