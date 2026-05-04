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
      label: "Overall score",
      value: formatScore(builder.overall_score),
      unit: "/10",
      progress: clamp01(builder.overall_score / 10),
    },
    {
      label: "Build effort",
      value: formatEnumLabel(builder.estimated_effort),
      valueColor: "ink",
      subtitle: summarizeEffort(builder.estimated_effort),
    },
    {
      label: "Risk level",
      value: formatEnumLabel(builder.risk_level),
      valueColor: isHighRisk(builder.risk_level) ? "danger" : "ink",
      subtitle: sanitizeReportText(builder.technical_feasibility),
    },
    {
      label: "Build timeline",
      value: builder.mvp_timeline,
      valueColor: "ink",
      subtitle: "Target delivery window",
    },
  ];
}

export function toInvestorMetrics(report: AnalysisPayload): MetricCardProps[] {
  const investor = report.investor_view;

  return [
    {
      label: "Investability score",
      value: formatScore(investor.investability_score),
      unit: "/10",
      progress: clamp01(investor.investability_score / 10),
      icon: "trending-up",
    },
    {
      label: "Total addressable market",
      value: compactMarketValue(investor.market_size_assessment.tam, investor.market_size_tam),
      subtitle: sanitizeReportText(investor.market_size_tam),
      icon: "pie-chart-outline",
    },
    {
      label: "Defensibility",
      value: summarizeDefensibility(investor.defensibility),
      valueColor: "ink",
      subtitle: sanitizeReportText(investor.defensibility),
      icon: "shield-outline",
    },
    {
      label: "Traction goal",
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
      label: "Total addressable market",
      value: sanitizeReportText(market.tam),
      width: widths[0],
    },
    {
      label: "Serviceable addressable market",
      value: sanitizeReportText(market.sam),
      width: widths[1],
    },
    {
      label: "Serviceable obtainable market",
      value: sanitizeReportText(market.som),
      width: widths[2],
    },
  ];
}

export function toConcerns(report: AnalysisPayload): Concern[] {
  return report.investor_view.critical_concerns.map((concern) => ({
    title: sanitizeReportText(concern.title),
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
  if (upper.includes("WEAK")) return "Weak";
  if (upper.includes("LOW")) return "Low";
  if (upper.includes("MODERATE")) return "Moderate";
  if (upper.includes("HIGH")) return "High";
  return sentenceCase(upper.slice(0, 18) || "UNCLEAR");
}

function summarizeEffort(value: AnalysisPayload["builder_view"]["estimated_effort"]): string {
  if (value === "HIGH") return "Heavy execution load";
  if (value === "MEDIUM") return "Moderate build scope";
  return "Lean MVP friendly";
}

function compactMarketValue(primary: string, fallback: string): string {
  const source = sanitizeReportText(primary || fallback);
  const match = source.match(/\$[\d.,]+(?:\s?[BMK]|(?:\s?billion|\s?million|\s?thousand))?/i);
  return match?.[0] ?? source.slice(0, 22);
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

function formatEnumLabel(value: string): string {
  return value
    .toLowerCase()
    .split(/[_\s]+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function sentenceCase(value: string): string {
  const lower = value.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}
