import { StyleSheet, Text, View } from "react-native";

import { tokens } from "@/constants/theme";

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
    <View style={styles.card}>
      <Text style={styles.title}>REAL-TIME VALIDATION LOGS</Text>
      <View style={styles.logs}>
        {logs.map((log) => (
          <Text
            key={`${log.time}-${log.message}`}
            numberOfLines={1}
            style={[styles.log, log.variant === "error" ? styles.error : styles.info]}
          >
            [{log.time}] {log.message}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: tokens.border,
    backgroundColor: tokens.surface,
    padding: 16,
  },
  title: {
    marginBottom: 12,
    color: tokens.ink,
    fontFamily: "Inter_500Medium",
    fontSize: 11,
    letterSpacing: 1.2,
  },
  logs: {
    gap: 6,
  },
  log: {
    fontFamily: "SpaceMono_400Regular",
    fontSize: 10,
    letterSpacing: 0.6,
  },
  info: {
    color: tokens.inkMuted,
  },
  error: {
    color: tokens.danger,
  },
});
