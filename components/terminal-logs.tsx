import { Text, View } from "react-native";

export type LogEntry = {
  time: string;
  message: string;
  variant?: "info" | "error";
};

const DEFAULT_LOGS: LogEntry[] = [
  { time: "08:24:15", message: "ANALYZING COMPETITOR LANDSCAPE..." },
  { time: "08:24:14", message: "SCRAPING FUNDING DATA TRENDS..." },
  { time: "08:24:13", message: "ERROR: IDEALISTIC PROJECTIONS DETECTED", variant: "error" },
  { time: "08:24:12", message: "RE-CALIBRATING FOR MACRO-DOWNTURN..." },
];

export function TerminalLogs({ logs = DEFAULT_LOGS }: { logs?: LogEntry[] }) {
  return (
    <View className="rounded-sm border border-border bg-surface p-4">
      <Text className="mb-3 font-mono text-[12px] tracking-terminal text-ink">
        REAL-TIME VALIDATION LOGS
      </Text>
      <View className="gap-1">
        {logs.map((log, i) => (
          <Text
            key={`${log.time}-${i}`}
            numberOfLines={1}
            className={`font-mono text-[10px] ${
              log.variant === "error" ? "text-status-danger" : "text-ink-muted"
            }`}
          >
            [{log.time}] {log.message}
          </Text>
        ))}
      </View>
    </View>
  );
}
