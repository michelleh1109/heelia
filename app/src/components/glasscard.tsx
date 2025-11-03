import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from '@react-native-community/blur';
import type { BlurViewProps } from '@react-native-community/blur';
import { View, ViewStyle, StyleSheet, StyleProp } from 'react-native';

interface GlassCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  borderRadius?: number;
  tint?: BlurViewProps['blurType'];
  blurAmount?: number;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  style,
  borderRadius = 24,
  tint = 'light',
  blurAmount = 22,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          borderRadius,
        },
        style,
      ]}
    >
      <BlurView
        style={[styles.blurLayer, { borderRadius }]}
        blurType={tint}
        blurAmount={blurAmount}
        reducedTransparencyFallbackColor="rgba(255,255,255,0.85)"
      />
      <LinearGradient
        pointerEvents="none"
        colors={['rgba(255,255,255,0.58)', 'rgba(255,255,255,0.08)']}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={[styles.surface, { borderRadius }]}
      />
      <View pointerEvents="none" style={[styles.glow, { borderRadius }]} />
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.35)',
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  blurLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  surface: {
    ...StyleSheet.absoluteFillObject,
  },
  glow: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  content: {
    position: 'relative',
  },
});
