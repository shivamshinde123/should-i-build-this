import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

import { tokens } from "@/constants/theme";

type Props = {
  size?: number;
};

const DOTS = [
  { x: 0.2, y: 0.22, size: 4, glow: true },
  { x: 0.7, y: 0.18, size: 6, glow: true },
  { x: 0.33, y: 0.58, size: 4, glow: false },
  { x: 0.78, y: 0.56, size: 5, glow: false },
  { x: 0.58, y: 0.72, size: 4, glow: false },
  { x: 0.48, y: 0.36, size: 3, glow: false },
];

export function SynthesizingRadar({ size = 280 }: Props) {
  const pulse = useSharedValue(0);
  const orbit = useSharedValue(0);

  useEffect(() => {
    pulse.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1800, easing: Easing.inOut(Easing.quad) }),
        withTiming(0, { duration: 1800, easing: Easing.inOut(Easing.quad) }),
      ),
      -1,
      false,
    );

    orbit.value = withRepeat(withTiming(1, { duration: 3600, easing: Easing.linear }), -1, false);
  }, [orbit, pulse]);

  const pulseRingStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(pulse.value, [0, 1], [0.72, 1.02]) }],
    opacity: interpolate(pulse.value, [0, 0.6, 1], [0.2, 0.45, 0.18]),
  }));

  const centerGlowStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(pulse.value, [0, 1], [0.9, 1.08]) }],
    opacity: interpolate(pulse.value, [0, 1], [0.35, 0.72]),
  }));

  const sweepStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${interpolate(orbit.value, [0, 1], [0, 360])}deg` }],
  }));

  return (
    <View style={[styles.frame, { width: size, height: size }]}>
      <View
        style={[
          styles.ring,
          { width: size, height: size, borderRadius: size / 2, borderColor: "#2b2b30" },
        ]}
      />
      <View
        style={[
          styles.ring,
          {
            width: size * 0.7,
            height: size * 0.7,
            borderRadius: (size * 0.7) / 2,
            borderColor: "#26262b",
          },
        ]}
      />
      <View
        style={[
          styles.ring,
          {
            width: size * 0.4,
            height: size * 0.4,
            borderRadius: (size * 0.4) / 2,
            borderColor: "#222227",
          },
        ]}
      />

      <Animated.View
        style={[
          styles.ring,
          {
            width: size * 0.88,
            height: size * 0.88,
            borderRadius: (size * 0.88) / 2,
            borderColor: "rgba(245, 200, 66, 0.42)",
          },
          pulseRingStyle,
        ]}
      />

      <View style={[styles.axisHorizontal, { width: size * 0.92 }]} />
      <View style={[styles.axisVertical, { height: size * 0.92 }]} />

      <Animated.View
        pointerEvents="none"
        style={[
          styles.sweepWrap,
          { width: size, height: size, borderRadius: size / 2 },
          sweepStyle,
        ]}
      >
        <View
          style={[
            styles.sweepArm,
            {
              width: size * 0.42,
              left: size / 2,
              top: size / 2 - 1,
            },
          ]}
        />
      </Animated.View>

      {DOTS.map((dot, index) => (
        <View
          key={`${dot.x}-${dot.y}-${index}`}
          style={[
            styles.dot,
            {
              width: dot.size,
              height: dot.size,
              borderRadius: dot.size / 2,
              left: size * dot.x - dot.size / 2,
              top: size * dot.y - dot.size / 2,
              opacity: dot.glow ? 1 : 0.8,
            },
            dot.glow ? styles.glowDot : null,
          ]}
        />
      ))}

      <Animated.View
        style={[
          styles.centerGlow,
          {
            width: size * 0.16,
            height: size * 0.16,
            borderRadius: (size * 0.16) / 2,
          },
          centerGlowStyle,
        ]}
      />
      <View
        style={[
          styles.centerCore,
          {
            width: size * 0.08,
            height: size * 0.08,
            borderRadius: (size * 0.08) / 2,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  ring: {
    position: "absolute",
    borderWidth: 1,
    backgroundColor: "transparent",
  },
  axisHorizontal: {
    position: "absolute",
    height: 1,
    backgroundColor: "#19191d",
  },
  axisVertical: {
    position: "absolute",
    width: 1,
    backgroundColor: "#19191d",
  },
  sweepWrap: {
    position: "absolute",
  },
  sweepArm: {
    position: "absolute",
    height: 2,
    backgroundColor: tokens.accent,
    shadowColor: tokens.accent,
    shadowOpacity: 0.55,
    shadowRadius: 8,
    opacity: 0.9,
  },
  dot: {
    position: "absolute",
    backgroundColor: tokens.accentGlow,
  },
  glowDot: {
    shadowColor: tokens.accent,
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  centerGlow: {
    position: "absolute",
    backgroundColor: "rgba(245, 200, 66, 0.18)",
    shadowColor: tokens.accent,
    shadowOpacity: 1,
    shadowRadius: 18,
  },
  centerCore: {
    position: "absolute",
    backgroundColor: tokens.accent,
    shadowColor: tokens.accent,
    shadowOpacity: 0.9,
    shadowRadius: 10,
  },
});
