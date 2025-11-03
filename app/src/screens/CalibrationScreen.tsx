import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { palette, spacing, typography } from '../theme';
import { ScreenContainer } from '../components/ScreenContainer';

interface CalibrationScreenProps {
  onComplete: () => void;
}

export const CalibrationScreen: React.FC<CalibrationScreenProps> = ({ onComplete }) => {
  const progress = useRef(new Animated.Value(0)).current;
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const listener = progress.addListener(({ value }) => {
      setDisplayValue(Math.round(value));
    });

    Animated.timing(progress, {
      toValue: 100,
      duration: 4500,
      useNativeDriver: false
    }).start(({ finished }) => {
      if (finished) {
        setTimeout(onComplete, 600);
      }
    });

    return () => {
      progress.removeListener(listener);
      progress.stopAnimation();
    };
  }, [onComplete, progress]);

  const widthInterpolation = progress.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%']
  });

  return (
    <ScreenContainer>
      <View style={styles.wrapper}>
        <View style={styles.copy}>
          <Text style={styles.subtitle}>Step 2 · Calibrate</Text>
          <Text style={styles.title}>Squeeze the wings firmly</Text>
          <Text style={styles.body}>
            Hold Heelia upright and gently squeeze the wings three times. This locks in your baseline pressure so
            every scan stays precise.
          </Text>
        </View>

        <View style={styles.progressCard}>
          <View style={styles.progressTrack}>
            <Animated.View style={[styles.progressFill, { width: widthInterpolation }]} />
          </View>
          <Text style={styles.progressLabel}>{displayValue}% complete</Text>
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    gap: spacing.xl
  },
  copy: {
    gap: spacing.sm
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
    lineHeight: 36
  },
  body: {
    ...typography.body,
    lineHeight: 26
  },
  progressCard: {
    borderRadius: 28,
    padding: spacing.lg,
    gap: spacing.md,
    backgroundColor: palette.surface,
    shadowColor: '#DAD1FF',
    shadowOpacity: 0.45,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 16 },
    borderWidth: 1,
    borderColor: palette.border,
    elevation: 6
  },
  progressTrack: {
    height: 18,
    borderRadius: 16,
    backgroundColor: 'rgba(155, 140, 255, 0.18)',
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    borderRadius: 16,
    backgroundColor: palette.accentBlue
  },
  progressLabel: {
    ...typography.body,
    fontWeight: '600',
    color: palette.textPrimary,
    letterSpacing: 0.6
  }
});
