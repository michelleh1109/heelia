import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { ScreenContainer } from '../components/ScreenContainer';
import { palette, spacing, typography } from '../theme';
import { GlassCard } from '../components/glasscard';

interface CalibrationScreenProps {
  onComplete: () => void;
}

export const CalibrationScreen: React.FC<CalibrationScreenProps> = ({ onComplete }) => {
  const rotation = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(0)).current;
  const progress = useRef(new Animated.Value(0)).current;
  const [displayValue, setDisplayValue] = useState(0);
  const completionTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const rotationAnimation = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1600,
        easing: Easing.linear,
        useNativeDriver: true
      })
    );

    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 900,
          useNativeDriver: true
        })
      ])
    );

    const listener = progress.addListener(({ value }) => {
      setDisplayValue(Math.round(value));
    });

    rotationAnimation.start();
    pulseAnimation.start();

    Animated.timing(progress, {
      toValue: 100,
      duration: 4800,
      useNativeDriver: false
    }).start(({ finished }) => {
      if (finished) {
        completionTimeout.current = setTimeout(onComplete, 600);
      }
    });

    return () => {
      rotationAnimation.stop();
      pulseAnimation.stop();
      progress.removeListener(listener);
      progress.stopAnimation();
      if (completionTimeout.current) {
        clearTimeout(completionTimeout.current);
      }
    };
  }, [onComplete, progress, pulse, rotation]);

  const rotateInterpolation = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  const pulseInterpolation = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.08]
  });

  const widthInterpolation = progress.interpolate({
    inputRange: [0, 100],
    outputRange: ['12%', '100%']
  });

  return (
    <ScreenContainer>
      <View style={styles.wrapper}>
        <View style={styles.spinnerWrapper}>
          <Animated.View style={[styles.spinnerHalo, { transform: [{ rotate: rotateInterpolation }] }]}>
            <Animated.View style={[styles.spinnerCore, { transform: [{ scale: pulseInterpolation }] }]} />
          </Animated.View>
        </View>

        <GlassCard style={styles.copy}>
          <Text style={styles.title}>Calibrating...</Text>
          <Text style={styles.body}>
            Slide your heel to back of the device. Firmly squeeze the wings around your heel bone.
          </Text>
        </GlassCard>

        <View style={styles.pill}>
          <Animated.View style={[styles.pillFill, { width: widthInterpolation }]} />
          <Text style={styles.pillLabel}>{displayValue}%</Text>
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xl
  },
  spinnerWrapper: {
    width: 220,
    height: 220,
    alignItems: 'center',
    justifyContent: 'center'
  },
  spinnerHalo: {
    width: '100%',
    height: '100%',
    borderRadius: 110,
    borderWidth: 2,
    borderColor: 'rgba(255, 139, 124, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: palette.blush,
    shadowOpacity: 0.35,
    shadowRadius: 38,
    shadowOffset: { width: 0, height: 22 }
  },
  spinnerCore: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255, 182, 169, 0.35)',
    borderWidth: 1,
    borderColor: 'rgba(255, 139, 124, 0.45)',
    shadowColor: '#FFD9D2',
    shadowOpacity: 0.45,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 }
  },
  copy: {
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderRadius: 32,
    shadowColor: '#E7D4FF',
    shadowOpacity: 0.25,
    shadowRadius: 26,
    shadowOffset: { width: 0, height: 12 },
    borderWidth: 1.2,
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
  },
  pill: {
    position: 'relative',
    width: '70%',
    borderRadius: 36,
    backgroundColor: 'rgba(255, 139, 124, 0.08)',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    shadowColor: '#F0CED4',
    shadowOpacity: 0.45,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 14 }
  },
  pillFill: {
    position: 'absolute',
    left: spacing.sm,
    top: spacing.sm,
    bottom: spacing.sm,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 182, 169, 0.45)'
  },
  pillLabel: {
    ...typography.body,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: palette.coral
  }
});
