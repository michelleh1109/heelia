import React, { useCallback, useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BottomSheet, BottomSheetHandle } from '../components/BottomSheet';
import { gradients, palette, spacing, typography } from '../theme';

interface ScanResultsScreenProps {
  onNext: () => void;
}

export const ScanResultsScreen: React.FC<ScanResultsScreenProps> = ({ onNext }) => {
  const sheetRef = useRef<BottomSheetHandle>(null);

  const handleContinue = useCallback(() => {
    if (sheetRef.current) {
      sheetRef.current.close();
      return;
    }
    onNext();
  }, [onNext]);

  const handleClosed = useCallback(() => {
    onNext();
  }, [onNext]);

  return (
    <View style={styles.root}>
      <LinearGradient colors={gradients.background} style={StyleSheet.absoluteFill} />
      <BottomSheet ref={sheetRef} onClosed={handleClosed} contentStyle={styles.sheetContent}>
        <View style={styles.header}>
          <Text style={styles.overline}>Scan complete</Text>
          <Text style={styles.timestamp}>Captured May 12, 2026 · 09:42 AM</Text>
        </View>

        <LinearGradient colors={gradients.highlight} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <View style={styles.scoreColumn}>
              <Text style={styles.scoreValue}>-1.6</Text>
              <Text style={styles.scoreLabel}>T-score</Text>
              <View style={styles.deltaPill}>
                <Text style={styles.deltaValue}>+0.2</Text>
                <Text style={styles.deltaLabel}>vs. last scan</Text>
              </View>
            </View>
            <View style={styles.insightColumn}>
              <Text style={styles.riskLevel}>Improving trend</Text>
              <Text style={styles.riskBody}>
                Bone health is trending upward. Keep up the balance work and calcium support routine.
              </Text>
              <View style={styles.statusRow}>
                <View style={styles.statusDot} />
                <Text style={styles.statusLabel}>Moderate fall risk</Text>
              </View>
            </View>
          </View>
          <View style={styles.previousRow}>
            <Text style={styles.previousLabel}>Previous</Text>
            <Text style={styles.previousValue}>-1.8 · Apr 18, 2026</Text>
          </View>
        </LinearGradient>

        <View style={styles.metricsGrid}>
          <View style={styles.metricCard}>
            <Text style={styles.metricHeading}>Scan duration</Text>
            <Text style={styles.metricValue}>1.2 sec</Text>
            <Text style={styles.metricHelper}>Capture time stayed within target window.</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricHeading}>Streak</Text>
            <Text style={styles.metricValue}>6 weeks</Text>
            <Text style={styles.metricHelper}>Consistent weekly scans maintain your baseline.</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricHeading}>Next check-in</Text>
            <Text style={styles.metricValue}>in 2 days</Text>
            <Text style={styles.metricHelper}>We will remind you about your strength session.</Text>
          </View>
        </View>

        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>Suggested focus</Text>
          <View style={styles.tipRow}>
            <View style={styles.tipBullet} />
            <Text style={styles.tipText}>Add 10 minutes of balance work to your next walk.</Text>
          </View>
          <View style={styles.tipRow}>
            <View style={styles.tipBullet} />
            <Text style={styles.tipText}>Log calcium supplements by 10 AM and 8 PM today.</Text>
          </View>
          <View style={styles.tipRow}>
            <View style={styles.tipBullet} />
            <Text style={styles.tipText}>Share today’s scan with Dr. Patel ahead of your visit.</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <Text style={styles.actionHint}>Insights are now saved. Review trends or share with your care team anytime.</Text>
          <Pressable onPress={handleContinue} style={({ pressed }) => [styles.actionButton, pressed && styles.actionButtonPressed]}>
            <LinearGradient colors={gradients.button} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.buttonBackground}>
              <Text style={styles.buttonLabel}>Go to dashboard</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  sheetContent: {
    gap: spacing.lg
  },
  header: {
    gap: spacing.xs / 2
  },
  overline: {
    ...typography.body,
    fontSize: 12,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: palette.mist
  },
  timestamp: {
    ...typography.body,
    fontSize: 18,
    fontWeight: '600',
    color: palette.graphite
  },
  summaryCard: {
    borderRadius: 32,
    padding: spacing.lg,
    gap: spacing.lg,
    shadowColor: '#E7D4FF',
    shadowOpacity: 0.35,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 16 }
  },
  summaryRow: {
    flexDirection: 'row',
    gap: spacing.lg
  },
  scoreColumn: {
    width: 132,
    borderRadius: 28,
    padding: spacing.md,
    backgroundColor: 'rgba(255,255,255,0.78)',
    alignItems: 'center',
    gap: spacing.sm
  },
  scoreValue: {
    fontSize: 44,
    fontWeight: '700',
    color: palette.graphite
  },
  scoreLabel: {
    ...typography.body,
    fontSize: 14,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: palette.mist
  },
  deltaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs / 2,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 1.5,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 139, 124, 0.16)'
  },
  deltaValue: {
    fontSize: 18,
    fontWeight: '700',
    color: palette.coral
  },
  deltaLabel: {
    ...typography.body,
    fontSize: 13,
    color: palette.coral
  },
  insightColumn: {
    flex: 1,
    gap: spacing.sm
  },
  riskLevel: {
    fontSize: 22,
    fontWeight: '700',
    color: palette.graphite
  },
  riskBody: {
    ...typography.body,
    lineHeight: 22
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: palette.coral
  },
  statusLabel: {
    ...typography.body,
    fontWeight: '600',
    color: palette.coral
  },
  previousRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.8)'
  },
  previousLabel: {
    ...typography.body,
    fontSize: 14,
    color: palette.mist,
    textTransform: 'uppercase',
    letterSpacing: 1.1
  },
  previousValue: {
    ...typography.body,
    fontWeight: '600',
    color: palette.graphite
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md
  },
  metricCard: {
    flexBasis: '48%',
    flexGrow: 1,
    borderRadius: 28,
    padding: spacing.md,
    backgroundColor: palette.white,
    gap: spacing.xs,
    borderWidth: 1,
    borderColor: 'rgba(232, 226, 255, 0.5)',
    shadowColor: '#E7D4FF',
    shadowOpacity: 0.22,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 12 }
  },
  metricHeading: {
    ...typography.body,
    fontSize: 14,
    color: palette.mist,
    textTransform: 'uppercase',
    letterSpacing: 1
  },
  metricValue: {
    fontSize: 22,
    fontWeight: '700',
    color: palette.graphite
  },
  metricHelper: {
    ...typography.body,
    fontSize: 15,
    lineHeight: 20
  },
  tipCard: {
    borderRadius: 28,
    padding: spacing.lg,
    backgroundColor: 'rgba(255, 247, 242, 0.85)',
    gap: spacing.sm
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: palette.graphite
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm
  },
  tipBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
    backgroundColor: palette.coral
  },
  tipText: {
    ...typography.body,
    flex: 1,
    lineHeight: 20
  },
  actions: {
    alignItems: 'center',
    gap: spacing.sm
  },
  actionHint: {
    ...typography.body,
    textAlign: 'center',
    color: palette.mist
  },
  actionButton: {
    borderRadius: 30,
    overflow: 'hidden'
  },
  actionButtonPressed: {
    opacity: 0.9
  },
  buttonBackground: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    alignItems: 'center'
  },
  buttonLabel: {
    ...typography.body,
    fontSize: 17,
    fontWeight: '700',
    color: palette.white
  }
});
