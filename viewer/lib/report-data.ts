import { createClient } from "@supabase/supabase-js";

import type { AnalysisPayload, PublicReport, Severity } from "./report-types";

const SLUG_PATTERN = /^[a-z0-9]{8}$/;

type RawReportRow = {
  slug: string;
  created_at: string;
  model: string;
  idea_text: string;
  background_text: string | null;
  shared_view: unknown;
  builder_view: unknown;
  investor_view: unknown;
};

export function isValidReportSlug(slug: string): boolean {
  return SLUG_PATTERN.test(slug);
}

export async function getPublicReportBySlug(slug: string): Promise<PublicReport | null> {
  const supabase = createClient(getEnv("SUPABASE_URL"), getEnv("SUPABASE_SERVICE_ROLE_KEY"), {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  const { data, error } = await supabase
    .from("reports")
    .select(
      "slug, created_at, model, idea_text, background_text, shared_view, builder_view, investor_view",
    )
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return normalizeReportRow(data as RawReportRow);
}

function normalizeReportRow(row: RawReportRow): PublicReport | null {
  const builder = row.builder_view;
  const investor = row.investor_view;

  if (!isBuilderView(builder) || !isInvestorView(investor)) {
    return null;
  }

  const shared = isSharedView(row.shared_view)
    ? row.shared_view
    : deriveSharedView(row.idea_text, row.background_text);

  return {
    slug: row.slug,
    created_at: row.created_at,
    model: row.model,
    idea_text: row.idea_text,
    background_text: row.background_text,
    builder_view: builder,
    investor_view: investor,
    shared,
  };
}

function deriveSharedView(ideaText: string, backgroundText: string | null): AnalysisPayload["shared"] {
  const titleSeed = ideaText.replace(/\s+/g, " ").trim();
  const descriptionSeed = (backgroundText || ideaText).replace(/\s+/g, " ").trim();

  return {
    title: titleSeed.length > 56 ? `${titleSeed.slice(0, 53)}...` : titleSeed,
    description:
      descriptionSeed.length > 180 ? `${descriptionSeed.slice(0, 177)}...` : descriptionSeed,
  };
}

function getEnv(name: "SUPABASE_URL" | "SUPABASE_SERVICE_ROLE_KEY"): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is required for the web viewer.`);
  }
  return value;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isSeverity(value: unknown): value is Severity {
  return value === "warn" || value === "info";
}

function isSharedView(value: unknown): value is AnalysisPayload["shared"] {
  return (
    isRecord(value) && typeof value.title === "string" && typeof value.description === "string"
  );
}

function isBuilderView(value: unknown): value is AnalysisPayload["builder_view"] {
  if (!isRecord(value)) return false;
  if (typeof value.overall_score !== "number") return false;
  if (!["LOW", "MEDIUM", "HIGH"].includes(String(value.estimated_effort))) return false;
  if (!["LOW", "MODERATE", "ELEVATED", "HIGH"].includes(String(value.risk_level))) return false;
  if (typeof value.mvp_timeline !== "string") return false;
  if (typeof value.technical_feasibility !== "string") return false;
  if (typeof value.learning_value !== "string") return false;
  if (typeof value.approaches_to_build !== "string") return false;

  const problem = value.problem_clarity;
  const recommendation = value.final_recommendation;

  return (
    isRecord(problem) &&
    typeof problem.summary === "string" &&
    isStringArray(problem.strengths) &&
    isStringArray(problem.vulnerabilities) &&
    typeof problem.clarity_score === "number" &&
    isRecord(recommendation) &&
    typeof recommendation.primary === "string" &&
    typeof recommendation.secondary === "string"
  );
}

function isInvestorView(value: unknown): value is AnalysisPayload["investor_view"] {
  if (!isRecord(value)) return false;
  if (typeof value.investability_score !== "number") return false;
  if (typeof value.market_size_tam !== "string") return false;
  if (typeof value.defensibility !== "string") return false;
  if (typeof value.traction_goal !== "string") return false;
  if (typeof value.defensibility_moats !== "string") return false;
  if (typeof value.traction_requirements !== "string") return false;
  if (typeof value.business_model !== "string") return false;
  if (!Array.isArray(value.critical_concerns)) return false;

  const market = value.market_size_assessment;
  if (
    !isRecord(market) ||
    typeof market.tam !== "string" ||
    typeof market.sam !== "string" ||
    typeof market.som !== "string" ||
    typeof market.target_sector !== "string"
  ) {
    return false;
  }

  return value.critical_concerns.every((concern) => {
    if (!isRecord(concern)) return false;
    return (
      typeof concern.title === "string" &&
      typeof concern.description === "string" &&
      isSeverity(concern.severity)
    );
  });
}
