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
        <View style={styles.card}>
          <Text style={styles.title}>You’re connected!</Text>
          <Text style={styles.body}>
            Calibration and scanning are complete. Explore your insights or rerun the setup any time to get the latest fit
            recommendations.
          </Text>
          <Text style={styles.link} onPress={onRestart}>
            Rerun setup
          </Text>
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: palette.white,
    padding: spacing.xl,
    borderRadius: 36,
    gap: spacing.lg,
    shadowColor: '#E7D4FF',
    shadowOpacity: 0.35,
    shadowRadius: 32,
    shadowOffset: { width: 0, height: 16 },
    elevation: 14
  },
  title: {
    ...typography.heading
  },
  body: {
    ...typography.body,
    textAlign: 'center',
    lineHeight: 24
  },
  link: {
    alignSelf: 'center',
    color: palette.coral,
    fontWeight: '700',
    fontSize: 16
  }
});
