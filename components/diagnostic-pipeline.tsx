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
    <View className="rounded-sm border border-border bg-surface p-4">
      <View className="mb-3 flex-row items-center justify-between border-b border-hairline pb-3">
        <Text className="font-mono text-[12px] tracking-terminal text-ink">
          DIAGNOSTIC PIPELINE
        </Text>
        <Text className="font-mono text-[10px] tracking-terminal text-ink-muted">
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
          className={`font-sans text-[13px] ${status === "wait" ? "text-ink-dim" : "text-ink"}`}
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
    return <Ionicons name="checkmark-circle-outline" size={16} color={tokens.accent} />;
  }
  if (status === "syncing") {
    return <SpinnerIcon />;
  }
  return <Ionicons name="ellipse-outline" size={16} color={tokens.inkDim} />;
}

function SpinnerIcon() {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 1000, easing: Easing.linear }),
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
  wait: { label: "WAIT", color: tokens.inkDim, border: tokens.inkDim },
} as const;

function StatusBadge({ status }: { status: Status }) {
  const { label, color, border } = BADGE[status];
  return (
    <View
      className="rounded-sm border px-2 py-0.5"
      style={{ borderColor: border }}
    >
      <Text
        className="font-mono text-[10px] font-bold tracking-terminal"
        style={{ color }}
      >
        {label}
      </Text>
    </View>
  );
}
