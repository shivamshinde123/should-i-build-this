import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import { tokens } from "@/constants/theme";

type Status = "pass" | "syncing" | "wait";

const STEPS = [
  "Consulting engineers...",
  "Checking market...",
  "Assessing feasibility...",
  "Calculating ROI...",
] as const;

const FRAMES: Status[][] = [
  ["syncing", "wait", "wait", "wait"],
  ["pass", "syncing", "wait", "wait"],
  ["pass", "pass", "syncing", "wait"],
  ["pass", "pass", "pass", "syncing"],
  ["pass", "pass", "pass", "pass"],
];

const FRAME_INTERVAL_MS = 1500;

export function DiagnosticPipeline() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setFrame((f) => (f + 1) % FRAMES.length);
    }, FRAME_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  const statuses = FRAMES[frame];

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>DIAGNOSTIC PIPELINE</Text>
        <Text style={styles.status}>
          STATUS: <Text style={styles.statusAccent}>ACTIVE</Text>
        </Text>
      </View>
      <View style={styles.list}>
        {STEPS.map((label, i) => (
          <PipelineRow key={label} label={label} status={statuses[i]} />
        ))}
      </View>
    </View>
  );
}

function PipelineRow({ label, status }: { label: string; status: Status }) {
  return (
    <View style={styles.row}>
      <View style={styles.rowLeft}>
        <StatusIcon status={status} />
        <Text style={[styles.rowText, status === "wait" ? styles.waitText : styles.activeText]}>
          {label}
        </Text>
      </View>
      <StatusBadge status={status} />
    </View>
  );
}

function StatusIcon({ status }: { status: Status }) {
  if (status === "pass") {
    return <Ionicons name="checkmark-circle" size={16} color={tokens.accent} />;
  }
  if (status === "syncing") {
    return <SpinnerIcon />;
  }
  return <Ionicons name="ellipse-outline" size={14} color={tokens.inkFaint} />;
}

function SpinnerIcon() {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 900, easing: Easing.linear }),
      -1,
      false,
    );
  }, [rotation]);

  const style = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <Animated.View style={style}>
      <Ionicons name="sync-outline" size={16} color={tokens.inkMuted} />
    </Animated.View>
  );
}

const BADGE = {
  pass: { label: "PASS", color: tokens.accent, border: tokens.accent },
  syncing: { label: "SYNCING", color: tokens.inkMuted, border: tokens.inkMuted },
  wait: { label: "WAIT", color: tokens.inkFaint, border: tokens.inkFaint },
} as const;

function StatusBadge({ status }: { status: Status }) {
  const { label, color, border } = BADGE[status];
  return (
    <View style={[styles.badge, { borderColor: border }]}>
      <Text style={[styles.badgeText, { color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: tokens.accent,
    backgroundColor: tokens.surface,
    padding: 16,
  },
  header: {
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: tokens.hairline,
    paddingBottom: 12,
  },
  title: {
    color: tokens.ink,
    fontFamily: "Inter_500Medium",
    fontSize: 11,
    letterSpacing: 1.2,
  },
  status: {
    color: tokens.inkMuted,
    fontFamily: "SpaceMono_400Regular",
    fontSize: 10,
    letterSpacing: 1.2,
  },
  statusAccent: {
    color: tokens.accent,
  },
  list: {
    gap: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  rowText: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
  },
  waitText: {
    color: tokens.inkFaint,
  },
  activeText: {
    color: tokens.ink,
  },
  badge: {
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: {
    fontFamily: "SpaceMono_700Bold",
    fontSize: 10,
    letterSpacing: 1.2,
  },
});
