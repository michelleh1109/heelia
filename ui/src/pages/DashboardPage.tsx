import { useMemo } from 'react';
import { useScan } from '../context/ScanContext';
import { formatDistanceToNow } from 'date-fns';
import { SummaryCard } from '../components/SummaryCard';
import { MetricChart } from '../components/MetricChart';
import { ActionableInterventions, Intervention } from '../components/ActionableInterventions';

const icons = {
  density: '🦴',
  change: '📈',
  exercise: '🏃‍♀️',
  nutrition: '🥗',
  supplements: '💊'
};

export function DashboardPage() {
  const { state } = useScan();
  const latest = state.scans[0];

  const interventions = useMemo<Intervention[]>(() => {
    if (!latest) return [];
    const actions: Intervention[] = [
      {
        id: 'exercise',
        title: 'Power + balance circuit',
        description: 'Alternate kettlebell swings, step-downs, and single-leg reaches 3x/week.',
        focus: 'exercise',
        badge: latest.exerciseMinutes.change >= 0 ? '+ Consistent' : 'Needs attention'
      },
      {
        id: 'nutrition',
        title: 'Calcium-forward plate',
        description: 'Layer leafy greens, sesame, and fortified yogurt to hit 1200mg daily.',
        focus: 'nutrition',
        badge: latest.nutritionScore.latest > 80 ? 'On track' : 'Boost intake'
      },
      {
        id: 'supplements',
        title: 'D3 + K2 pairing',
        description: 'Pair 2000 IU vitamin D3 with 100mcg K2 to enhance calcium utilization.',
        focus: 'supplements',
        badge: latest.supplementsScore.latest > 75 ? 'Maintaining' : 'Reassess'
      }
    ];
    return actions;
  }, [latest]);

  if (!latest) {
    return null;
  }

  return (
    <div className="dashboard-grid">
      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>Latest scan</h2>
            <p>
              Updated {formatDistanceToNow(new Date(latest.completedAt), { addSuffix: true })}. Use
              the insights below to stay ahead of decline.
            </p>
          </div>
        </div>
        <div className="summary-grid">
          <SummaryCard
            label="Bone density"
            value={`${latest.boneDensity.latest.toFixed(3)} ${latest.boneDensity.unit}`}
            delta={`${latest.boneDensity.change >= 0 ? '+' : ''}${latest.boneDensity.change.toFixed(3)}`}
            icon={icons.density}
            accent="peach"
            subtext="Lumbar spine (L1-L4)"
          />
          <SummaryCard
            label="Overall change"
            value={`${latest.boneDensity.change >= 0 ? '+' : ''}${(latest.boneDensity.change * 100).toFixed(1)}%`}
            delta={latest.boneDensity.change >= 0 ? '↑ Stable' : '↓ Monitor'}
            icon={icons.change}
            accent="lavender"
            subtext="vs previous scan"
          />
          <SummaryCard
            label="Weekly exercise"
            value={`${latest.exerciseMinutes.latest} min`}
            delta={`${latest.exerciseMinutes.change >= 0 ? '+' : ''}${latest.exerciseMinutes.change.toFixed(1)} min`}
            icon={icons.exercise}
            accent="sky"
            subtext="Weighted impact + mobility"
          />
          <SummaryCard
            label="Nutrition quality"
            value={`${latest.nutritionScore.latest}/100`}
            delta={`${latest.nutritionScore.change >= 0 ? '+' : ''}${latest.nutritionScore.change.toFixed(1)} pts`}
            icon={icons.nutrition}
            accent="mint"
            subtext="Calcium, protein, micronutrients"
          />
          <SummaryCard
            label="Supplement adherence"
            value={`${latest.supplementsScore.latest}/100`}
            delta={`${latest.supplementsScore.change >= 0 ? '+' : ''}${latest.supplementsScore.change.toFixed(1)} pts`}
            icon={icons.supplements}
            accent="gold"
            subtext="Vitamin D3, K2, Omega-3"
          />
        </div>
      </section>

      <MetricChart scans={state.scans} />

      <ActionableInterventions interventions={interventions} />
    </div>
  );
}
