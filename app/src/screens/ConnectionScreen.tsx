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

        <View style={styles.card}>
          <View style={styles.cardAccent} />
          <View style={styles.cardContent}>
            {/* <Text style={[styles.subtitle, styles.centerText]}>Step 1 · Connect</Text> */}
            <Text style={[styles.title, styles.centerText]}>Bluetooth Pairing</Text>
            <Text style={[styles.body, styles.centerText]}>
              Plug Heelia into power and turn it on. Enable Bluetooth on your phone.
            </Text>
          </View>
        </View>

        <PrimaryButton label="Connect" onPress={onContinue} />
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
  card: {
    width: '100%',
    maxWidth: 380,
    borderRadius: 36,
    // backgroundColor: 'rgba(255,255,255,0.92)',
    shadowColor: palette.blush,
    shadowOpacity: 0.3,
    shadowRadius: 32,
    shadowOffset: { width: 0, height: 16 },
    elevation: 12,
    overflow: 'hidden'
  },
  cardContent: {
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
    ...typography.heading,
    textAlign: 'center'
  },
  body: {
    ...typography.body,
    lineHeight: 24,
    textAlign: 'center'
  },
  centerText: {
    textAlign: 'center'
  },
  spinner: {
    width: 176,
    height: 176,
    borderRadius: 88,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(255, 243, 240, 0.8)',
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
  }
});
