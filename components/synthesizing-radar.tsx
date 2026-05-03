import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import { tokens } from "@/constants/theme";

type Props = {
  size?: number;
};

export function SynthesizingRadar({ size = 240 }: Props) {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 4000, easing: Easing.linear }),
      -1,
      false,
    );
  }, [rotation]);

  const armStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const ring = (pct: number) => ({
    position: "absolute" as const,
    width: size * pct,
    height: size * pct,
    borderRadius: (size * pct) / 2,
    borderWidth: 1,
    borderColor: tokens.border,
  });

  return (
    <View style={{ width: size, height: size }} className="items-center justify-center">
      <View style={ring(1)} />
      <View style={ring(0.66)} />
      <View style={ring(0.33)} />

      <View
        style={{ position: "absolute", width: size, height: 1, backgroundColor: tokens.border }}
      />
      <View
        style={{ position: "absolute", width: 1, height: size, backgroundColor: tokens.border }}
      />

      <View
        style={{
          position: "absolute",
          top: size * 0.18,
          left: size * 0.7,
          width: 6,
          height: 6,
          borderRadius: 3,
          backgroundColor: tokens.accent,
        }}
      />
      <View
        style={{
          position: "absolute",
          top: size * 0.55,
          left: size * 0.32,
          width: 4,
          height: 4,
          borderRadius: 2,
          backgroundColor: tokens.accent,
          opacity: 0.7,
        }}
      />

      <Animated.View
        pointerEvents="none"
        style={[
          {
            position: "absolute",
            width: size,
            height: size,
            alignItems: "center",
            justifyContent: "center",
          },
          armStyle,
        ]}
      >
        <View
          style={{
            position: "absolute",
            top: size / 2 - 1,
            left: size / 2,
            width: size / 2,
            height: 2,
            backgroundColor: tokens.accent,
            opacity: 0.7,
          }}
        />
      </Animated.View>

      <View
        className="items-center justify-center rounded-full border border-accent"
        style={{ width: 56, height: 56, backgroundColor: tokens.bg }}
      >
        <Ionicons name="analytics" size={20} color={tokens.accent} />
      </View>
    </View>
  );
}
