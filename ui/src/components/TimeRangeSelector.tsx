interface TimeRangeSelectorProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export function TimeRangeSelector({ options, value, onChange }: TimeRangeSelectorProps) {
  return (
    <div className="time-range-selector">
      {options.map((option) => (
        <button
          key={option}
          className={option === value ? 'active' : ''}
          type="button"
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
