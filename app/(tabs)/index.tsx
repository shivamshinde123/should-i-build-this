import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
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
import { useReportSession } from "@/components/report-session-provider";
import { SectionCard } from "@/components/section-card";
import { TerminalLogs } from "@/components/terminal-logs";
import { tokens } from "@/constants/theme";
import { invokeAnalyze } from "@/lib/analyze-client";

export default function ValidateScreen() {
  const router = useRouter();
  const { clearSession, setSession } = useReportSession();
  const [concept, setConcept] = useState("");
  const [background, setBackground] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const canSubmit = concept.trim().length > 0 && background.trim().length > 0;

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const handleStressTestPress = async () => {
    if (!canSubmit) return;

    const controller = new AbortController();
    abortRef.current = controller;
    clearSession();
    setError(null);
    setLoading(true);

    try {
      const response = await invokeAnalyze(
        {
          ideaText: concept.trim(),
          backgroundText: background.trim(),
        },
        controller.signal,
      );

      setSession(response);
      setLoading(false);
      router.push("/reports");
    } catch (requestError) {
      if ((requestError as Error).name === "AbortError") {
        return;
      }

      setLoading(false);
      setError((requestError as Error).message || "Stress test failed. Try again.");
    } finally {
      abortRef.current = null;
    }
  };

  const handleCancel = () => {
    abortRef.current?.abort();
    abortRef.current = null;
    setLoading(false);
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <AppHeader />
      {loading ? (
        <LoadingView onCancel={handleCancel} />
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

              <Pressable
                accessibilityRole="button"
                accessibilityLabel="STRESS TEST THIS"
                accessibilityState={{ disabled: !canSubmit }}
                disabled={!canSubmit}
                onPress={handleStressTestPress}
                style={styles.ctaPressable}
              >
                {({ pressed }) => (
                  <View
                    style={[
                      styles.ctaButton,
                      pressed ? styles.ctaButtonPressed : null,
                      !canSubmit ? styles.ctaButtonDisabled : null,
                    ]}
                  >
                    <Ionicons name="flash" size={16} color={tokens.bg} />
                    <Text style={styles.ctaLabel}>STRESS TEST THIS</Text>
                  </View>
                )}
              </Pressable>

              {error ? <Text style={styles.errorText}>{error}</Text> : null}

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
  ctaPressable: {
    width: "100%",
  },
  ctaButton: {
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: tokens.accent,
    backgroundColor: tokens.accent,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  ctaButtonPressed: {
    backgroundColor: tokens.accentGlow,
    borderColor: tokens.accentGlow,
  },
  ctaButtonDisabled: {
    backgroundColor: "rgba(245, 200, 66, 0.72)",
    borderColor: "rgba(245, 200, 66, 0.72)",
  },
  ctaLabel: {
    marginLeft: 10,
    color: tokens.bg,
    fontFamily: "Inter_700Bold",
    fontSize: 12,
    letterSpacing: 0.8,
  },
  errorText: {
    color: "#fca5a5",
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    lineHeight: 18,
  },
});
