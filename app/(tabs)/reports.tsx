import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
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

const REPORT = {
  title: "ORBITAL SYNC",
  description:
    "High-precision cloud orchestration engine for distributed aerospace telemetry systems. Validated against current market latency and scalability benchmarks.",
};

const BUILDER_METRICS: MetricCardProps[] = [
  { label: "OVERALL SCORE", value: "6.8", unit: "/10", progress: 0.68 },
  { label: "EST. EFFORT", value: "HIGH", subtitle: "~1,200 Engineering Hrs" },
  {
    label: "RISK LEVEL",
    value: "ELEVATED",
    valueColor: "danger",
    subtitle: "Data Consistency Hazard",
  },
  { label: "MVP TIMELINE", value: "6-8 WKS", subtitle: "To Alpha release" },
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
    valueColor: "danger",
    subtitle: "Open Source Threats",
    icon: "shield-outline",
  },
  {
    label: "TRACTION GOAL",
    value: "10 Pilots",
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
  },
];

export default function ReportsScreen() {
  const [view, setView] = useState<ReportView>("builder");
  const [footerHeight, setFooterHeight] = useState(0);

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-bg">
      <AppHeader />
      <View className="flex-1">
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: (view === "builder" ? footerHeight : 0) + 32,
          }}
        >
          <View className="gap-5 px-5 pt-6">
            <View>
              <Text className="font-mono text-[10px] tracking-terminal text-ink-muted">
                ANALYSIS REPORT
              </Text>
              <Text className="mt-1 font-mono text-[14px] font-bold tracking-terminal text-ink">
                {REPORT.title}
              </Text>
              <Text className="mt-3 font-sans text-[13px] leading-[18px] text-ink-muted">
                {REPORT.description}
              </Text>
            </View>

            <ViewToggle value={view} onChange={setView} />

            {view === "builder" ? <BuilderView /> : <InvestorView />}
          </View>
        </ScrollView>

        {view === "builder" ? (
          <View
            onLayout={(e) => setFooterHeight(e.nativeEvent.layout.height)}
            className="absolute bottom-0 left-0 right-0"
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
        <View className="gap-4">
          <Text className="font-sans text-[13px] leading-[18px] text-ink-muted">
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
        <Text className="font-sans text-[13px] leading-[18px] text-ink-muted">
          Edge pre-processing architecture is feasible with existing hardware vendor APIs but
          requires deep firmware-level optimization.
        </Text>
      </CollapsibleSection>

      <CollapsibleSection number="03" title="LEARNING VALUE">
        <Text className="font-sans text-[13px] leading-[18px] text-ink-muted">
          High exposure to distributed systems, satellite telemetry pipelines, and edge compute
          orchestration.
        </Text>
      </CollapsibleSection>

      <CollapsibleSection number="04" title="APPROACHES TO BUILD">
        <Text className="font-sans text-[13px] leading-[18px] text-ink-muted">
          Three viable paths: (1) Lean MVP with sandbox simulator, (2) pilot integration with
          one Tier-2 partner, (3) full vertical-stack research prototype.
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
        <View className="gap-4">
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

          <View className="items-center rounded-sm bg-elevated px-4 py-7">
            <Text className="font-mono text-[10px] tracking-terminal text-ink-dim">
              TARGET SECTOR
            </Text>
            <Text className="mt-2 font-mono text-[20px] font-black tracking-terminal text-accent">
              ORBITAL LOGISTICS
            </Text>
          </View>
        </View>
      </CollapsibleSection>

      <CollapsibleSection number="2." title="DEFENSIBILITY MOATS" icon="shield-outline">
        <Text className="font-sans text-[13px] leading-[18px] text-ink-muted">
          Initial moat is technical-differentiation only; patentability of edge sync algorithms
          is contested.
        </Text>
      </CollapsibleSection>

      <CollapsibleSection
        number="3."
        title="TRACTION REQUIREMENTS"
        icon="trending-up-outline"
      >
        <Text className="font-sans text-[13px] leading-[18px] text-ink-muted">
          10 paid pilots within 12 months at $80k–$120k ACV to reach Series-A readiness.
        </Text>
      </CollapsibleSection>

      <CollapsibleSection number="4." title="BUSINESS MODEL" icon="business-outline">
        <Text className="font-sans text-[13px] leading-[18px] text-ink-muted">
          Tiered usage-based pricing with premium SLAs for Tier-1 operators; long-term licensing
          as upsell.
        </Text>
      </CollapsibleSection>

      <CriticalConcerns concerns={CONCERNS} />
    </>
  );
}
