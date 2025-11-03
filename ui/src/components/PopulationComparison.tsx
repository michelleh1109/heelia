interface PopulationComparisonProps {
  percentile: number;
}

export function PopulationComparison({ percentile }: PopulationComparisonProps) {
  const status = percentile >= 60 ? 'above' : percentile >= 40 ? 'aligned' : 'below';
  const label =
    status === 'above'
      ? 'Above peer cohort'
      : status === 'aligned'
      ? 'Aligned with peers'
      : 'Below peer cohort';

  return (
    <div className={`population-indicator ${status}`}>
      <div className="indicator-bar">
        <div className="indicator-fill" style={{ width: `${Math.max(6, percentile)}%` }}></div>
      </div>
      <div className="indicator-label">
        <strong>{percentile}th percentile</strong>
        <span>{label}</span>
      </div>
    </div>
  );
}
