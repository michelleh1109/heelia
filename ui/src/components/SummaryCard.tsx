import { ReactNode } from 'react';

interface SummaryCardProps {
  label: string;
  value: string;
  delta?: string;
  icon?: ReactNode;
  accent?: 'peach' | 'mint' | 'lavender' | 'sky' | 'gold';
  subtext?: string;
}

export function SummaryCard({ label, value, delta, icon, accent = 'peach', subtext }: SummaryCardProps) {
  return (
    <article className={`summary-card accent-${accent}`}>
      <div className="summary-card-icon">{icon}</div>
      <div className="summary-card-content">
        <header>
          <span className="summary-label">{label}</span>
          {delta && <span className={`summary-delta ${delta.startsWith('-') ? 'down' : 'up'}`}>{delta}</span>}
        </header>
        <div className="summary-value">{value}</div>
        {subtext && <p className="summary-subtext">{subtext}</p>}
      </div>
    </article>
  );
}
