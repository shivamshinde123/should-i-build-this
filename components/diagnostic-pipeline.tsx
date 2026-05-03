import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
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
    <View className="border border-accent bg-surface p-4">
      <View className="mb-4 flex-row items-center justify-between border-b border-hairline pb-3">
        <Text className="font-mono-bold text-[11px] tracking-wide2 text-ink">
          DIAGNOSTIC PIPELINE
        </Text>
        <Text className="font-mono text-[10px] tracking-wide2 text-ink-muted">
          STATUS: <Text className="text-accent">ACTIVE</Text>
        </Text>
      </View>
      <View className="gap-3">
        {STEPS.map((label, i) => (
          <PipelineRow key={label} label={label} status={statuses[i]} />
        ))}
      </View>
    </View>
  );
}

function PipelineRow({ label, status }: { label: string; status: Status }) {
  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center gap-3">
        <StatusIcon status={status} />
        <Text
          className={`font-sans text-[13px] ${status === "wait" ? "text-ink-faint" : "text-ink"}`}
        >
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
    <View className="border px-2 py-0.5" style={{ borderColor: border }}>
      <Text
        className="font-mono-bold text-[10px] tracking-wide2"
        style={{ color }}
      >
        {label}
      </Text>
    </View>
  );
}
