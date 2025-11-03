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
        <View style={styles.instructionsCard}>
          <View style={styles.instructionsAccent} />
          <View style={styles.instructionsContent}>
            <Text style={styles.subtitle}>Step 2 · Calibrate</Text>
            <Text style={styles.title}>Squeeze the wings firmly</Text>
            <Text style={styles.body}>
              Hold Heelia upright and gently squeeze the wings three times. This helps us measure your baseline pressure so readings stay precise.
            </Text>
          </View>
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
  instructionsCard: {
    maxWidth: 360,
    borderRadius: 36,
    backgroundColor: palette.white,
    overflow: 'hidden',
    shadowColor: '#E7D4FF',
    shadowOpacity: 0.25,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 14 },
    elevation: 12
  },
  instructionsAccent: {
    height: 6,
    backgroundColor: palette.softCoral
  },
  instructionsContent: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    gap: spacing.md
  },
  subtitle: {
    ...typography.body,
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontSize: 14,
    color: palette.mist
  },
  title: {
    ...typography.heading
  },
  body: {
    ...typography.body,
    lineHeight: 24
  },
  progressCard: {
    backgroundColor: palette.white,
    borderRadius: 36,
    padding: spacing.xl,
    gap: spacing.lg,
    shadowColor: '#E7D4FF',
    shadowOpacity: 0.3,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 14 },
    elevation: 12
  },
  progressTrack: {
    height: 16,
    borderRadius: 12,
    backgroundColor: '#F9E4E1',
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    borderRadius: 12,
    backgroundColor: palette.coral
  },
  progressLabel: {
    ...typography.body,
    fontWeight: '700',
    textAlign: 'center'
  }
});
