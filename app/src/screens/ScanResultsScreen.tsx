import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenContainer } from '../components/ScreenContainer';
import { gradients, palette, spacing, typography } from '../theme';

interface ScanResultsScreenProps {
  onNext: () => void;
}

export const ScanResultsScreen: React.FC<ScanResultsScreenProps> = ({ onNext }) => {
  const appear = useRef(new Animated.Value(0)).current;
  const translate = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(appear, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true
      }),
      Animated.timing(translate, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true
      })
    ]).start();
  }, [appear, translate]);

  return (
    <ScreenContainer>
      <Animated.View style={[styles.wrapper, { opacity: appear, transform: [{ translateY: translate }] }]}>
        <View style={styles.header}>
          <Text style={styles.overline}>Scan complete</Text>
          <Text style={styles.timestamp}>Captured May 12, 2026 · 09:42 AM</Text>
        </View>

        <LinearGradient colors={gradients.highlight} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.resultCard}>
          <View style={styles.scoreBadge}>
            <Text style={styles.scoreValue}>-1.6</Text>
            <Text style={styles.scoreLabel}>T-score</Text>
          </View>

          <View style={styles.riskPanel}>
            <Text style={styles.riskLevel}>Moderate fall risk</Text>
            <Text style={styles.riskBody}>Bone structure improving. Maintain daily balance exercises and calcium intake.</Text>
          </View>

          <View style={styles.deltaRow}>
            <View>
              <Text style={styles.deltaLabel}>+0.2 from your last scan</Text>
              <Text style={styles.deltaSub}>Previous: -1.8 · Apr 18, 2026</Text>
            </View>
            <View style={styles.pulseDot} />
          </View>
        </LinearGradient>

        <View style={styles.metricsRow}>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>92%</Text>
            <Text style={styles.metricLabel}>Stability index</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>48%</Text>
            <Text style={styles.metricLabel}>Risk reduced</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <Text style={styles.actionHint}>Review deeper insights anytime on your dashboard.</Text>
          <Pressable onPress={onNext} style={({ pressed }) => [styles.arrowButtonWrapper, pressed && styles.arrowPressed]}>
            <LinearGradient colors={gradients.button} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.arrowButton}>
              <Text style={styles.arrowIcon}>→</Text>
            </LinearGradient>
            <Text style={styles.actionLabel}>Dashboard</Text>
          </Pressable>
        </View>
      </Animated.View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    gap: spacing.xl
  },
  header: {
    gap: spacing.xs
  },
  overline: {
    ...typography.body,
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontSize: 12,
    color: palette.mist
  },
  timestamp: {
    ...typography.body,
    color: palette.graphite,
    fontSize: 18,
    fontWeight: '600'
  },
  resultCard: {
    borderRadius: 40,
    padding: spacing.xl,
    gap: spacing.lg,
    shadowColor: '#E7D4FF',
    shadowOpacity: 0.32,
    shadowRadius: 32,
    shadowOffset: { width: 0, height: 18 }
  },
  scoreBadge: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    shadowColor: '#FFD6CE',
    shadowOpacity: 0.45,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    gap: spacing.xs
  },
  scoreValue: {
    fontSize: 56,
    fontWeight: '700',
    color: palette.graphite
  },
  scoreLabel: {
    ...typography.body,
    color: palette.mist,
    letterSpacing: 1.5,
    textTransform: 'uppercase'
  },
  riskPanel: {
    backgroundColor: 'rgba(46, 42, 58, 0.08)',
    borderRadius: 28,
    padding: spacing.lg,
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
  deltaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.72)',
    shadowColor: '#F4DADA',
    shadowOpacity: 0.4,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 }
  },
  deltaLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: palette.coral
  },
  deltaSub: {
    ...typography.body,
    color: palette.mist
  },
  pulseDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: palette.coral,
    shadowColor: palette.coral,
    shadowOpacity: 0.6,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 }
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md
  },
  metricCard: {
    flex: 1,
    borderRadius: 28,
    padding: spacing.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.82)',
    shadowColor: '#E7D4FF',
    shadowOpacity: 0.3,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    gap: spacing.sm
  },
  metricValue: {
    fontSize: 32,
    fontWeight: '700',
    color: palette.graphite
  },
  metricLabel: {
    ...typography.body,
    color: palette.mist
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
  arrowButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm
  },
  arrowPressed: {
    opacity: 0.85
  },
  arrowButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: palette.coral,
    shadowOpacity: 0.35,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 12 }
  },
  arrowIcon: {
    fontSize: 28,
    fontWeight: '700',
    color: palette.white
  },
  actionLabel: {
    ...typography.body,
    fontSize: 18,
    fontWeight: '700',
    color: palette.graphite
  }
});

