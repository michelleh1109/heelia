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
    insight: 'Short-term improvements are holding steady with daily routines.'
  },
  '6M': {
    rangeLabel: 'Jan 1 - May 30, 2026',
    data: [-2.12, -2.04, -1.98, -1.9, -1.84, -1.74, -1.63],
    insight: 'Six-month trend shows a strong response to strength training and supplements.'
  },
  '1Y': {
    rangeLabel: 'May 2025 - May 2026',
    data: [-2.28, -2.18, -2.12, -2.02, -1.94, -1.84, -1.63],
    insight: 'A full year of consistency has reversed prior declines in bone density.'
  },
  ALL: {
    rangeLabel: 'First scan - Today',
    data: [-2.36, -2.31, -2.22, -2.15, -2.04, -1.92, -1.63],
    insight: 'Overall trajectory remains upward since your first heel scan.'
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

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ onRestart, onOpenEducation }) => {
  const [selectedRange, setSelectedRange] = useState<TimeframeKey>('6M');
  const [chartSize, setChartSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  const chartSummary = useMemo(() => {
    const dataset = densityTrend[selectedRange];
    const values = dataset.data;
    const current = values[values.length - 1];
    const starting = values[0];
    const delta = current - starting;
    const minValue = Math.min(...values, -2.6);
    const maxValue = Math.max(...values, -1.2);
    const range = maxValue - minValue || 1;

    const points = values.map((value, index) => {
      if (!chartSize.width || !chartSize.height) {
        return { x: 0, y: 0, value };
      }
      const ratio = values.length > 1 ? index / (values.length - 1) : 0;
      const normalized = (value - minValue) / range;
      const x = ratio * chartSize.width;
      const y = chartSize.height - normalized * chartSize.height;
      return { x, y, value };
    });

    return {
      ...dataset,
      current,
      starting,
      delta,
      minValue,
      maxValue,
      points
    };
  }, [chartSize.height, chartSize.width, selectedRange]);

  const chartSegments = useMemo(() => {
    const segments: { key: string; length: number; angle: number; x: number; y: number }[] = [];
    const { points } = chartSummary;
    if (!chartSize.width || !chartSize.height) {
      return segments;
    }
    for (let index = 0; index < points.length - 1; index += 1) {
      const start = points[index];
      const end = points[index + 1];
      const dx = end.x - start.x;
      const dy = end.y - start.y;
      const length = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx);
      segments.push({ key: `segment-${index}`, length, angle, x: start.x, y: start.y });
    }
    return segments;
  }, [chartSummary, chartSize.height, chartSize.width]);

  const metricCards: MetricCard[] = useMemo(
    () => [
      {
        key: 'latest-density',
        title: 'Latest Bone Density',
        headline: `${chartSummary.current.toFixed(2)} Z-score`,
        helper: 'Captured May 12, 2026',
        accent: palette.graphite
      },
      {
        key: 'overall-change',
        title: 'Overall Change in Density',
        headline: `${chartSummary.delta >= 0 ? '+' : ''}${chartSummary.delta.toFixed(2)} vs start`,
        helper: `Started at ${chartSummary.starting.toFixed(2)} Z-score`,
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
      },
      {
        key: 'education',
        title: 'Personalized Education',
        headline: 'See insights',
        helper: 'Guidance tailored to you',
        accent: palette.softCoral,
        onPress: onOpenEducation
      }
    ],
    [chartSummary.current, chartSummary.delta, chartSummary.starting, onOpenEducation]
  );

  const onChartLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setChartSize({ width, height });
  };

  const deltaLabel = `${chartSummary.delta >= 0 ? '+' : ''}${chartSummary.delta.toFixed(2)}`;

  const renderMetricCard = (card: MetricCard) => {
    const cardStyle: ViewStyle = {
      borderColor: `${card.accent ?? palette.coral}33`
    };
    return (
      <Pressable
        key={card.key}
        onPress={card.onPress}
        style={({ pressed }) => [styles.metricCard, cardStyle, pressed && styles.metricCardPressed]}
      >
        <Text style={styles.metricTitle}>{card.title}</Text>
        <Text style={[styles.metricHeadline, card.accent ? { color: card.accent } : null]}>{card.headline}</Text>
        <Text style={styles.metricHelper}>{card.helper}</Text>
      </Pressable>
    );
  };

  return (
    <ScreenContainer style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.welcome}>Good morning</Text>
            <Text style={styles.name}>Michelle</Text>
          </View>
          <Pressable onPress={onRestart} style={({ pressed }) => [styles.scanButton, pressed && styles.scanButtonPressed]}>
            <Text style={styles.scanButtonLabel}>New Scan</Text>
          </Pressable>
        </View>

        <View style={styles.toggleRow}>
          <Text style={styles.sectionLabel}>Z-score</Text>
          <View style={styles.timeframeRow}>
            {timeframeOptions.map((option) => {
              const active = option.key === selectedRange;
              return (
                <Pressable
                  key={option.key}
                  onPress={() => setSelectedRange(option.key)}
                  style={[styles.timeframePill, active && styles.timeframePillActive]}
                >
                  <Text style={[styles.timeframeLabel, active && styles.timeframeLabelActive]}>{option.label}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <View>
              <Text style={styles.chartRange}>{chartSummary.rangeLabel}</Text>
              <Text style={styles.chartInsight}>{chartSummary.insight}</Text>
            </View>
            <View style={styles.scoreBubble}>
              <Text style={styles.scoreValue}>{chartSummary.current.toFixed(2)}</Text>
              <Text style={styles.scoreLabel}>Current</Text>
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
                {chartSegments.map((segment) => (
                  <View
                    key={segment.key}
                    style={[
                      styles.chartSegment,
                      {
                        left: segment.x,
                        top: segment.y,
                        width: segment.length,
                        transform: [{ translateY: -1.5 }, { rotateZ: `${segment.angle}rad` }]
                      }
                    ]}
                  />
                ))}
                {chartSummary.points.map((point, index) => (
                  <View
                    key={`dot-${index}`}
                    style={[
                      styles.chartDot,
                      {
                        left: Math.max(point.x - 6, 0),
                        top: Math.max(point.y - 6, 0)
                      }
                    ]}
                  />
                ))}
              </View>
            </LinearGradient>
          </View>

          <View style={styles.deltaPill}>
            <Text style={styles.deltaValue}>{deltaLabel}</Text>
            <Text style={styles.deltaLabel}>change from start</Text>
          </View>
        </View>

        <View style={styles.metricsHeader}>
          <Text style={styles.metricsTitle}>About your bone health</Text>
          <Text style={styles.metricsSubtitle}>Tap to explore supporting habits and milestones.</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.metricScroller}
        >
          {metricCards.map(renderMetricCard)}
        </ScrollView>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.xl
  },
  scrollContainer: {
    paddingBottom: spacing.xl * 2,
    gap: spacing.lg
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  welcome: {
    ...typography.body,
    color: palette.mist,
    fontSize: 15
  },
  name: {
    ...typography.heading,
    fontSize: 30
  },
  scanButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 24,
    backgroundColor: palette.coral,
    shadowColor: palette.coral,
    shadowOpacity: 0.24,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 }
  },
  scanButtonPressed: {
    opacity: 0.85
  },
  scanButtonLabel: {
    color: palette.white,
    fontWeight: '700',
    fontSize: 16
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  sectionLabel: {
    ...typography.body,
    fontWeight: '600',
    color: palette.graphite
  },
  timeframeRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(46, 42, 58, 0.06)',
    borderRadius: 24,
    padding: 4,
    gap: 4
  },
  timeframePill: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 8,
    borderRadius: 20
  },
  timeframePillActive: {
    backgroundColor: palette.white,
    shadowColor: '#E7D4FF',
    shadowOpacity: 0.45,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 }
  },
  timeframeLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: palette.mist
  },
  timeframeLabelActive: {
    color: palette.graphite
  },
  chartCard: {
    backgroundColor: palette.white,
    padding: spacing.lg,
    borderRadius: 36,
    gap: spacing.md,
    shadowColor: '#E3D8FF',
    shadowOpacity: 0.25,
    shadowRadius: 32,
    shadowOffset: { width: 0, height: 14 }
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md
  },
  chartRange: {
    fontSize: 16,
    fontWeight: '600',
    color: palette.graphite
  },
  chartInsight: {
    ...typography.body,
    marginTop: spacing.xs / 2,
    color: palette.mist,
    lineHeight: 20
  },
  scoreBubble: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 22,
    backgroundColor: '#F9F4FF'
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: '700',
    color: palette.graphite
  },
  scoreLabel: {
    fontSize: 12,
    color: palette.mist,
    textTransform: 'uppercase',
    letterSpacing: 1.2
  },
  axisRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  axisLabel: {
    fontSize: 13,
    color: palette.mist
  },
  chartSurfaceContainer: {
    height: 180,
    borderRadius: 28,
    overflow: 'hidden'
  },
  chartSurface: {
    flex: 1
  },
  chartSurfaceOverlay: {
    flex: 1
  },
  chartSegment: {
    position: 'absolute',
    height: 3,
    borderRadius: 3,
    backgroundColor: palette.coral,
    opacity: 0.65
  },
  chartDot: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: palette.white,
    borderWidth: 2,
    borderColor: palette.coral
  },
  deltaPill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 139, 124, 0.12)'
  },
  deltaValue: {
    fontSize: 16,
    fontWeight: '700',
    color: palette.coral
  },
  deltaLabel: {
    fontSize: 13,
    color: palette.mist,
    textTransform: 'uppercase'
  },
  metricsHeader: {
    gap: spacing.xs / 2
  },
  metricsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: palette.graphite
  },
  metricsSubtitle: {
    ...typography.body,
    color: palette.mist
  },
  metricScroller: {
    paddingVertical: spacing.xs,
    gap: spacing.md
  },
  metricCard: {
    width: 220,
    padding: spacing.md,
    borderRadius: 28,
    backgroundColor: palette.white,
    borderWidth: 1,
    gap: spacing.xs,
    shadowColor: '#E7D4FF',
    shadowOpacity: 0.2,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 }
  },
  metricCardPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.92
  },
  metricTitle: {
    fontSize: 14,
    color: palette.mist,
    textTransform: 'uppercase',
    letterSpacing: 1.1
  },
  metricHeadline: {
    fontSize: 20,
    fontWeight: '700',
    color: palette.graphite
  },
  metricHelper: {
    ...typography.body,
    fontSize: 15,
    lineHeight: 20
  }
});
