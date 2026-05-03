import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppHeader } from "@/components/app-header";
import { LoadingView } from "@/components/loading-view";
import { MarketSentimentCard } from "@/components/market-sentiment-card";
import { NeuralEngineCard } from "@/components/neural-engine-card";
import { PrimaryButton } from "@/components/primary-button";
import { SectionCard } from "@/components/section-card";
import { TerminalLogs } from "@/components/terminal-logs";

export default function ValidateScreen() {
  const [concept, setConcept] = useState("");
  const [background, setBackground] = useState("");
  const [loading, setLoading] = useState(false);

  const canSubmit = concept.trim().length > 0 && background.trim().length > 0;

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-bg">
      <AppHeader />
      {loading ? (
        <LoadingView onCancel={() => setLoading(false)} />
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          className="flex-1"
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingBottom: 32 }}
          >
            <View className="gap-5 px-5 pt-6">
              <View className="self-start rounded-sm bg-accent px-2 py-1">
                <Text className="font-mono text-[11px] font-semibold tracking-terminal text-bg">
                  VALIDATION ENGINE V2.4
                </Text>
              </View>

              <Text className="text-[56px] font-black leading-[1.0] text-ink">
                STRESS{"\n"}TEST <Text className="text-accent">YOUR</Text>
                {"\n"}IDEA
              </Text>

              <Text className="font-sans text-[14px] leading-[20px] text-ink-muted">
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
