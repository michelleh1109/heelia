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
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.overline}>Scan complete</Text>
          <Text style={styles.timestamp}>May 12, 2026</Text>
        </View>

        {/* Compact summary */}
        <LinearGradient colors={gradients.highlight} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.summary}>
          <View style={styles.summaryRow}>
            <View style={styles.scoreTile}>
              <Text style={styles.scoreValue}>-1.6</Text>
              <Text style={styles.scoreLabel}>T-score</Text>
            </View>

            {/* <View style={styles.summaryRight}> */}
              <View style={styles.statusPill}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>Moderate fall risk.</Text>
              </View>
            

              <Text style={styles.previousInline}>
                <Text style={styles.previousLabel}>Previous</Text>
                <Text style={styles.previousValue}>  +0.2 · Apr 18, 2026</Text>
              </Text>
            </View>
  
          {/* </View> */}
        </LinearGradient>

        {/* Small metric chips */}
        <View style={styles.chipRow}>
          <View style={styles.chip}>
            <Text style={styles.chipTitle}>Scan duration</Text>
            <Text style={styles.chipValue}>1.2 sec</Text>
          </View>
          <View style={styles.chip}>
            <Text style={styles.chipTitle}>Streak</Text>
            <Text style={styles.chipValue}>6 weeks</Text>
          </View>
          <View style={styles.chip}>
            <Text style={styles.chipTitle}>Next DXA Scan</Text>
            <Text style={styles.chipValue}>in 2 months</Text>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, justifyContent: 'flex-end' },

  sheetContent: {
    gap: spacing.md,               // tighter vertical rhythm
    paddingTop: spacing.sm,
  },

  header: { gap: spacing.xs / 2 },
  overline: {
    ...typography.body,
    fontSize: 12,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: palette.mist,
  },
  timestamp: {
    ...typography.body,
    fontSize: 18,
    fontWeight: '600',
    color: palette.graphite,
  },

  /* ===== Summary (compact) ===== */
  summary: {
    borderRadius: 24,
    padding: spacing.md,           // less padding
    shadowColor: '#E7D4FF',
    shadowOpacity: 0.22,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
  },
  summaryRow: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: spacing.md,
  },
  scoreTile: {
    width: 200,                    // smaller tile
    height: 96,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.82)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs / 2,
  },
  scoreValue: { ...typography.heading,
    textAlign: 'center'},
  scoreLabel: {
    ...typography.body,
    fontSize: 13,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: palette.mist,
  },
  summaryRight: {
    minWidth: 160,
    gap: spacing.sm,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: palette.coral,
  },
  statusText: {
    ...typography.body,
    color: palette.coral,
  },
  previousInline: {
    ...typography.body,
    color: palette.graphite,
  },
  previousLabel: {
    ...typography.body,
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: palette.mist,
  },
  previousValue: {
    ...typography.body,
    fontWeight: '600',
    color: palette.graphite,
  },

  /* ===== Metric chips (no big cards) ===== */
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    flexGrow: 1,
    flexBasis: '30%',
    minWidth: 120,
    borderRadius: 16,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: 'rgba(232,226,255,0.55)',
    shadowColor: '#E7D4FF',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    gap: 2,
  },
  chipTitle: {
    ...typography.body,
    fontSize: 12,
    color: palette.mist,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  chipValue: {
    ...typography.heading,
    fontSize: 20,
    lineHeight: 32, 
    color: palette.graphite,
  },

  /* ===== CTA ===== */
  cta: { borderRadius: 26, overflow: 'hidden', marginTop: spacing.sm },
  ctaPressed: { opacity: 0.92 },
  ctaBg: { paddingVertical: spacing.sm, alignItems: 'center' },
  ctaLabel: { ...typography.body, fontSize: 16, fontWeight: '700', color: palette.white },
});
