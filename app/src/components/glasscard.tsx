import React from 'react';
import { View, ViewStyle, StyleSheet, StyleProp } from 'react-native';

interface GlassCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  borderRadius?: number;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  style,
  borderRadius = 24,
  backgroundColor = 'rgba(255, 255, 255, 0.4)',
  borderColor = 'rgba(255, 255, 255, 0.6)',
  borderWidth = 1.5,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
          borderRadius,
          borderColor,
          borderWidth,
        },
        style,
      ]}
    >
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  content: {
    position: 'relative',
  },
});