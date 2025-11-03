import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { gradients, palette, spacing } from '../theme';

interface ScreenContainerProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({ children, style }) => {
  return (
    <LinearGradient colors={gradients.background} style={styles.gradient}>
      <SafeAreaView style={[styles.safeArea, style]}>{children}</SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xl,
    backgroundColor: 'rgba(255,255,255,0.75)',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    shadowColor: palette.blush,
    shadowOpacity: 0.18,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 18
  }
});
