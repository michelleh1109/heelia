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

const DOT_COUNT = 28;

export const ScanningScreen: React.FC<ScanningScreenProps> = ({ onComplete }) => {
  const [isReady, setIsReady] = useState(false);
  const window = Dimensions.get('window');
  const size = Math.min(window.width, window.height) * 0.74;

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  const dots = useMemo<DotConfig[]>(() => {
    return new Array(DOT_COUNT).fill(null).map((_, index) => {
      const angle = (index / DOT_COUNT) * Math.PI * 2;
      const radius = size * 0.34 + Math.random() * size * 0.14;
      const x = Math.cos(angle) * radius + size / 2;
      const y = Math.sin(angle) * radius + size / 2;
      return { x, y, delay: Math.random() * 1200 };
    });
  }, [size]);

  return (
    <ScreenContainer>
      <View style={styles.wrapper}>
        <View style={[styles.cloudContainer, { width: size, height: size }]}>
          {dots.map((dot, index) => (
            <PulsingDot key={`dot-${index}`} {...dot} />
          ))}
          <View style={[styles.innerRing, { width: size * 0.42, height: size * 0.42, borderRadius: (size * 0.42) / 2 }]} />
        </View>

        <View style={styles.copy}>
          <Text style={styles.subtitle}>Step 3 · Scan</Text>
          <Text style={styles.title}>Capturing your heel</Text>
          <Text style={styles.body}>
            Slowly rotate your heel so Heelia can paint a precise 3D map. We’ll let you know as soon as the scan is
            ready.
          </Text>
        </View>

        <PrimaryButton label={isReady ? 'View Dashboard' : 'Scanning…'} onPress={onComplete} disabled={!isReady} />
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
    justifyContent: 'space-between'
  },
  cloudContainer: {
    borderRadius: 400,
    backgroundColor: 'rgba(255, 255, 255, 0.82)',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#E0D1FF',
    shadowOpacity: 0.5,
    shadowRadius: 36,
    shadowOffset: { width: 0, height: 18 },
    elevation: 10
  },
  innerRing: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(91, 157, 255, 0.22)',
    backgroundColor: 'rgba(255, 130, 186, 0.12)'
  },
  cloudDot: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: palette.accentCoral,
    shadowColor: palette.accentCoral,
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 }
  },
  copy: {
    gap: spacing.sm,
    alignItems: 'center',
    paddingHorizontal: spacing.xl
  },
  subtitle: {
    ...typography.body,
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontSize: 14,
    color: palette.accentLilac
  },
  title: {
    ...typography.heading,
    textAlign: 'center'
  },
  body: {
    ...typography.body,
    textAlign: 'center',
    lineHeight: 26
  }
});
