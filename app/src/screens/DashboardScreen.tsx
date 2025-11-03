import React, { useMemo, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  LayoutChangeEvent
} from 'react-native';
import { palette, spacing, typography } from '../theme';
import { ScreenContainer } from '../components/ScreenContainer';
import { GlassCard } from '../components/glasscard';

type TimeframeKey = '1M' | '6M' | '1Y' | 'ALL';

const timeframeOptions: { key: TimeframeKey; label: string }[] = [
  { key: '1M', label: 'M' },
  { key: '6M', label: '6M' },
  { key: '1Y', label: '1Y' },
  { key: 'ALL', label: 'All' }
];

const densityTrend: Record<TimeframeKey, { rangeLabel: string; data: number[]; insight: string }> = {
  '1M': {
    rangeLabel: 'May 1 - May 30, 2026',
    data: [-1.82, -1.79, -1.76, -1.72, -1.69, -1.66, -1.63],
    insight: 'Short-term gains from consistency this month.',
  },
  '6M': {
    rangeLabel: 'Jan 1 - May 30, 2026',
    data: [-2.12, -2.04, -1.98, -1.9, -1.84, -1.74, -1.63],
    insight: 'Steady upward trend across the last six months.',
  },
  '1Y': {
    rangeLabel: 'May 2025 - May 2026',
    data: [-2.22, -2.14, -2.05, -1.95, -1.82, -1.73, -1.63],
    insight: 'Year-over-year progress showing meaningful recovery.',
  },
  ALL: {
    rangeLabel: 'First scan - Today',
    data: [-2.32, -2.24, -2.15, -1.98, -1.85, -1.75, -1.63],
    insight: 'Long-term improvement from your starting baseline.',
  }
};

interface MetricCard {
  key: string;
  title: string;
  headline: string;
  helper: string;
  accent?: string;
  onPress?: () => void;
}

interface DashboardScreenProps {
  onRestart: () => void;
  onOpenEducation: () => void;
}

const MAX_W = 360;

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ onRestart, onOpenEducation }) => {
  const [selectedRange, setSelectedRange] = useState<TimeframeKey>('6M');
  const [chartSize, setChartSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  const chartSummary = useMemo(() => {
    const dataset = densityTrend[selectedRange];
    const values = dataset.data;
    const current = values[values.length - 1];
    const starting = values[0];
    const delta = current - starting;
    const deltaPerc = (starting-current)/starting * 100;
    const minValue = Math.min(...values, -2.6);
    const maxValue = Math.max(...values, -1.2);
    const range = maxValue - minValue || 1;

    const points = values.map((value, index) => {
      if (!chartSize.width || !chartSize.height) return { x: 0, y: 0, value };
      const ratio = values.length > 1 ? index / (values.length - 1) : 0;
      const normalized = (value - minValue) / range;
      const x = ratio * chartSize.width;
      const y = chartSize.height - normalized * chartSize.height;
      return { x, y, value };
    });

    return { ...dataset, current, starting, delta, deltaPerc, minValue, maxValue, points };
  }, [chartSize.height, chartSize.width, selectedRange]);

  const chartSegments = useMemo(() => {
    const segments: { key: string; length: number; angle: number; x: number; y: number }[] = [];
    const { points } = chartSummary;
    if (!chartSize.width || !chartSize.height) return segments;
    for (let i = 0; i < points.length - 1; i++) {
      const s = points[i]; const e = points[i + 1];
      const dx = e.x - s.x; const dy = e.y - s.y;
      const length = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx);
      segments.push({ key: `segment-${i}`, length, angle, x: s.x, y: s.y });
    }
    return segments;
  }, [chartSummary, chartSize.height, chartSize.width]);

  const metricCards: MetricCard[] = useMemo(
    () => [
      {
        key: 'latest-density',
        title: 'Latest Bone Density',
        headline: `${chartSummary.current.toFixed(2)} T-score`,
        helper: 'Captured May 12, 2026',
        accent: palette.graphite
      },
      {
        key: 'overall-change',
        title: 'Overall Change in Density',
        headline: `${chartSummary.delta >= 0 ? '+' : ''}${chartSummary.delta.toFixed(2)}`,
        helper: `Started at ${chartSummary.starting.toFixed(2)} T-score`,
        accent: palette.coral
      },
      {
        key: 'exercise',
        title: 'Weight Bearing Exercise',
        headline: '230 min this month',
        helper: 'Goal: 200 min',
        accent: '#6F6AE0'
      },
      {
        key: 'calcium',
        title: 'Calcium Supplements',
        headline: '1,200 mg daily',
        helper: 'Taken at breakfast & dinner',
        accent: '#F08BB0'
      },
      {
        key: 'dexascan',
        title: 'Since last DEXA scan',
        headline: '18 months',
        helper: 'Schedule around Nov 2026',
        accent: '#4CB4A6'
      }
    ],
    [chartSummary.current, chartSummary.delta, chartSummary.starting]
  );

  const onChartLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setChartSize({ width, height });
  };

  const deltaLabel = `${chartSummary.deltaPerc >= 0 ? '+' : ''}${chartSummary.deltaPerc.toFixed(2)}%`;
  const trendBadgeLabel = chartSummary.delta >= 0 ? 'Moderate Risk' : 'Needs attention';

  const renderMetricCard = (card: MetricCard) => {
    const cardStyle: ViewStyle = { borderColor: `${card.accent ?? palette.coral}33` };
    return (
      <Pressable
        key={card.key}
        onPress={card.onPress}
        style={({ pressed }) => [styles.metricCardPressable, pressed && styles.metricCardPressed]}
      >
        <GlassCard style={[styles.metricCard, cardStyle]}>
          <Text style={styles.metricTitle}>{card.title}</Text>
          <Text style={[styles.metricHeadline, card.accent ? { color: card.accent } : null]}>{card.headline}</Text>
          <Text style={styles.metricHelper}>{card.helper}</Text>
        </GlassCard>
      </Pressable>
    );
  };

  return (
    <ScreenContainer style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.section}>
          <View style={[styles.headerRow, styles.bound]}>
            <View>
              <Text style={styles.welcome}>Good morning</Text>
              <Text style={styles.name}>Michelle</Text>
            </View>
            <Pressable onPress={onRestart} style={({ pressed }) => [styles.scanButton, pressed && styles.scanButtonPressed]}>
              <Text style={styles.scanButtonLabel}>+ Scan</Text>
            </Pressable>
          </View>
        </View>

        {/* HERO */}
        <View style={styles.section}>
          <LinearGradient
            colors={['#FFEAE5', '#F2E9FF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.heroCard, styles.bound]}
          >
            <View style={styles.heroLeft}>
              <Text style={styles.heroLabel}>Bone density</Text>
              <Text style={styles.heroValue}>{chartSummary.current.toFixed(2)}</Text>
              <Text style={styles.heroSubhead}>Latest T-score</Text>
            </View>
            <View style={styles.heroRight}>
              <View style={styles.heroBadge}>
                <View style={styles.statusDot} />
                <Text style={styles.heroBadgeLabel}>{trendBadgeLabel}</Text>
              </View>
              <Pressable onPress={onOpenEducation} style={({ pressed }) => [styles.educationPill, pressed && styles.educationPillPressed]}>
                <Text style={styles.educationPillLabel}>Understand →</Text>
              </Pressable>
            </View>
          </LinearGradient>
        </View>

        {/* TOGGLE */}
        <View style={[styles.section, styles.bound]}>
          <View style={styles.toggleRow}>
            <Text style={styles.sectionLabel}>Time Period</Text>
            <View style={styles.timeframeRow}>
              {timeframeOptions.map((option) => {
                const active = option.key === selectedRange;
                return (
                  <Pressable
                    key={option.key}
                    onPress={() => setSelectedRange(option.key)}
                    style={[styles.timeframePill, active && styles.timeframePillActive]}
                  >
                    <Text style={[styles.timeframeLabel, active && styles.timeframeLabelActive]}>
                      {option.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </View>

        {/* CHART */}
        <View style={styles.section}>
          <GlassCard style={[styles.chartCard, styles.bound]}>
            <View style={styles.chartHeader}>
              <View>
                <Text style={styles.chartRange}>{chartSummary.rangeLabel}</Text>
              </View>
              <View style={styles.scoreBubble}>
                <Text style={styles.scoreValue}>{6.5}</Text>
                <Text style={styles.scoreLabel}>Week Streak</Text>
              </View>
            </View>

            <View style={styles.axisRow}>
              <Text style={styles.axisLabel}>+2</Text>
              <Text style={styles.axisLabel}>0</Text>
              <Text style={styles.axisLabel}>-2</Text>
            </View>

            <View style={styles.chartSurfaceContainer}>
              <LinearGradient colors={['#FFEAE5', '#F5E6FF']} style={styles.chartSurface}>
                <View style={styles.chartSurfaceOverlay} onLayout={onChartLayout}>
                  {chartSegments.map((s) => (
                    <View
                      key={s.key}
                      style={[
                        styles.chartSegment,
                        {
                          left: s.x,
                          top: s.y,
                          width: s.length,
                          transform: [{ translateY: -1.5 }, { rotateZ: `${s.angle}rad` }]
                        }
                      ]}
                    />
                  ))}
                  {chartSummary.points.map((p, i) => (
                    <View key={`dot-${i}`} style={[styles.chartDot, { left: Math.max(p.x - 6, 0), top: Math.max(p.y - 6, 0) }]} />
                  ))}
                </View>
              </LinearGradient>
            </View>

            <View style={styles.deltaPill}>
              <Text style={styles.deltaValue}>{deltaLabel}</Text>
              <Text style={styles.deltaLabel}>change from start</Text>
            </View>
          </GlassCard>
        </View>

        {/* METRICS */}
        <View style={[styles.section, styles.bound]}>
          <View style={styles.metricsHeader}>
            <Text style={styles.metricsTitle}>About your bone health</Text>
          </View>

          <View style={styles.metricsGrid}>
            {metricCards.map(renderMetricCard)}
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.xl,
    paddingHorizontal: spacing.xl,
  },
  scrollContainer: {
    paddingBottom: spacing.xl * 1.5,
    gap: spacing.xl,
    alignItems: 'center',
  },
  section: { width: '100%' },
  bound: {
    width: '100%',
    maxWidth: MAX_W,
    alignSelf: 'center',
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcome: { ...typography.body, color: palette.mist, fontSize: 15},
  name: { ...typography.heading, fontSize: 32 },

  scanButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 24,
    backgroundColor: palette.coral,
    shadowColor: palette.coral,
    shadowOpacity: 0.24,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
  },
  scanButtonPressed: { opacity: 0.85 },
  scanButtonLabel: { color: palette.white, fontWeight: '700', fontSize: 16 },

  heroCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 28,
    padding: spacing.lg,
    gap: spacing.lg,
    shadowColor: '#E7D4FF',
    shadowOpacity: 0.24,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 14 },
  },
  heroLeft: { gap: spacing.xs / 2, minWidth: 140 },
  heroLabel: { ...typography.body, fontSize: 12, letterSpacing: 1, textTransform: 'uppercase', color: palette.mist },
  heroValue: { fontSize: 48, fontWeight: '700', color: palette.graphite },
  heroSubhead: { ...typography.body, color: palette.graphite },

  heroRight: { flex: 1, alignItems: 'flex-start', gap: spacing.sm },
  heroBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.xs, paddingVertical: spacing.xs, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.7)' },
  heroBadgeLabel: { ...typography.body, fontSize: 12, color: palette.coral, paddingHorizontal: spacing.xs},
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 7,
    backgroundColor: palette.coral,
  },

  educationPill: {
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xs,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.85)',
    shadowColor: '#E7D4FF',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  educationPillPressed: { opacity: 0.8 },
  educationPillLabel: { ...typography.body, fontSize: 12, color: palette.graphite },

  toggleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sectionLabel: { ...typography.body, fontWeight:'400', color: palette.graphite },
  timeframeRow: { flexDirection: 'row', backgroundColor: 'rgba(46, 42, 58, 0.06)', borderRadius: 24, padding: 4, gap: 4 },
  timeframePill: { paddingHorizontal: spacing.sm, paddingVertical: 8, borderRadius: 20 },
  timeframePillActive: {
    backgroundColor: palette.white,
    shadowColor: '#E7D4FF',
    shadowOpacity: 0.45,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
  timeframeLabel: { ...typography.body, color: palette.mist },
  timeframeLabelActive: { color: palette.graphite },

  chartCard: {
    padding: spacing.lg,
    borderRadius: 28,
    gap: spacing.md,
    shadowColor: '#E3D8FF',
    shadowOpacity: 0.22,
    shadowRadius: 26,
    shadowOffset: { width: 0, height: 12 },
    borderWidth: 1.2,
  },
  chartHeader: { flexDirection: 'row', justifyContent: 'space-between', gap: spacing.md },
  chartRange: { ...typography.body, fontSize:14, color: palette.graphite },

  scoreBubble: { alignSelf: 'flex-start', alignItems: 'flex-start', paddingHorizontal: spacing.sm, paddingVertical: spacing.sm, borderRadius: 20, backgroundColor: '#F9F4FF' },
  scoreValue: { fontSize: 22, fontWeight: '700', color: palette.graphite },
  scoreLabel: { fontSize: 11, color: palette.mist, textTransform: 'uppercase', letterSpacing: 1.1 },

  axisRow: { flexDirection: 'row', justifyContent: 'space-between' },
  axisLabel: { fontSize: 12, color: palette.mist },

  chartSurfaceContainer: { height: 220, borderRadius: 24, overflow: 'hidden' },
  chartSurface: { flex: 1 },
  chartSurfaceOverlay: { flex: 1 },
  chartSegment: { position: 'absolute', height: 3, borderRadius: 3, backgroundColor: palette.coral, opacity: 0.65 },
  chartDot: { position: 'absolute', width: 12, height: 12, borderRadius: 6, backgroundColor: palette.white, borderWidth: 2, borderColor: palette.coral },

  deltaPill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 139, 124, 0.12)',
  },
  deltaValue: { fontSize: 16, fontWeight: '700', color: palette.coral },
  deltaLabel: { fontSize: 12, color: palette.mist, textTransform: 'uppercase' },

  metricsHeader: { gap: spacing.xs / 2, marginBottom: spacing.sm },
  metricsTitle: { fontSize: 20, fontWeight: '700', color: palette.graphite },
  
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },

  metricCardPressable: {
    width: '45%',
    borderRadius: 24,
  },

  metricCard: {
    padding: spacing.md,
    borderRadius: 24,
    gap: spacing.xs,
    shadowColor: '#E7D4FF',
    shadowOpacity: 0.4,
    shadowRadius: 25,
    shadowOffset: { width: 0, height: 10 },
    borderWidth: 1.2,
  },
  metricCardPressed: { transform: [{ scale: 0.98 }], opacity: 0.92 },
  metricTitle: { fontSize: 12, color: palette.mist, textTransform: 'uppercase', letterSpacing: 1 },
  metricHeadline: { fontSize: 20, fontWeight: '700', color: palette.graphite },
  metricHelper: { ...typography.body, fontSize: 15, lineHeight: 20 },
});