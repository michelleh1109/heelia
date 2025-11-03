import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';
import { palette, spacing, typography } from '../theme';
import { ScreenContainer } from '../components/ScreenContainer';
import { PrimaryButton } from '../components/PrimaryButton';

interface ScanningScreenProps {
  onComplete: () => void;
}

interface DotConfig {
  x: number;
  y: number;
  delay: number;
}

const DOT_COUNT = 16;

export const ScanningScreen: React.FC<ScanningScreenProps> = ({ onComplete }) => {
  const [isReady, setIsReady] = useState(false);
  const window = Dimensions.get('window');
  const size = Math.min(window.width, window.height) * 0.75;

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  const dots = useMemo<DotConfig[]>(() => {
    return new Array(DOT_COUNT).fill(null).map((_, index) => {
      const angle = (index / DOT_COUNT) * Math.PI * 2;
      const radius = size * 0.18 + Math.random() * size * 0.12;
      const x = Math.cos(angle) * radius + size / 2;
      const y = Math.sin(angle) * radius + size / 2;
      return { x, y, delay: Math.random() * 1200 };
    });
  }, [size]);

  return (
    <ScreenContainer>
      <View style={styles.wrapper}>
        <View style={[styles.cloudContainer, { width: size, height: size}]}>
          {dots.map((dot, index) => (
            <PulsingDot key={`dot-${index}`} {...dot} />
          ))}
        </View>

        <View style={styles.copy}>
          {/* <Text style={styles.subtitle}>Step 3 · Scan</Text> */}
          <Text style={styles.title}>Ready to Scan</Text>
          <Text style={styles.body}>
            Slide your heel to back of the device, ensuring wings are still firmly in place. Hold your foot still and press scan.
          </Text>
        </View>

        <PrimaryButton label={isReady ? 'Scan' : 'Scanning...'} onPress={onComplete} disabled={!isReady} />
      </View>
    </ScreenContainer>
  );
};

const PulsingDot: React.FC<DotConfig> = ({ x, y, delay }) => {
  const scale = useRef(new Animated.Value(0.4)).current;
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.parallel([
          Animated.timing(scale, {
            toValue: 1,
            duration: 900,
            useNativeDriver: true
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 900,
            useNativeDriver: true
          })
        ]),
        Animated.parallel([
          Animated.timing(scale, {
            toValue: 0.4,
            duration: 900,
            useNativeDriver: true
          }),
          Animated.timing(opacity, {
            toValue: 0.35,
            duration: 900,
            useNativeDriver: true
          })
        ])
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [delay, opacity, scale]);

  return <Animated.View style={[styles.cloudDot, { left: x, top: y, opacity, transform: [{ scale }] }]} />;
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xl
  },
  cloudContainer: {
    borderRadius: 400,
    backgroundColor: 'rgba(255, 215, 222, 0.1)',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: palette.blush,
    shadowOpacity: 0.3,
    shadowRadius: 32,
    shadowOffset: { width: 0, height: 18 },
    elevation: 16
  },
  cloudDot: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: palette.softCoral,
    shadowColor: palette.softCoral,
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  copy: {
    gap: spacing.md,
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    // backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 36,
    shadowColor: '#E7D4FF',
    shadowOpacity: 0.25,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 14 },
    elevation: 12
  },
  subtitle: {
    ...typography.body,
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontSize: 14,
    color: palette.mist
  },
  title: {
    ...typography.heading,
    textAlign: 'center'
  },
  body: {
    ...typography.body,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 320
  }
});
