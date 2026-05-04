import type { AnalysisPayload, Severity } from "../../types/analysis";

export type { AnalysisPayload, Severity };

export type PublicReport = AnalysisPayload & {
  slug: string;
  created_at: string;
  model: string;
  idea_text: string;
  background_text: string | null;
};
