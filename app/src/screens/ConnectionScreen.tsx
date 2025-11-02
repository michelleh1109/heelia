import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { palette, spacing, typography } from '../theme';
import { ScreenContainer } from '../components/ScreenContainer';
import { PrimaryButton } from '../components/PrimaryButton';

interface ConnectionScreenProps {
  onContinue: () => void;
}

const DOT_COUNT = 8;
const RADIUS = 46;

export const ConnectionScreen: React.FC<ConnectionScreenProps> = ({ onContinue }) => {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1800,
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

        <View style={styles.textBlock}>
          <Text style={styles.subtitle}>Step 1 · Connect</Text>
          <Text style={styles.title}>Bring Heelia Online</Text>
          <Text style={styles.body}>
            Plug Heelia into power and keep it within a few feet. Enable Bluetooth on your phone so we can find your
            device instantly.
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
    width: 160,
    height: 160,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dot: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: palette.cottonCandy,
    shadowColor: palette.cottonCandy,
    shadowOpacity: 0.6,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 }
  },
  dotCore: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: palette.neonBlue
  },
  textBlock: {
    alignItems: 'center',
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
    ...typography.heading,
    textAlign: 'center'
  },
  body: {
    ...typography.body,
    textAlign: 'center',
    maxWidth: 320,
    lineHeight: 22
  }
});
