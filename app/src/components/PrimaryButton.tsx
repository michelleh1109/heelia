import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { gradients, palette, spacing, typography } from '../theme';

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ label, onPress, disabled }) => {
  return (
    <Pressable onPress={onPress} disabled={disabled} style={({ pressed }) => [styles.container, pressed && styles.pressed]}>
      <LinearGradient colors={gradients.button} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.gradient, disabled && styles.disabled]}>
        <Text style={styles.label}>{label}</Text>
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '50%',
    borderRadius: 50,
    overflow: 'hidden',
    shadowColor: palette.coral,
    shadowOpacity: 0.3,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 5 },
    elevation: 6
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
    color: palette.white,
    letterSpacing: 0.4
  },
  pressed: {
    opacity: 0.85
  },
  disabled: {
    opacity: 0.55
  }
});
