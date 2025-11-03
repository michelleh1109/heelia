import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView, ScrollView, StyleSheet, View, ViewStyle } from 'react-native';
import { gradients, spacing } from '../theme';

interface ScreenContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  scrollable?: boolean;
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({ children, style, scrollable = false }) => {
  const content = scrollable ? (
    <ScrollView contentContainerStyle={[styles.content, style]} showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.content, style]}>{children}</View>
  );

  return (
    <LinearGradient colors={gradients.background} style={styles.gradient} start={{ x: 0.1, y: 0 }} end={{ x: 0.9, y: 1 }}>
      <SafeAreaView style={styles.safeArea}>{content}</SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xl,
    gap: spacing.xl,
    backgroundColor: 'transparent'
  }
});
