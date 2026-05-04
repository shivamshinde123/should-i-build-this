import type { Concern } from "@/components/critical-concerns";
import type { MetricCardProps } from "@/components/metric-card";
import type { AnalysisPayload } from "@/types/analysis";

const DEFAULT_BAR_WIDTHS = [1, 0.35, 0.07] as const;

export function sanitizeReportText(input: string): string {
  return input
    .replace(/<cite[^>]*>.*?<\/cite>/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

export function toBuilderMetrics(report: AnalysisPayload): MetricCardProps[] {
  const builder = report.builder_view;

  return [
    {
      label: "OVERALL SCORE",
      value: formatScore(builder.overall_score),
      unit: "/10",
      progress: clamp01(builder.overall_score / 10),
    },
    {
      label: "EST. EFFORT",
      value: builder.estimated_effort,
      valueColor: "ink",
      subtitle: summarizeEffort(builder.estimated_effort),
    },
    {
      label: "RISK LEVEL",
      value: builder.risk_level,
      valueColor: isHighRisk(builder.risk_level) ? "danger" : "ink",
      subtitle: sanitizeReportText(builder.technical_feasibility),
    },
    {
      label: "MVP TIMELINE",
      value: builder.mvp_timeline.toUpperCase(),
      valueColor: "ink",
      subtitle: "TARGET DELIVERY WINDOW",
    },
  ];
}

export function toInvestorMetrics(report: AnalysisPayload): MetricCardProps[] {
  const investor = report.investor_view;

  return [
    {
      label: "INVESTABILITY SCORE",
      value: formatScore(investor.investability_score),
      unit: "/10",
      progress: clamp01(investor.investability_score / 10),
      icon: "trending-up",
    },
    {
      label: "MARKET SIZE (TAM)",
      value: compactMarketValue(investor.market_size_assessment.tam, investor.market_size_tam),
      subtitle: sanitizeReportText(investor.market_size_tam),
      icon: "pie-chart-outline",
    },
    {
      label: "DEFENSIBILITY",
      value: summarizeDefensibility(investor.defensibility),
      valueColor: "ink",
      subtitle: sanitizeReportText(investor.defensibility),
      icon: "shield-outline",
    },
    {
      label: "TRACTION GOAL",
      value: sanitizeReportText(investor.traction_goal),
      valueColor: "ink",
      subtitle: sanitizeReportText(investor.traction_requirements),
      icon: "locate-outline",
    },
  ];
}

export function toMarketSizeBars(report: AnalysisPayload) {
  const market = report.investor_view.market_size_assessment;
  const parsed = [market.tam, market.sam, market.som].map(parseMagnitude);

  let widths: number[] = [0.34, 0.34, 0.34];
  if (parsed.every((value) => value !== null) && parsed[0] && parsed[0] > 0) {
    widths = parsed.map((value) => clamp01((value ?? 0) / parsed[0]));
  }

  return [
    {
      label: "TAM (TOTAL ADDRESSABLE MARKET)",
      value: sanitizeReportText(market.tam),
      width: widths[0],
    },
    {
      label: "SAM (SERVICEABLE ADDRESSABLE MARKET)",
      value: sanitizeReportText(market.sam),
      width: widths[1],
    },
    {
      label: "SOM (SERVICEABLE OBTAINABLE MARKET)",
      value: sanitizeReportText(market.som),
      width: widths[2],
    },
  ];
}

export function toConcerns(report: AnalysisPayload): Concern[] {
  return report.investor_view.critical_concerns.map((concern) => ({
    title: sanitizeReportText(concern.title).toUpperCase(),
    description: sanitizeReportText(concern.description),
    severity: concern.severity,
  }));
}

function formatScore(value: number): string {
  return Number.isInteger(value) ? `${value}` : value.toFixed(1);
}

function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value));
}

function isHighRisk(level: AnalysisPayload["builder_view"]["risk_level"]): boolean {
  return level === "ELEVATED" || level === "HIGH";
}

function summarizeDefensibility(value: string): string {
  const upper = sanitizeReportText(value).toUpperCase();
  if (upper.includes("WEAK")) return "WEAK";
  if (upper.includes("LOW")) return "LOW";
  if (upper.includes("MODERATE")) return "MODERATE";
  if (upper.includes("HIGH")) return "HIGH";
  return upper.slice(0, 18) || "UNCLEAR";
}

function summarizeEffort(value: AnalysisPayload["builder_view"]["estimated_effort"]): string {
  if (value === "HIGH") return "HEAVY EXECUTION LOAD";
  if (value === "MEDIUM") return "MODERATE BUILD SCOPE";
  return "LEAN MVP FRIENDLY";
}

function compactMarketValue(primary: string, fallback: string): string {
  const source = sanitizeReportText(primary || fallback);
  const match = source.match(/\$[\d.,]+(?:\s?[BMK]|(?:\s?billion|\s?million|\s?thousand))?/i);
  return match?.[0]?.toUpperCase() ?? source.slice(0, 18).toUpperCase();
}

function parseMagnitude(value: string): number | null {
  const match = sanitizeReportText(value).match(/\$?\s*([\d.,]+)\s*([BMK]|billion|million|thousand)?/i);
  if (!match) return null;

  const amount = Number(match[1].replace(/,/g, ""));
  if (!Number.isFinite(amount)) return null;

  const suffix = match[2]?.toLowerCase();
  if (!suffix) return amount;
  if (suffix === "b" || suffix === "billion") return amount * 1_000_000_000;
  if (suffix === "m" || suffix === "million") return amount * 1_000_000;
  if (suffix === "k" || suffix === "thousand") return amount * 1_000;
  return amount;
}
