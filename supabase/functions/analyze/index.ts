import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { customAlphabet } from "npm:nanoid@5";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
};

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
const ANTHROPIC_VERSION = "2023-06-01";
const ANTHROPIC_MODEL = "claude-sonnet-4-20250514";
const MAX_TOKENS = 4096;
const generateSlug = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 8);
const MAX_SLUG_ATTEMPTS = 3;

const SYSTEM_PROMPT = `You are "Should I Build This?", a brutally honest senior engineer + product thinker.

Your job is to analyze a project idea for two audiences:
1. Builder View: should the user build this as a side project?
2. Investor View: could this idea become venture-backable?

Requirements:
- Use web search when current market or competitor information matters.
- Be direct, specific, and evidence-based.
- Do not flatter the user.
- Return JSON only. No markdown. No code fences. No prose outside the JSON object.
- If information is uncertain, say so explicitly.

Output schema:
{
  "builder_view": {
    "overall_score": number,
    "estimated_effort": "LOW" | "MEDIUM" | "HIGH",
    "risk_level": "LOW" | "MODERATE" | "ELEVATED" | "HIGH",
    "mvp_timeline": string,
    "problem_clarity": {
      "summary": string,
      "strengths": string[],
      "vulnerabilities": string[],
      "clarity_score": number
    },
    "technical_feasibility": string,
    "learning_value": string,
    "approaches_to_build": string,
    "final_recommendation": {
      "primary": string,
      "secondary": string
    }
  },
  "investor_view": {
    "investability_score": number,
    "market_size_tam": string,
    "defensibility": string,
    "traction_goal": string,
    "market_size_assessment": {
      "tam": string,
      "sam": string,
      "som": string,
      "target_sector": string
    },
    "defensibility_moats": string,
    "traction_requirements": string,
    "business_model": string,
    "critical_concerns": [
      {
        "title": string,
        "description": string,
        "severity": "warn" | "info"
      }
    ]
  },
  "shared": {
    "title": string,
    "description": string
  }
}`;

type Severity = "warn" | "info";

type AnalysisPayload = {
  builder_view: {
    overall_score: number;
    estimated_effort: "LOW" | "MEDIUM" | "HIGH";
    risk_level: "LOW" | "MODERATE" | "ELEVATED" | "HIGH";
    mvp_timeline: string;
    problem_clarity: {
      summary: string;
      strengths: string[];
      vulnerabilities: string[];
      clarity_score: number;
    };
    technical_feasibility: string;
    learning_value: string;
    approaches_to_build: string;
    final_recommendation: {
      primary: string;
      secondary: string;
    };
  };
  investor_view: {
    investability_score: number;
    market_size_tam: string;
    defensibility: string;
    traction_goal: string;
    market_size_assessment: {
      tam: string;
      sam: string;
      som: string;
      target_sector: string;
    };
    defensibility_moats: string;
    traction_requirements: string;
    business_model: string;
    critical_concerns: Array<{
      title: string;
      description: string;
      severity: Severity;
    }>;
  };
  shared: {
    title: string;
    description: string;
  };
};

type AnalyzeRequest = {
  ideaText?: string;
  backgroundText?: string;
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  const anthropicApiKey = Deno.env.get("ANTHROPIC_API_KEY");
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!anthropicApiKey || !supabaseUrl || !serviceRoleKey) {
    return jsonResponse(
      { error: "Server is missing required environment configuration." },
      500,
    );
  }

  let body: AnalyzeRequest;
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON body." }, 400);
  }

  const ideaText = body.ideaText?.trim() ?? "";
  const backgroundText = body.backgroundText?.trim() ?? "";

  if (!ideaText) {
    return jsonResponse({ error: "ideaText is required." }, 400);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  const anthropicResponse = await fetch(ANTHROPIC_API_URL, {
    method: "POST",
    headers: {
      "x-api-key": anthropicApiKey,
      "anthropic-version": ANTHROPIC_VERSION,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: ANTHROPIC_MODEL,
      max_tokens: MAX_TOKENS,
      system: [
        {
          type: "text",
          text: SYSTEM_PROMPT,
          cache_control: { type: "ephemeral" },
        },
      ],
      messages: [
        {
          role: "user",
          content: buildUserPrompt(ideaText, backgroundText),
        },
      ],
      tools: [
        {
          type: "web_search_20250305",
          name: "web_search",
          max_uses: 5,
        },
      ],
    }),
  });

  if (!anthropicResponse.ok) {
    const errorText = await anthropicResponse.text();
    return jsonResponse(
      {
        error: "Anthropic request failed.",
        detail: truncate(errorText, 500),
      },
      502,
    );
  }

  const anthropicJson = await anthropicResponse.json();
  const responseText = extractTextFromAnthropicResponse(anthropicJson);

  if (!responseText) {
    return jsonResponse({ error: "Anthropic returned no text response." }, 502);
  }

  let parsed: unknown;
  try {
    parsed = parseModelJson(responseText);
  } catch {
    return jsonResponse(
      {
        error: "Anthropic returned invalid JSON.",
        raw: truncate(responseText, 1000),
      },
      502,
    );
  }

  parsed = normalizeAnalysisPayload(parsed);

  const validationError = validateAnalysisPayload(parsed);
  if (validationError) {
    return jsonResponse(
      {
        error: "Anthropic returned JSON that did not match the expected schema.",
        detail: validationError,
      },
      502,
    );
  }

  const analysis = parsed as AnalysisPayload;

  const authHeader = req.headers.get("Authorization");
  let userId: string | null = null;

  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.slice("Bearer ".length);
    const { data } = await supabase.auth.getUser(token);
    userId = data.user?.id ?? null;
  }

  const insertPayload = {
    idea_text: ideaText,
    background_text: backgroundText || null,
    builder_view: analysis.builder_view,
    investor_view: analysis.investor_view,
    shared_view: analysis.shared,
    model: ANTHROPIC_MODEL,
    user_id: userId,
  };

  const insertResult = await insertReportWithUniqueSlug(supabase, insertPayload);
  if (insertResult.error) {
    return jsonResponse(
      {
        error: "Failed to save report.",
        detail: insertResult.error,
      },
      500,
    );
  }

  return jsonResponse({
    slug: insertResult.slug,
    report: analysis,
    model: ANTHROPIC_MODEL,
  });
});

function buildUserPrompt(ideaText: string, backgroundText: string) {
  return [
    `Project idea:\n${ideaText}`,
    backgroundText ? `\nFounder background:\n${backgroundText}` : "\nFounder background:\nNot provided.",
    "\nAnalyze this idea for both Builder View and Investor View using the required JSON schema.",
  ].join("\n");
}

function extractTextFromAnthropicResponse(payload: any): string {
  if (!Array.isArray(payload?.content)) return "";
  return payload.content
    .filter((block: any) => block?.type === "text" && typeof block?.text === "string")
    .map((block: any) => block.text)
    .join("\n")
    .trim();
}

function stripJsonFences(input: string): string {
  return input.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/i, "").trim();
}

function parseModelJson(input: string): unknown {
  const cleaned = stripJsonFences(input);

  try {
    return JSON.parse(cleaned);
  } catch {
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");
    if (start === -1 || end === -1 || end <= start) {
      throw new Error("No JSON object found.");
    }

    return JSON.parse(cleaned.slice(start, end + 1));
  }
}

function normalizeAnalysisPayload(payload: unknown): unknown {
  if (!payload || typeof payload !== "object") return payload;

  const value = payload as Record<string, unknown>;
  const investor = value.investor_view;
  if (!investor || typeof investor !== "object") return payload;

  const market = (investor as Record<string, unknown>).market_size_assessment;
  if (!market || typeof market !== "object") return payload;

  const marketValue = market as Record<string, unknown>;
  if (typeof marketValue.target_sector !== "string" || marketValue.target_sector.trim().length === 0) {
    marketValue.target_sector = "Unclear target sector";
  }

  return payload;
}

function validateAnalysisPayload(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") return "Top-level response must be an object.";

  const value = payload as Record<string, unknown>;
  if (!value.builder_view || typeof value.builder_view !== "object") return "builder_view is required.";
  if (!value.investor_view || typeof value.investor_view !== "object") return "investor_view is required.";
  if (!value.shared || typeof value.shared !== "object") return "shared is required.";

  const builder = value.builder_view as Record<string, unknown>;
  const investor = value.investor_view as Record<string, unknown>;
  const shared = value.shared as Record<string, unknown>;

  if (typeof builder.overall_score !== "number") return "builder_view.overall_score must be a number.";
  if (!isOneOf(builder.estimated_effort, ["LOW", "MEDIUM", "HIGH"])) return "builder_view.estimated_effort invalid.";
  if (!isOneOf(builder.risk_level, ["LOW", "MODERATE", "ELEVATED", "HIGH"])) return "builder_view.risk_level invalid.";
  if (typeof builder.mvp_timeline !== "string") return "builder_view.mvp_timeline must be a string.";

  const problem = builder.problem_clarity as Record<string, unknown>;
  if (!problem || typeof problem !== "object") return "builder_view.problem_clarity is required.";
  if (typeof problem.summary !== "string") return "builder_view.problem_clarity.summary must be a string.";
  if (!isStringArray(problem.strengths)) return "builder_view.problem_clarity.strengths must be a string array.";
  if (!isStringArray(problem.vulnerabilities)) return "builder_view.problem_clarity.vulnerabilities must be a string array.";
  if (typeof problem.clarity_score !== "number") return "builder_view.problem_clarity.clarity_score must be a number.";

  if (typeof builder.technical_feasibility !== "string") return "builder_view.technical_feasibility must be a string.";
  if (typeof builder.learning_value !== "string") return "builder_view.learning_value must be a string.";
  if (typeof builder.approaches_to_build !== "string") return "builder_view.approaches_to_build must be a string.";

  const recommendation = builder.final_recommendation as Record<string, unknown>;
  if (!recommendation || typeof recommendation !== "object") return "builder_view.final_recommendation is required.";
  if (typeof recommendation.primary !== "string") return "builder_view.final_recommendation.primary must be a string.";
  if (typeof recommendation.secondary !== "string") return "builder_view.final_recommendation.secondary must be a string.";

  if (typeof investor.investability_score !== "number") return "investor_view.investability_score must be a number.";
  if (typeof investor.market_size_tam !== "string") return "investor_view.market_size_tam must be a string.";
  if (typeof investor.defensibility !== "string") return "investor_view.defensibility must be a string.";
  if (typeof investor.traction_goal !== "string") return "investor_view.traction_goal must be a string.";

  const market = investor.market_size_assessment as Record<string, unknown>;
  if (!market || typeof market !== "object") return "investor_view.market_size_assessment is required.";
  if (typeof market.tam !== "string" || typeof market.sam !== "string" || typeof market.som !== "string") {
    return "investor_view.market_size_assessment tam/sam/som must be strings.";
  }
  if (typeof market.target_sector !== "string") return "investor_view.market_size_assessment.target_sector must be a string.";

  if (typeof investor.defensibility_moats !== "string") return "investor_view.defensibility_moats must be a string.";
  if (typeof investor.traction_requirements !== "string") return "investor_view.traction_requirements must be a string.";
  if (typeof investor.business_model !== "string") return "investor_view.business_model must be a string.";

  if (!Array.isArray(investor.critical_concerns)) return "investor_view.critical_concerns must be an array.";
  for (const concern of investor.critical_concerns as unknown[]) {
    if (!concern || typeof concern !== "object") return "critical_concerns entries must be objects.";
    const item = concern as Record<string, unknown>;
    if (typeof item.title !== "string" || typeof item.description !== "string") {
      return "critical_concerns title/description must be strings.";
    }
    if (!isOneOf(item.severity, ["warn", "info"])) return "critical_concerns severity must be warn or info.";
  }

  if (typeof shared.title !== "string") return "shared.title must be a string.";
  if (typeof shared.description !== "string") return "shared.description must be a string.";

  return null;
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isOneOf(value: unknown, allowed: string[]): boolean {
  return typeof value === "string" && allowed.includes(value);
}

function truncate(value: string, max: number): string {
  return value.length <= max ? value : `${value.slice(0, max)}...`;
}

async function insertReportWithUniqueSlug(
  supabase: ReturnType<typeof createClient>,
  payload: Omit<{
    slug: string;
    idea_text: string;
    background_text: string | null;
    builder_view: AnalysisPayload["builder_view"];
    investor_view: AnalysisPayload["investor_view"];
    shared_view: AnalysisPayload["shared"];
    model: string;
    user_id: string | null;
  }, "slug">,
): Promise<{ slug: string | null; error: string | null }> {
  for (let attempt = 0; attempt < MAX_SLUG_ATTEMPTS; attempt += 1) {
    const slug = generateSlug();
    const { error } = await supabase.from("reports").insert({
      slug,
      ...payload,
    });

    if (!error) {
      return { slug, error: null };
    }

    if (!isSlugCollision(error)) {
      return { slug: null, error: error.message };
    }
  }

  return {
    slug: null,
    error: "Failed to generate a unique report slug after multiple attempts.",
  };
}

function isSlugCollision(error: { code?: string; message: string; details?: string | null }): boolean {
  return error.code === "23505"
    && (error.message.includes("reports_slug_key") || error.details?.includes("(slug)") === true);
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: corsHeaders,
  });
}
