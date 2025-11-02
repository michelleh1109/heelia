import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { gradients, spacing, typography } from '../theme';

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ label, onPress, disabled }) => {
  return (
    <Pressable onPress={onPress} disabled={disabled} style={({ pressed }) => [styles.container, pressed && styles.pressed]}>
      <LinearGradient colors={gradients.button} style={[styles.gradient, disabled && styles.disabled]}>
        <Text style={styles.label}>{label}</Text>
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 28,
    overflow: 'hidden'
  },
  gradient: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    alignItems: 'center'
  },
  label: {
    ...typography.body,
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff'
  },
  pressed: {
    opacity: 0.9
  },
  disabled: {
    opacity: 0.5
  }
});
