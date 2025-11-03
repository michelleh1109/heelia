import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { palette, spacing, typography } from '../theme';
import { ScreenContainer } from '../components/ScreenContainer';

interface DashboardScreenProps {
  onRestart: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ onRestart }) => {
  return (
    <ScreenContainer>
      <View style={styles.wrapper}>
        <Text style={styles.title}>You’re connected!</Text>
        <Text style={styles.body}>
          Calibration and scanning are complete. Explore your insights or rerun the setup any time to get the latest
          fit recommendations.
        </Text>
        <Text style={styles.link} onPress={onRestart}>
          Rerun setup
        </Text>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.md
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
  },
  link: {
    color: palette.blush,
    fontWeight: '600',
    fontSize: 16
  }
});
