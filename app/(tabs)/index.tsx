import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppHeader } from "@/components/app-header";
import { LoadingView } from "@/components/loading-view";
import { MarketSentimentCard } from "@/components/market-sentiment-card";
import { NeuralEngineCard } from "@/components/neural-engine-card";
import { PrimaryButton } from "@/components/primary-button";
import { SectionCard } from "@/components/section-card";
import { TerminalLogs } from "@/components/terminal-logs";
import { tokens } from "@/constants/theme";

export default function ValidateScreen() {
  const [concept, setConcept] = useState("");
  const [background, setBackground] = useState("");
  const [loading, setLoading] = useState(false);

  const canSubmit = concept.trim().length > 0 && background.trim().length > 0;

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <AppHeader />
      {loading ? (
        <LoadingView onCancel={() => setLoading(false)} />
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.flex}
        >
          <ScrollView
            style={styles.flex}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingBottom: 32 }}
          >
            <View style={styles.content}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>VALIDATION ENGINE V2.4</Text>
              </View>

              <Text style={styles.hero}>
                STRESS{"\n"}TEST <Text style={styles.heroAccent}>YOUR</Text>
                {"\n"}IDEA
              </Text>

              <Text style={styles.subtitle}>
                Submit your concept to our ruthless, data-driven validation engine. We don&apos;t
                do &quot;maybe.&quot; We do market reality.
              </Text>

              <SectionCard
                number="01"
                title="THE CONCEPT"
                required
                value={concept}
                onChangeText={setConcept}
                placeholder="Describe your project idea in detail. What problem does it solve? Who is the target user? How does it generate value?"
                minHeight={110}
              />

              <SectionCard
                number="02"
                title="FOUNDER BACKGROUND"
                required
                value={background}
                onChangeText={setBackground}
                placeholder="Tell us why you are the right person to build this. Previous experience, unique insights, and available resources."
                minHeight={110}
              />

              <PrimaryButton
                label="STRESS TEST THIS"
                icon="flash"
                disabled={!canSubmit}
                onPress={() => setLoading(true)}
              />

              <MarketSentimentCard />

              <TerminalLogs />

              <NeuralEngineCard />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: tokens.bg,
  },
  flex: {
    flex: 1,
  },
  content: {
    gap: 20,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  badge: {
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: tokens.accent,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  badgeText: {
    color: tokens.accent,
    fontFamily: "SpaceMono_700Bold",
    fontSize: 10,
    letterSpacing: 1.2,
  },
  hero: {
    color: tokens.ink,
    fontFamily: "Inter_900Black",
    fontSize: 58,
    lineHeight: 58,
    letterSpacing: -2,
  },
  heroAccent: {
    color: tokens.accent,
  },
  subtitle: {
    maxWidth: 320,
    color: tokens.inkMuted,
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    lineHeight: 20,
  },
});
