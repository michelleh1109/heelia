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
        <View style={styles.hero}>
          <Animated.View style={[styles.spinner, { transform: [{ rotate: spin }] }]}> 
            {dots.map((_, index) => {
              const angle = (index / DOT_COUNT) * Math.PI * 2;
              const translateX = Math.cos(angle) * RADIUS;
              const translateY = Math.sin(angle) * RADIUS;
              return <View key={`dot-${index}`} style={[styles.dot, { transform: [{ translateX }, { translateY }] }]} />;
            })}
            <View style={styles.dotCore} />
          </Animated.View>
        </View>

        <View style={styles.textBlock}>
          <Text style={styles.subtitle}>Step 1 · Connect</Text>
          <Text style={styles.title}>Bring Heelia online</Text>
          <Text style={styles.body}>
            Plug Heelia into power and keep it nearby. Switch on Bluetooth so we can pair instantly and guide you
            through setup.
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
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  hero: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E5D7FF',
    shadowOpacity: 0.7,
    shadowRadius: 40,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8
  },
  spinner: {
    width: 172,
    height: 172,
    borderRadius: 86,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dot: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: palette.accentPink,
    shadowColor: palette.accentPink,
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 }
  },
  dotCore: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: palette.accentBlue
  },
  textBlock: {
    alignItems: 'center',
    gap: spacing.sm,
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
