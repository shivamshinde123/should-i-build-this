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
    <View className="border border-border bg-surface p-4">
      <Text className="mb-3 font-mono-bold text-[11px] tracking-wide2 text-ink">
        REAL-TIME VALIDATION LOGS
      </Text>
      <View className="gap-1.5">
        {logs.map((log) => (
          <Text
            key={`${log.time}-${log.message}`}
            numberOfLines={1}
            className={`font-mono text-[10px] tracking-wide ${
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
