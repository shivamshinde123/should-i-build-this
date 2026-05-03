import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
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

export function SynthesizingRadar({ size = 260 }: Props) {
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
        style={{
          position: "absolute",
          width: size,
          height: 1,
          backgroundColor: tokens.hairline,
        }}
      />
      <View
        style={{
          position: "absolute",
          width: 1,
          height: size,
          backgroundColor: tokens.hairline,
        }}
      />

      <View
        style={{
          position: "absolute",
          top: size * 0.16,
          left: size * 0.7,
          width: 6,
          height: 6,
          borderRadius: 3,
          backgroundColor: tokens.accentGlow,
          shadowColor: tokens.accent,
          shadowOpacity: 1,
          shadowRadius: 4,
        }}
      />
      <View
        style={{
          position: "absolute",
          top: size * 0.58,
          left: size * 0.3,
          width: 4,
          height: 4,
          borderRadius: 2,
          backgroundColor: tokens.accent,
          opacity: 0.6,
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
        <LinearGradient
          colors={[tokens.accent, "rgba(245,200,66,0)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            position: "absolute",
            top: size / 2 - 3,
            left: size / 2,
            width: size / 2,
            height: 6,
          }}
        />
        <LinearGradient
          colors={["rgba(245,200,66,0.25)", "rgba(245,200,66,0)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            position: "absolute",
            top: size / 2 - 60,
            left: size / 2,
            width: size / 2,
            height: 60,
          }}
        />
      </Animated.View>

      <View
        className="items-center justify-center rounded-full border border-accent"
        style={{
          width: 60,
          height: 60,
          backgroundColor: tokens.bg,
          shadowColor: tokens.accent,
          shadowOpacity: 0.6,
          shadowRadius: 8,
        }}
      >
        <Ionicons name="analytics" size={22} color={tokens.accent} />
      </View>
    </View>
  );
}
