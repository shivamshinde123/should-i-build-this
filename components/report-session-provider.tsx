import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

import { buildPublicReportUrl } from "@/constants/runtime";
import type { AnalyzeResponse } from "@/types/analysis";

type ReportSession = AnalyzeResponse & {
  shareUrl: string;
};

type ReportSessionContextValue = {
  session: ReportSession | null;
  setSession: (response: AnalyzeResponse) => void;
  clearSession: () => void;
};

const ReportSessionContext = createContext<ReportSessionContextValue | null>(null);

export function ReportSessionProvider({ children }: { children: ReactNode }) {
  const [session, setSessionState] = useState<ReportSession | null>(null);

  const value = useMemo<ReportSessionContextValue>(
    () => ({
      session,
      setSession: (response) => {
        setSessionState({
          ...response,
          shareUrl: buildPublicReportUrl(response.slug),
        });
      },
      clearSession: () => setSessionState(null),
    }),
    [session],
  );

  return (
    <ReportSessionContext.Provider value={value}>{children}</ReportSessionContext.Provider>
  );
}

export function useReportSession() {
  const context = useContext(ReportSessionContext);
  if (!context) {
    throw new Error("useReportSession must be used within ReportSessionProvider.");
  }

  return context;
}
