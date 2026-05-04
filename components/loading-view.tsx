import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { DiagnosticPipeline } from "@/components/diagnostic-pipeline";
import { SynthesizingRadar } from "@/components/synthesizing-radar";
import { tokens, typography } from "@/constants/theme";

type Props = {
  onCancel?: () => void;
};

export function LoadingView({ onCancel }: Props) {
  return (
    <ScrollView
      style={styles.flex}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.content}>
        <View style={styles.heroWrap}>
          {onCancel ? (
            <Pressable
              onPress={onCancel}
              accessibilityRole="button"
              accessibilityLabel="Cancel stress test"
            >
              <SynthesizingRadar size={312} />
            </Pressable>
          ) : (
            <SynthesizingRadar size={312} />
          )}
        </View>

        <View style={styles.center}>
          <Text style={styles.headline}>Synthesizing{"\n"}verdict...</Text>
          <Text style={styles.kicker}>Reality check incoming.</Text>
        </View>

        <DiagnosticPipeline />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  content: {
    gap: 22,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  center: {
    alignItems: "center",
  },
  heroWrap: {
    alignItems: "center",
    marginBottom: 4,
  },
  headline: {
    textAlign: "center",
    color: tokens.accent,
    ...typography.hero,
    fontSize: 48,
    lineHeight: 48,
  },
  kicker: {
    marginTop: 18,
    color: tokens.ink,
    ...typography.titleSans,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0.2,
  },
});
