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
            Slide your heel back into the device. Squeeze wings snugly around your heel bone.
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
    color: 'rgba(255,255,255,0.64)'
  },
  title: {
    ...typography.heading
  },
  body: {
    ...typography.body,
    lineHeight: 22
  },
  progressCard: {
    backgroundColor: 'rgba(12, 8, 40, 0.76)',
    borderRadius: 24,
    padding: spacing.lg,
    gap: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)'
  },
  progressTrack: {
    height: 14,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.12)',
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    borderRadius: 12,
    backgroundColor: palette.neonBlue
  },
  progressLabel: {
    ...typography.body,
    fontWeight: '600'
  }
});
