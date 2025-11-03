import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { palette, spacing, typography } from '../theme';
import { ScreenContainer } from '../components/ScreenContainer';
import { PrimaryButton } from '../components/PrimaryButton';

interface ConnectionScreenProps {
  onContinue: () => void;
}

const DOT_COUNT = 8;
const RADIUS = 52;

export const ConnectionScreen: React.FC<ConnectionScreenProps> = ({ onContinue }) => {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true
      })
    ).start();
  }, [rotation]);

  const dots = useMemo(() => new Array(DOT_COUNT).fill(null), []);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <ScreenContainer>
      <View style={styles.wrapper}>
        <Animated.View style={[styles.spinner, { transform: [{ rotate: spin }] }]}>
          {dots.map((_, index) => {
            const angle = (index / DOT_COUNT) * Math.PI * 2;
            const translateX = Math.cos(angle) * RADIUS;
            const translateY = Math.sin(angle) * RADIUS;
            return <View key={`dot-${index}`} style={[styles.dot, { transform: [{ translateX }, { translateY }] }]} />;
          })}
          <View style={styles.dotCore} />
        </Animated.View>

        <View style={styles.textCard}>
          <Text style={styles.subtitle}>Step 1 · Connect</Text>
          <Text style={styles.title}>Bring Heelia Online</Text>
          <Text style={styles.body}>
            Plug Heelia into power and keep it within a few feet. Enable Bluetooth on your phone so we can find your device
            instantly.
          </Text>
        </View>

        <PrimaryButton label="Connect to Heelia" onPress={onContinue} />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.xl
  },
  spinner: {
    width: 176,
    height: 176,
    borderRadius: 88,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 243, 240, 0.8)',
    shadowColor: palette.blush,
    shadowOpacity: 0.35,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 12 },
    elevation: 10
  },
  dot: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: palette.softCoral,
    shadowColor: palette.softCoral,
    shadowOpacity: 0.45,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 }
  },
  dotCore: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: palette.coral,
    shadowColor: palette.coral,
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 }
  },
  textCard: {
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 36,
    shadowColor: '#E7D4FF',
    shadowOpacity: 0.25,
    shadowRadius: 30,
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
