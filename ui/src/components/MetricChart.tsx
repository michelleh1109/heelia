import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import { TimeRangeSelector } from './TimeRangeSelector';
import { useMemo, useState } from 'react';
import { ScanResult } from '../context/ScanContext';
import { format } from 'date-fns';
import { PopulationComparison } from './PopulationComparison';

type TimeRangeOption = 'W' | 'M' | '6M' | 'Y';

interface MetricChartProps {
  scans: ScanResult[];
}

const RANGE_TO_DAYS: Record<TimeRangeOption, number> = {
  W: 7,
  M: 31,
  '6M': 183,
  Y: 365
};

export function MetricChart({ scans }: MetricChartProps) {
  const [range, setRange] = useState<TimeRangeOption>('M');

  const filtered = useMemo(() => {
    if (!scans.length) return [];
    const now = new Date();
    const cutoff = new Date(now.getTime() - RANGE_TO_DAYS[range] * 24 * 60 * 60 * 1000);
    return [...scans]
      .reverse()
      .filter((scan) => new Date(scan.completedAt) >= cutoff)
      .map((scan) => ({
        date: format(new Date(scan.completedAt), 'MMM d'),
        zScore: scan.zScore,
        tScore: scan.tScore
      }));
  }, [scans, range]);

  const percentile = useMemo(() => {
    if (!scans.length) return 50;
    const latest = scans[0];
    const averageScore = (latest.zScore + latest.tScore) / 2;
    return Math.min(95, Math.max(5, Math.round(50 + averageScore * 15)));
  }, [scans]);

  return (
    <section className="panel chart-panel">
      <div className="panel-heading">
        <div>
          <h2>Z/T-score progression</h2>
          <p>Track longitudinal changes and benchmark against similar populations.</p>
        </div>
        <TimeRangeSelector options={['W', 'M', '6M', 'Y']} value={range} onChange={(value) => setRange(value as TimeRangeOption)} />
      </div>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={filtered} margin={{ left: -10, right: 10, top: 20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8ECF4" />
            <XAxis dataKey="date" stroke="#A1AEC6" tickLine={false} axisLine={false} />
            <YAxis
              stroke="#A1AEC6"
              tickLine={false}
              axisLine={false}
              domain={[-2.5, 2.5]}
              ticks={[-2, -1, 0, 1, 2]}
            />
            <Tooltip
              contentStyle={{
                background: 'var(--surface-elevated)',
                borderRadius: '16px',
                border: 'none',
                boxShadow: '0 12px 24px rgba(15, 23, 42, 0.18)',
                color: 'var(--text-primary)'
              }}
            />
            <Line
              type="monotone"
              dataKey="zScore"
              stroke="var(--accent-sky)"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="tScore"
              stroke="var(--accent-lavender)"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <PopulationComparison percentile={percentile} />
    </section>
  );
}
