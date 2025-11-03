import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  PropsWithChildren
} from 'react';

export type ScanMetric = {
  latest: number;
  change: number;
  unit?: string;
};

export type ScanResult = {
  id: string;
  completedAt: string;
  boneDensity: ScanMetric;
  zScore: number;
  tScore: number;
  exerciseMinutes: ScanMetric;
  nutritionScore: ScanMetric;
  supplementsScore: ScanMetric;
};

type ScanState = {
  scans: ScanResult[];
};

type Action =
  | { type: 'ADD_SCAN'; payload: ScanResult }
  | { type: 'RESET' };

const STORAGE_KEY = 'heelia-scan-history';

const ScanContext = createContext<{
  state: ScanState;
  addScan: (scan: ScanResult) => void;
  reset: () => void;
}>({
  state: { scans: [] },
  addScan: () => undefined,
  reset: () => undefined
});

function reducer(state: ScanState, action: Action): ScanState {
  switch (action.type) {
    case 'ADD_SCAN':
      return { scans: [action.payload, ...state.scans].slice(0, 50) };
    case 'RESET':
      return { scans: [] };
    default:
      return state;
  }
}

function loadInitialState(): ScanState {
  if (typeof window === 'undefined') {
    return { scans: [] };
  }
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return { scans: [] };
    const scans = JSON.parse(stored) as ScanResult[];
    return { scans };
  } catch (error) {
    console.error('Failed to load scans', error);
    return { scans: [] };
  }
}

export function ScanProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, undefined, loadInitialState);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.scans));
  }, [state.scans]);

  const addScan = useCallback((scan: ScanResult) => {
    dispatch({ type: 'ADD_SCAN', payload: scan });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const value = useMemo(() => ({ state, addScan, reset }), [state, addScan, reset]);

  return <ScanContext.Provider value={value}>{children}</ScanContext.Provider>;
}

export function useScan() {
  const context = useContext(ScanContext);
  if (!context) {
    throw new Error('useScan must be used within a ScanProvider');
  }
  return context;
}
