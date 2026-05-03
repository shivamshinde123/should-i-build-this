import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppHeader } from "@/components/app-header";
import { CollapsibleSection } from "@/components/collapsible-section";
import { CriticalConcerns, type Concern } from "@/components/critical-concerns";
import { FinalRecommendationBar } from "@/components/final-recommendation-bar";
import { MarketSizeBars } from "@/components/market-size-bars";
import { type MetricCardProps } from "@/components/metric-card";
import { MetricsGrid } from "@/components/metrics-grid";
import { ScoreDisplay } from "@/components/score-display";
import { StrengthsVulnerabilities } from "@/components/strengths-vulnerabilities";
import { ViewToggle, type ReportView } from "@/components/view-toggle";
import { tokens } from "@/constants/theme";

const REPORT = {
  title: "ORBITAL SYNC",
  description:
    "High-precision cloud orchestration engine for distributed aerospace telemetry systems. Validated against current market latency and scalability benchmarks.",
};

const BUILDER_METRICS: MetricCardProps[] = [
  { label: "OVERALL SCORE", value: "6.8", unit: "/10", progress: 0.68 },
  { label: "EST. EFFORT", value: "HIGH", valueColor: "ink", subtitle: "~1,200 Engineering Hrs" },
  {
    label: "RISK LEVEL",
    value: "ELEVATED",
    valueColor: "danger",
    subtitle: "Data Consistency Hazard",
  },
  { label: "MVP TIMELINE", value: "6-8 WKS", valueColor: "ink", subtitle: "To Alpha release" },
];

const INVESTOR_METRICS: MetricCardProps[] = [
  {
    label: "INVESTABILITY SCORE",
    value: "6.5",
    unit: "/10",
    progress: 0.65,
    icon: "trending-up",
  },
  {
    label: "MARKET SIZE (TAM)",
    value: "$12B",
    subtitle: "Global Logistics Segment",
    icon: "pie-chart-outline",
  },
  {
    label: "DEFENSIBILITY",
    value: "LOW",
    valueColor: "ink",
    subtitle: "Open Source Threats",
    icon: "shield-outline",
  },
  {
    label: "TRACTION GOAL",
    value: "10 Pilots",
    valueColor: "ink",
    subtitle: "Q4 2024 Milestone",
    icon: "locate-outline",
  },
];

const CONCERNS: Concern[] = [
  {
    title: "LOW BARRIER TO ENTRY",
    description:
      "Multiple open-source alternatives are emerging in the orbital tracking space, potentially commoditizing the primary feature set.",
  },
  {
    title: "REGULATORY RISK",
    description:
      "New space traffic management protocols pending in the EU could require massive architectural changes within 12 months.",
  },
  {
    title: "SALES CYCLE",
    description:
      "Initial pilot feedback suggests 18-month sales cycles for Tier 1 satellite operators, exceeding current runway projections.",
    severity: "info",
  },
];

export default function ReportsScreen() {
  const [view, setView] = useState<ReportView>("builder");
  const [footerHeight, setFooterHeight] = useState(0);

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
              <Text style={styles.reportTitle}>{REPORT.title}</Text>
              <Text style={styles.reportDescription}>{REPORT.description}</Text>
            </View>

            <ViewToggle value={view} onChange={setView} />

            {view === "builder" ? <BuilderView /> : <InvestorView />}
          </View>
        </ScrollView>

        {view === "builder" ? (
          <View
            onLayout={(e) => setFooterHeight(e.nativeEvent.layout.height)}
            style={styles.footerWrap}
          >
            <FinalRecommendationBar
              primaryLabel="INITIATE_BUILD"
              secondaryLabel="PROCEED WITH REDUCED SCOPE"
            />
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

function BuilderView() {
  return (
    <>
      <MetricsGrid metrics={BUILDER_METRICS} layout="grid" />

      <CollapsibleSection number="01" title="PROBLEM CLARITY" defaultOpen>
        <View style={styles.sectionGap}>
          <Text style={styles.bodyText}>
            The core problem addresses the massive sync latency between ground-station data
            processing and cloud-based telemetry storage. Current solutions lag by &gt;500ms,
            whereas Orbital Sync proposes a sub-50ms window using Edge-Native pre-processing.
          </Text>

          <StrengthsVulnerabilities
            strengths={[
              "Identifiable high-value bottleneck.",
              "Clear differentiation from incumbents.",
            ]}
            vulnerabilities={[
              "High dependency on hardware API access.",
              "Narrow target market (Enterprise focus).",
            ]}
          />

          <ScoreDisplay label="Clarity Score" value="8.5" />
        </View>
      </CollapsibleSection>

      <CollapsibleSection number="02" title="TECHNICAL FEASIBILITY">
        <Text style={styles.bodyText}>
          Edge pre-processing architecture is feasible with existing hardware vendor APIs but
          requires deep firmware-level optimization.
        </Text>
      </CollapsibleSection>

      <CollapsibleSection number="03" title="LEARNING VALUE">
        <Text style={styles.bodyText}>
          High exposure to distributed systems, satellite telemetry pipelines, and edge compute
          orchestration.
        </Text>
      </CollapsibleSection>

      <CollapsibleSection number="04" title="APPROACHES TO BUILD">
        <Text style={styles.bodyText}>
          Three viable paths: (1) Lean MVP with sandbox simulator, (2) pilot integration with one
          Tier-2 partner, (3) full vertical-stack research prototype.
        </Text>
      </CollapsibleSection>
    </>
  );
}

function InvestorView() {
  return (
    <>
      <MetricsGrid metrics={INVESTOR_METRICS} layout="stack" />

      <CollapsibleSection
        number="1."
        title="MARKET SIZE ASSESSMENT"
        icon="bar-chart-outline"
        defaultOpen
      >
        <View style={styles.sectionGap}>
          <MarketSizeBars
            bars={[
              {
                label: "TAM (TOTAL ADDRESSABLE MARKET)",
                value: "$12,000,000,000",
                width: 1.0,
              },
              {
                label: "SAM (SERVICEABLE ADDRESSABLE MARKET)",
                value: "$4,200,000,000",
                width: 0.35,
              },
              {
                label: "SOM (SERVICEABLE OBTAINABLE MARKET)",
                value: "$850,000,000",
                width: 0.07,
              },
            ]}
          />

          <View style={styles.targetCard}>
            <LinearGradient
              colors={["#1c1c1c", "#0a0a0a"]}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              style={styles.targetGradient}
            >
              <Text style={styles.targetCaption}>TARGET SECTOR</Text>
              <Text style={styles.targetValue}>ORBITAL LOGISTICS</Text>
            </LinearGradient>
          </View>
        </View>
      </CollapsibleSection>

      <CollapsibleSection number="2." title="DEFENSIBILITY MOATS" icon="shield-outline">
        <Text style={styles.bodyText}>
          Initial moat is technical-differentiation only; patentability of edge sync algorithms is
          contested.
        </Text>
      </CollapsibleSection>

      <CollapsibleSection
        number="3."
        title="TRACTION REQUIREMENTS"
        icon="trending-up-outline"
      >
        <Text style={styles.bodyText}>
          10 paid pilots within 12 months at $80k-$120k ACV to reach Series-A readiness.
        </Text>
      </CollapsibleSection>

      <CollapsibleSection number="4." title="BUSINESS MODEL" icon="business-outline">
        <Text style={styles.bodyText}>
          Tiered usage-based pricing with premium SLAs for Tier-1 operators; long-term licensing as
          upsell.
        </Text>
      </CollapsibleSection>

      <CriticalConcerns concerns={CONCERNS} />
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
});
