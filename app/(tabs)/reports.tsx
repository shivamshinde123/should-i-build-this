import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, StyleSheet, Text, View } from "react-native";
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
import { SourceCitations } from "@/components/source-citations";
import { StrengthsVulnerabilities } from "@/components/strengths-vulnerabilities";
import { ViewToggle, type ReportView } from "@/components/view-toggle";
import { tokens, typography } from "@/constants/theme";
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

  if (!session) {
    return (
      <SafeAreaView edges={["top"]} style={styles.safeArea}>
        <AppHeader />
        <View style={styles.emptyWrap}>
          <Text style={styles.emptyLabel}>No report loaded</Text>
          <Text style={styles.emptyText}>
            Run a stress test from the Validate tab to generate a live Builder and Investor report.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const report = session.report;
  const sources = session.sources;
  const builderMetrics = toBuilderMetrics(report);
  const investorMetrics = toInvestorMetrics(report);
  const concerns = toConcerns(report);
  const marketBars = toMarketSizeBars(report);

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <AppHeader />
      <View style={styles.flex}>
        <ScrollView
          style={styles.flex}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 32 }}
        >
          <View style={styles.content}>
            <View>
              <View style={styles.analysisRow}>
                <Text style={styles.analysisLabel}>Analysis report</Text>
                <View style={styles.analysisLine} />
              </View>
              <Text style={styles.reportTitle}>{sanitizeReportText(report.shared.title)}</Text>
              <Text style={styles.reportDescription}>
                {sanitizeReportText(report.shared.description)}
              </Text>
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

            <SourceCitations sources={sources} />
          </View>
        </ScrollView>
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

      <CollapsibleSection number="01" title="Problem clarity" defaultOpen>
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

      <CollapsibleSection number="02" title="Technical feasibility">
        <Text style={styles.bodyText}>
          {sanitizeReportText(report.builder_view.technical_feasibility)}
        </Text>
      </CollapsibleSection>

      <CollapsibleSection number="03" title="Learning value">
        <Text style={styles.bodyText}>{sanitizeReportText(report.builder_view.learning_value)}</Text>
      </CollapsibleSection>

      <CollapsibleSection number="04" title="Approaches to build">
        <Text style={styles.bodyText}>
          {sanitizeReportText(report.builder_view.approaches_to_build)}
        </Text>
      </CollapsibleSection>

      <FinalRecommendationBar
        primaryLabel={sanitizeReportText(report.builder_view.final_recommendation.primary)}
        secondaryLabel={sanitizeReportText(report.builder_view.final_recommendation.secondary)}
      />
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
        title="Market size assessment"
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
              <Text style={styles.targetCaption}>Target sector</Text>
              <Text style={styles.targetValue}>
                {sanitizeReportText(report.investor_view.market_size_assessment.target_sector)}
              </Text>
            </LinearGradient>
          </View>
        </View>
      </CollapsibleSection>

      <CollapsibleSection number="2." title="Defensibility moats" icon="shield-outline">
        <Text style={styles.bodyText}>
          {sanitizeReportText(report.investor_view.defensibility_moats)}
        </Text>
      </CollapsibleSection>

      <CollapsibleSection
        number="3."
        title="Traction requirements"
        icon="trending-up-outline"
      >
        <Text style={styles.bodyText}>
          {sanitizeReportText(report.investor_view.traction_requirements)}
        </Text>
      </CollapsibleSection>

      <CollapsibleSection number="4." title="Business model" icon="business-outline">
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
    ...typography.eyebrow,
  },
  analysisLine: {
    height: 1,
    flex: 1,
    backgroundColor: tokens.hairline,
  },
  reportTitle: {
    marginTop: 12,
    color: tokens.ink,
    ...typography.reportTitle,
  },
  reportDescription: {
    marginTop: 12,
    maxWidth: 330,
    color: tokens.inkMuted,
    ...typography.bodyCompact,
  },
  sectionGap: {
    gap: 16,
  },
  bodyText: {
    color: tokens.inkMuted,
    ...typography.body,
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
    ...typography.eyebrow,
  },
  targetValue: {
    marginTop: 8,
    color: tokens.accent,
    ...typography.sectionValue,
    fontSize: 28,
    lineHeight: 32,
    letterSpacing: 0.4,
    textAlign: "center",
  },
  emptyWrap: {
    flex: 1,
    justifyContent: "center",
    gap: 12,
    paddingHorizontal: 24,
  },
  emptyLabel: {
    color: tokens.accent,
    ...typography.eyebrowStrong,
  },
  emptyText: {
    color: tokens.inkMuted,
    ...typography.body,
  },
});
