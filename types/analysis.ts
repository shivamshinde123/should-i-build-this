export type Severity = "warn" | "info";

export type AnalysisPayload = {
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

export type AnalyzeRequest = {
  ideaText: string;
  backgroundText: string;
};

export type AnalyzeResponse = {
  slug: string;
  report: AnalysisPayload;
  model: string;
};
