import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppHeader } from "@/components/app-header";
import { CollapsibleSection } from "@/components/collapsible-section";
import { CriticalConcerns, type Concern } from "@/components/critical-concerns";
import { FinalRecommendationBar } from "@/components/final-recommendation-bar";
import { MarketSizeBars } from "@/components/market-size-bars";
import { type MetricCardProps } from "@/components/metric-card";
import { MetricsGrid } from "@/components/metrics-grid";
import { useReportSession } from "@/components/report-session-provider";
import { ScoreDisplay } from "@/components/score-display";
import { StrengthsVulnerabilities } from "@/components/strengths-vulnerabilities";
import { ViewToggle, type ReportView } from "@/components/view-toggle";
import { tokens } from "@/constants/theme";
import {
  sanitizeReportText,
  toBuilderMetrics,
  toConcerns,
  toInvestorMetrics,
  toMarketSizeBars,
} from "@/lib/report-presentation";
import type { AnalysisPayload } from "@/types/analysis";

export default function ReportsScreen() {
  const { session } = useReportSession();
  const [view, setView] = useState<ReportView>("builder");
  const [footerHeight, setFooterHeight] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!session) {
    return (
      <SafeAreaView edges={["top"]} style={styles.safeArea}>
        <AppHeader />
        <View style={styles.emptyWrap}>
          <Text style={styles.emptyLabel}>NO REPORT LOADED</Text>
          <Text style={styles.emptyText}>
            Run a stress test from the Validate tab to generate a live Builder and Investor report.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const report = session.report;
  const builderMetrics = toBuilderMetrics(report);
  const investorMetrics = toInvestorMetrics(report);
  const concerns = toConcerns(report);
  const marketBars = toMarketSizeBars(report);

  const handleCopyShareLink = async () => {
    await Clipboard.setStringAsync(session.shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <AppHeader />
      <View style={styles.flex}>
        <ScrollView
          style={styles.flex}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: (view === "builder" ? footerHeight : 0) + 32,
          }}
        >
          <View style={styles.content}>
            <View>
              <View style={styles.analysisRow}>
                <Text style={styles.analysisLabel}>ANALYSIS REPORT</Text>
                <View style={styles.analysisLine} />
              </View>
              <Text style={styles.reportTitle}>{sanitizeReportText(report.shared.title)}</Text>
              <Text style={styles.reportDescription}>
                {sanitizeReportText(report.shared.description)}
              </Text>

              <Pressable
                onPress={handleCopyShareLink}
                accessibilityRole="button"
                accessibilityLabel="Copy share report link"
                style={({ pressed }) => [
                  styles.shareButton,
                  pressed ? styles.shareButtonPressed : null,
                ]}
              >
                <Ionicons name="copy-outline" size={14} color={tokens.accent} />
                <Text style={styles.shareButtonLabel}>
                  {copied ? "SHARE LINK COPIED" : "COPY SHARE LINK"}
                </Text>
              </Pressable>
            </View>

            <ViewToggle value={view} onChange={setView} />

            {view === "builder" ? (
              <BuilderView report={report} metrics={builderMetrics} />
            ) : (
              <InvestorView
                report={report}
                metrics={investorMetrics}
                concerns={concerns}
                bars={marketBars}
              />
            )}
          </View>
        </ScrollView>

        {view === "builder" ? (
          <View
            onLayout={(e) => setFooterHeight(e.nativeEvent.layout.height)}
            style={styles.footerWrap}
          >
            <FinalRecommendationBar
              primaryLabel={sanitizeReportText(report.builder_view.final_recommendation.primary)}
              secondaryLabel={sanitizeReportText(report.builder_view.final_recommendation.secondary)}
            />
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

function BuilderView({
  report,
  metrics,
}: {
  report: AnalysisPayload;
  metrics: MetricCardProps[];
}) {
  return (
    <>
      <MetricsGrid metrics={metrics} layout="grid" />

      <CollapsibleSection number="01" title="PROBLEM CLARITY" defaultOpen>
        <View style={styles.sectionGap}>
          <Text style={styles.bodyText}>
            {sanitizeReportText(report.builder_view.problem_clarity.summary)}
          </Text>

          <StrengthsVulnerabilities
            strengths={report.builder_view.problem_clarity.strengths.map(sanitizeReportText)}
            vulnerabilities={report.builder_view.problem_clarity.vulnerabilities.map(
              sanitizeReportText,
            )}
          />

          <ScoreDisplay
            label="Clarity Score"
            value={`${report.builder_view.problem_clarity.clarity_score}`}
          />
        </View>
      </CollapsibleSection>

      <CollapsibleSection number="02" title="TECHNICAL FEASIBILITY">
        <Text style={styles.bodyText}>
          {sanitizeReportText(report.builder_view.technical_feasibility)}
        </Text>
      </CollapsibleSection>

      <CollapsibleSection number="03" title="LEARNING VALUE">
        <Text style={styles.bodyText}>{sanitizeReportText(report.builder_view.learning_value)}</Text>
      </CollapsibleSection>

      <CollapsibleSection number="04" title="APPROACHES TO BUILD">
        <Text style={styles.bodyText}>
          {sanitizeReportText(report.builder_view.approaches_to_build)}
        </Text>
      </CollapsibleSection>
    </>
  );
}

function InvestorView({
  report,
  metrics,
  concerns,
  bars,
}: {
  report: AnalysisPayload;
  metrics: MetricCardProps[];
  concerns: Concern[];
  bars: { label: string; value: string; width: number }[];
}) {
  return (
    <>
      <MetricsGrid metrics={metrics} layout="stack" />

      <CollapsibleSection
        number="1."
        title="MARKET SIZE ASSESSMENT"
        icon="bar-chart-outline"
        defaultOpen
      >
        <View style={styles.sectionGap}>
          <MarketSizeBars bars={bars} />

          <View style={styles.targetCard}>
            <LinearGradient
              colors={["#1c1c1c", "#0a0a0a"]}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              style={styles.targetGradient}
            >
              <Text style={styles.targetCaption}>TARGET SECTOR</Text>
              <Text style={styles.targetValue}>
                {sanitizeReportText(
                  report.investor_view.market_size_assessment.target_sector,
                ).toUpperCase()}
              </Text>
            </LinearGradient>
          </View>
        </View>
      </CollapsibleSection>

      <CollapsibleSection number="2." title="DEFENSIBILITY MOATS" icon="shield-outline">
        <Text style={styles.bodyText}>
          {sanitizeReportText(report.investor_view.defensibility_moats)}
        </Text>
      </CollapsibleSection>

      <CollapsibleSection
        number="3."
        title="TRACTION REQUIREMENTS"
        icon="trending-up-outline"
      >
        <Text style={styles.bodyText}>
          {sanitizeReportText(report.investor_view.traction_requirements)}
        </Text>
      </CollapsibleSection>

      <CollapsibleSection number="4." title="BUSINESS MODEL" icon="business-outline">
        <Text style={styles.bodyText}>
          {sanitizeReportText(report.investor_view.business_model)}
        </Text>
      </CollapsibleSection>

      <CriticalConcerns concerns={concerns} />
    </>
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
  analysisRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  analysisLabel: {
    color: tokens.inkMuted,
    fontFamily: "SpaceMono_400Regular",
    fontSize: 10,
    letterSpacing: 1.2,
  },
  analysisLine: {
    height: 1,
    flex: 1,
    backgroundColor: tokens.hairline,
  },
  reportTitle: {
    marginTop: 12,
    color: tokens.ink,
    fontFamily: "Inter_500Medium",
    fontSize: 24,
    lineHeight: 26,
  },
  reportDescription: {
    marginTop: 12,
    maxWidth: 330,
    color: tokens.inkMuted,
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    lineHeight: 18,
  },
  shareButton: {
    marginTop: 16,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: tokens.accent,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  shareButtonPressed: {
    backgroundColor: "rgba(245, 200, 66, 0.08)",
  },
  shareButtonLabel: {
    color: tokens.accent,
    fontFamily: "SpaceMono_700Bold",
    fontSize: 10,
    letterSpacing: 1.2,
  },
  footerWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  sectionGap: {
    gap: 16,
  },
  bodyText: {
    color: tokens.inkMuted,
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    lineHeight: 18,
  },
  targetCard: {
    overflow: "hidden",
    borderWidth: 1,
    borderColor: tokens.hairline,
  },
  targetGradient: {
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 28,
  },
  targetCaption: {
    color: tokens.inkDim,
    fontFamily: "SpaceMono_400Regular",
    fontSize: 10,
    letterSpacing: 1.2,
  },
  targetValue: {
    marginTop: 8,
    color: tokens.accent,
    fontFamily: "Inter_900Black",
    fontSize: 22,
    letterSpacing: 0.8,
  },
  emptyWrap: {
    flex: 1,
    justifyContent: "center",
    gap: 12,
    paddingHorizontal: 24,
  },
  emptyLabel: {
    color: tokens.accent,
    fontFamily: "SpaceMono_700Bold",
    fontSize: 11,
    letterSpacing: 1.2,
  },
  emptyText: {
    color: tokens.inkMuted,
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    lineHeight: 22,
  },
});
