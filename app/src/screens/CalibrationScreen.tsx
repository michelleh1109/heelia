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
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) setTimeout(onComplete, 600);
    });

    return () => {
      progress.removeListener(listener);
      progress.stopAnimation();
    };
  }, [onComplete, progress]);

  const widthInterpolation = progress.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <ScreenContainer>
      <View style={styles.wrapper}>
        <View style={styles.textCard}>
          <View style={styles.progressTrack}>
            <Animated.View style={[styles.progressFill, { width: widthInterpolation }]} />
          </View>
          <Text style={styles.progressLabel}>{displayValue}% complete</Text>
        </View>

        <View style={styles.textCard}>
          <Text style={styles.title}>Calibrating</Text>
          <Text style={styles.body}>
            Slide your heel to back of the device. Firmly squeeze the wings around your heel bone.
          </Text>
        </View>
      </View>
    </ScreenContainer>
  );
};

const CARD_WIDTH = '100%';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.xl,
    paddingHorizontal: spacing.xl,
  },
  textCard: {
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderRadius: 36,
    // backgroundColor: palette.white,
    width: CARD_WIDTH,
    shadowColor: '#E7D4FF',
    shadowOpacity: 0.25,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 14 },
    elevation: 12,
  },
  title: {
    ...typography.heading,
    textAlign: 'center',
  },
  body: {
    ...typography.body,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 320,
  },
  progressTrack: {
    width: '100%',
    height: 14,
    borderRadius: 12,
    backgroundColor: '#F9E4E1',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 12,
    backgroundColor: palette.coral,
  },
  progressLabel: {
    ...typography.body,
    fontWeight: '700',
    textAlign: 'center',
  },
});