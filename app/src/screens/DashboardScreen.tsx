import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { palette, spacing, typography } from '../theme';
import { ScreenContainer } from '../components/ScreenContainer';
import { PrimaryButton } from '../components/PrimaryButton';

interface DashboardScreenProps {
  onRestart: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ onRestart }) => {
  return (
    <ScreenContainer scrollable>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarInitial}>M</Text>
        </View>
        <View style={styles.headerCopy}>
          <Text style={styles.greeting}>Hi Michelle</Text>
          <Text style={styles.rangeLabel}>Jan 1–May 30, 2025</Text>
        </View>
        <PrimaryButton label="New Scan" onPress={onRestart} style={styles.newScanButton} />
      </View>

      <View style={styles.graphCard}>
        <Text style={styles.graphTitle}>Z-Score trend</Text>
        <View style={styles.graphPlaceholder}>
          <Text style={styles.graphHint}>Beautiful graph coming soon</Text>
        </View>
      </View>

      <View style={styles.tilesRow}>
        <View style={styles.tile}>
          <Text style={styles.tileLabel}>Latest bone density</Text>
          <Text style={styles.tileValue}>-1.12</Text>
          <Text style={styles.tileHelper}>Z-Score</Text>
        </View>
        <View style={styles.tile}>
          <Text style={styles.tileLabel}>Overall change</Text>
          <Text style={styles.tileValue}>+0.71</Text>
          <Text style={styles.tileHelper}>Since baseline</Text>
        </View>
      </View>

      <View style={styles.tilesRow}>
        <View style={styles.tile}>
          <Text style={styles.tileLabel}>Weight bearing</Text>
          <Text style={styles.tileValue}>220</Text>
          <Text style={styles.tileHelper}>Minutes</Text>
        </View>
        <View style={styles.tile}>
          <Text style={styles.tileLabel}>Protein intake</Text>
          <Text style={styles.tileValue}>999</Text>
          <Text style={styles.tileHelper}>Grams</Text>
        </View>
      </View>

      <Text style={styles.secondaryAction} onPress={onRestart}>
        Rerun setup
      </Text>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: palette.softLavender,
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarInitial: {
    ...typography.heading,
    fontSize: 22
  },
  headerCopy: {
    flex: 1,
    gap: spacing.xs
  },
  greeting: {
    ...typography.heading,
    fontSize: 24
  },
  rangeLabel: {
    ...typography.body,
    color: palette.textSecondary
  },
  newScanButton: {
    alignSelf: 'flex-end',
    minWidth: 140
  },
  graphCard: {
    marginTop: spacing.lg,
    padding: spacing.lg,
    borderRadius: 32,
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.border,
    shadowColor: '#DAD1FF',
    shadowOpacity: 0.35,
    shadowRadius: 26,
    shadowOffset: { width: 0, height: 18 },
    elevation: 8,
    gap: spacing.md
  },
  graphTitle: {
    ...typography.body,
    color: palette.textPrimary,
    fontWeight: '600',
    letterSpacing: 0.4
  },
  graphPlaceholder: {
    height: 160,
    borderRadius: 24,
    backgroundColor: 'rgba(228, 218, 255, 0.45)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  graphHint: {
    ...typography.body,
    color: palette.textSecondary
  },
  tilesRow: {
    flexDirection: 'row',
    gap: spacing.md
  },
  tile: {
    flex: 1,
    borderRadius: 28,
    padding: spacing.lg,
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.border,
    shadowColor: '#E6DFFF',
    shadowOpacity: 0.35,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 12 },
    elevation: 6,
    gap: spacing.sm
  },
  tileLabel: {
    ...typography.body,
    fontSize: 15,
    letterSpacing: 0.4,
    textTransform: 'uppercase'
  },
  tileValue: {
    ...typography.heading,
    fontSize: 32
  },
  tileHelper: {
    ...typography.body,
    color: palette.textSecondary
  },
  secondaryAction: {
    ...typography.body,
    marginTop: spacing.lg,
    textAlign: 'center',
    color: palette.accentPink,
    fontWeight: '600'
  }
});
