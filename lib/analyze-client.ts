import { runtimeConfig } from "@/constants/runtime";
import type { AnalyzeRequest, AnalyzeResponse } from "@/types/analysis";

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
    const detail = errorBody ? [errorBody.error, errorBody.detail].filter(Boolean).join(" ") : "";
    throw new Error(detail || "Analysis request failed.");
  }

  if (!json || typeof json !== "object" || !("slug" in json) || !("report" in json)) {
    throw new Error("Analysis response was malformed.");
  }

  return json as AnalyzeResponse;
}

function isAnalyzeErrorBody(value: unknown): value is AnalyzeErrorBody {
  return !!value && typeof value === "object" && ("error" in value || "detail" in value);
}
