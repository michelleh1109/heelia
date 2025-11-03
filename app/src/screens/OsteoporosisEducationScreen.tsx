import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ScreenContainer } from '../components/ScreenContainer';
import { gradients, palette, spacing, typography } from '../theme';

interface OsteoporosisEducationScreenProps {
  onClose: () => void;
}

const dailyFocus = [
  {
    title: 'Daily Movement Focus',
    bullets: [
      'Continue 35 minutes of weight-bearing exercise most days of the week.',
      'Add 2 short balance drills after dinner to reinforce fall prevention.'
    ]
  },
  {
    title: 'Nutrition Anchors',
    bullets: [
      'Pair 1,200 mg calcium with 1,000 IU vitamin D for optimal absorption.',
      'Evening snack: yogurt with chia to add magnesium and protein.'
    ]
  }
];

const riskSignals = [
  'New back pain, loss of height, or posture changes.',
  'Medication side effects such as dizziness or digestive discomfort.',
  'Missing strength or balance sessions for more than one week.'
];

const specialistTouchpoints = [
  'Share your trend report and any new symptoms with your primary care physician.',
  'Ask about bone-building medications if scores plateau for 2 consecutive scans.',
  'Schedule the next DEXA scan for November 2026 (18 months since the last study).'
];

export const OsteoporosisEducationScreen: React.FC<OsteoporosisEducationScreenProps> = ({ onClose }) => {
  return (
    <ScreenContainer style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Pressable onPress={onClose} style={({ pressed }) => [styles.closeLink, pressed && styles.closeLinkPressed]}>
          <Text style={styles.closeLabel}>← Back to dashboard</Text>
        </Pressable>

        <View style={styles.headerBlock}>
          <Text style={styles.title}>Michelle&apos;s osteoporosis guide</Text>
          <Text style={styles.subtitle}>
            Your scans show improving osteopenia. These next steps keep your bones responsive and protect against falls.
          </Text>
        </View>

        <LinearGradient colors={gradients.highlight} style={styles.highlightCard}>
          <View style={styles.highlightBadge}>
            <Text style={styles.highlightBadgeLabel}>Today&apos;s priorities</Text>
          </View>
          <Text style={styles.highlightTitle}>1. Stay consistent with your strength trio</Text>
          <Text style={styles.highlightBody}>
            Alternate lower-body strength, balance intervals, and brisk walking. This rotation has lifted your Z-score by
            0.49 in 6 months.
          </Text>
          <Text style={styles.highlightTitle}>2. Fuel bone remodeling</Text>
          <Text style={styles.highlightBody}>
            Keep spacing calcium twice daily and include 20–25 g of protein at each meal to maximize repair overnight.
          </Text>
        </LinearGradient>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily focus</Text>
          <Text style={styles.sectionIntro}>
            Layer these micro-habits into your routine to keep gains compounding between scans.
          </Text>
          {dailyFocus.map((item) => (
            <View key={item.title} style={styles.card}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              {item.bullets.map((bullet) => (
                <View key={bullet} style={styles.bulletRow}>
                  <View style={styles.bulletDot} />
                  <Text style={styles.cardBody}>{bullet}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Watch for these signals</Text>
          <Text style={styles.sectionIntro}>
            Reach out sooner if any of the following appear—early adjustments prevent setbacks.
          </Text>
          <View style={styles.card}>
            {riskSignals.map((signal) => (
              <View key={signal} style={styles.bulletRow}>
                <View style={[styles.bulletDot, styles.alertDot]} />
                <Text style={styles.cardBody}>{signal}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Coordinate with your care team</Text>
          <Text style={styles.sectionIntro}>
            Bring these talking points to your next visit so everyone sees the full picture of your progress.
          </Text>
          <View style={styles.card}>
            {specialistTouchpoints.map((touchpoint) => (
              <View key={touchpoint} style={styles.bulletRow}>
                <View style={[styles.bulletDot, styles.teamDot]} />
                <Text style={styles.cardBody}>{touchpoint}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.xl
  },
  scroll: {
    paddingBottom: spacing.xl * 2,
    gap: spacing.lg
  },
  closeLink: {
    alignSelf: 'flex-start'
  },
  closeLinkPressed: {
    opacity: 0.7
  },
  closeLabel: {
    ...typography.body,
    fontSize: 16,
    fontWeight: '600',
    color: palette.coral
  },
  headerBlock: {
    gap: spacing.sm
  },
  title: {
    ...typography.heading,
    fontSize: 30
  },
  subtitle: {
    ...typography.body,
    fontSize: 16,
    lineHeight: 22,
    color: palette.mist
  },
  highlightCard: {
    borderRadius: 36,
    padding: spacing.lg,
    gap: spacing.sm,
    shadowColor: '#F5D7E4',
    shadowOpacity: 0.35,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 14 }
  },
  highlightBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 1.5,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.75)'
  },
  highlightBadgeLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: palette.graphite,
    textTransform: 'uppercase',
    letterSpacing: 1.2
  },
  highlightTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: palette.graphite
  },
  highlightBody: {
    ...typography.body,
    fontSize: 16,
    lineHeight: 22
  },
  section: {
    gap: spacing.sm
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: palette.graphite
  },
  sectionIntro: {
    ...typography.body,
    color: palette.mist,
    lineHeight: 20
  },
  card: {
    backgroundColor: palette.white,
    borderRadius: 32,
    padding: spacing.md,
    gap: spacing.sm,
    shadowColor: '#E7D4FF',
    shadowOpacity: 0.22,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 12 }
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: palette.graphite
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    paddingRight: spacing.sm
  },
  bulletDot: {
    marginTop: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: palette.coral
  },
  cardBody: {
    ...typography.body,
    flex: 1,
    lineHeight: 22
  },
  alertDot: {
    backgroundColor: '#F56A8A'
  },
  teamDot: {
    backgroundColor: '#4CB4A6'
  }
});
