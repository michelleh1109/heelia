import React from 'react';
import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { gradients, spacing, typography } from '../theme';

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ label, onPress, disabled, style }) => {
  return (
    <Pressable onPress={onPress} disabled={disabled} style={({ pressed }) => [styles.container, style, pressed && styles.pressed]}>
      <LinearGradient colors={gradients.button} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.gradient, disabled && styles.disabled]}>
        <Text style={styles.label}>{label}</Text>
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    borderRadius: 32,
    overflow: 'hidden',
    shadowColor: '#C7B5FF',
    shadowOpacity: 0.35,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4
  },
  gradient: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    alignItems: 'center'
  },
  label: {
    ...typography.body,
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 0.4
  },
  pressed: {
    transform: [{ scale: 0.99 }]
  },
  disabled: {
    opacity: 0.6
  }
});
