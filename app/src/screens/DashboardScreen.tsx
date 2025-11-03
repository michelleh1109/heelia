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
          <View style={styles.cardAccent} />
          <View style={styles.cardContent}>
            <Text style={[styles.title, styles.centerText]}>Scan Complete!</Text>
            <Text style={[styles.body, styles.centerText]}>
              Calibration and scanning are complete. Explore your insights or rerun the setup any time to get the latest fit recommendations.
            </Text>
            <Text style={styles.link} onPress={onRestart}>
              Rerun setup
            </Text>
          </View>
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
    borderRadius: 36,
    // backgroundColor: 'rgba(255,255,255,0.95)',
    shadowColor: palette.blush,
    shadowOpacity: 0.35,
    shadowRadius: 32,
    shadowOffset: { width: 0, height: 16 },
    elevation: 14,
    overflow: 'hidden'
  },
  cardContent: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xl,
    gap: spacing.lg
  },
  title: {
    ...typography.heading
  },
  body: {
    ...typography.body,
    lineHeight: 24
  },
  centerText: {
    textAlign: 'center'
  },
  link: {
    alignSelf: 'center',
    color: palette.coral,
    fontWeight: '700',
    fontSize: 16
  }
});
