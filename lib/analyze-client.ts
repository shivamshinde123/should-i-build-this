import { runtimeConfig } from "@/constants/runtime";
import type { AnalyzeRequest, AnalyzeResponse, SourceCitation } from "@/types/analysis";

type AnalyzeErrorBody = {
  error?: string;
  detail?: string;
  raw?: string;
};

export async function invokeAnalyze(
  payload: AnalyzeRequest,
  signal?: AbortSignal,
): Promise<AnalyzeResponse> {
  const response = await fetch(`${runtimeConfig.supabaseUrl}/functions/v1/analyze`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      apikey: runtimeConfig.supabaseAnonKey,
    },
    body: JSON.stringify(payload),
    signal,
  });

  const json = (await response.json().catch(() => null)) as AnalyzeResponse | AnalyzeErrorBody | null;

  if (!response.ok) {
    const errorBody = isAnalyzeErrorBody(json) ? json : null;
    throw new Error(getUserFacingAnalyzeError(errorBody));
  }

  if (!json || typeof json !== "object" || !("slug" in json) || !("report" in json)) {
    throw new Error("Analysis response was malformed.");
  }

  return {
    ...(json as Omit<AnalyzeResponse, "sources">),
    sources: Array.isArray((json as { sources?: unknown }).sources)
      ? ((json as { sources: SourceCitation[] }).sources ?? [])
      : [],
  };
}

function isAnalyzeErrorBody(value: unknown): value is AnalyzeErrorBody {
  return !!value && typeof value === "object" && ("error" in value || "detail" in value);
}

function getUserFacingAnalyzeError(errorBody: AnalyzeErrorBody | null): string {
  const message = `${errorBody?.error ?? ""} ${errorBody?.detail ?? ""}`.toLowerCase();

  if (message.includes("ideaText is required".toLowerCase())) {
    return "Enter your idea before running the stress test.";
  }

  if (message.includes("invalid json")) {
    return "The request payload was invalid. Try again.";
  }

  if (message.includes("anthropic")) {
    return "The analysis engine had a temporary issue. Try again in a moment.";
  }

  if (message.includes("failed to save report")) {
    return "The report was generated, but saving it failed. Try again.";
  }

  if (message.includes("missing required environment configuration")) {
    return "The backend is not configured correctly right now.";
  }

  return "The stress test failed. Try again.";
}
