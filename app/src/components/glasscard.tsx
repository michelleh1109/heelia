import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, ViewStyle, StyleSheet, StyleProp } from 'react-native';

type GlassCardTint = 'default' | 'light' | 'dark' | 'extraLight';

type BlurModule = typeof import('expo-blur');

type BlurLayerProps = {
  tint?: GlassCardTint;
  intensity?: number;
  style?: StyleProp<ViewStyle>;
};

let resolvedBlurModule: BlurModule | undefined;

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
  resolvedBlurModule = require('expo-blur') as BlurModule;
} catch {
  resolvedBlurModule = undefined;
}

const FallbackBlurView: React.FC<BlurLayerProps> = ({ style }) => (
  <View style={[styles.fallbackBlur, style]} />
);

const BlurViewComponent: React.ComponentType<BlurLayerProps> =
  resolvedBlurModule?.BlurView ?? FallbackBlurView;

interface GlassCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  borderRadius?: number;
  tint?: GlassCardTint;
  intensity?: number;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  style,
  borderRadius = 24,
  tint = 'light',
  intensity = 65,
}) => {
  const clampedIntensity = Math.max(0, Math.min(100, intensity));
  const blurProps: BlurLayerProps = {
    tint,
    intensity: clampedIntensity,
  };

  const isBlurAvailable = resolvedBlurModule?.BlurView != null;

  return (
    <View
      style={[
        styles.container,
        {
          borderRadius,
        },
        !isBlurAvailable && styles.fallbackContainer,
        style,
      ]}
    >
      <BlurViewComponent
        style={[styles.blurLayer, { borderRadius }]}
        {...blurProps}
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
  fallbackContainer: {
    backgroundColor: 'rgba(255,255,255,0.24)',
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
  fallbackBlur: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  content: {
    position: 'relative',
  },
});
