import { useNavigate } from 'react-router-dom';
import { useScan } from '../context/ScanContext';
import { useState } from 'react';
import { format } from 'date-fns';

const boneDensityBaseline = 0.9;

export function ScanPage() {
  const { addScan } = useScan();
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [status, setStatus] = useState<'idle' | 'scanning' | 'complete'>('idle');

  const handleScan = async () => {
    setIsScanning(true);
    setStatus('scanning');
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const change = (Math.random() * 0.04 - 0.02).toFixed(3);
    const latestDensity = boneDensityBaseline + Number(change);

    const now = new Date();
    const scan = {
      id: crypto.randomUUID(),
      completedAt: now.toISOString(),
      boneDensity: {
        latest: Number(latestDensity.toFixed(3)),
        change: Number(change),
        unit: 'g/cm²'
      },
      zScore: Number((-0.5 + Math.random()).toFixed(2)),
      tScore: Number((-1 + Math.random() * 1.5).toFixed(2)),
      exerciseMinutes: {
        latest: 45 + Math.round(Math.random() * 30),
        change: Number((Math.random() * 10 - 5).toFixed(1)),
        unit: 'min'
      },
      nutritionScore: {
        latest: Number((70 + Math.random() * 25).toFixed(0)),
        change: Number((Math.random() * 12 - 6).toFixed(1)),
        unit: 'pts'
      },
      supplementsScore: {
        latest: Number((60 + Math.random() * 30).toFixed(0)),
        change: Number((Math.random() * 14 - 7).toFixed(1)),
        unit: 'pts'
      }
    };

    addScan(scan);
    setStatus('complete');
    setTimeout(() => {
      navigate('/dashboard');
    }, 500);
  };

  return (
    <section className="panel">
      <div className="panel-heading">
        <h2>Start a new scan</h2>
        <p>
          Capture the latest bone mineral density insights. Once finished, the personalized
          dashboard unlocks with refreshed interventions.
        </p>
      </div>
      <div className="scan-card">
        <div className="scan-status">
          <span className={`status-dot status-${status}`}></span>
          <span className="status-label">
            {status === 'idle' && 'Ready for next scan'}
            {status === 'scanning' && 'Calibrating sensors and collecting data…'}
            {status === 'complete' && 'Scan complete! Redirecting to dashboard.'}
          </span>
        </div>
        <p className="scan-timestamp">{format(new Date(), 'eeee, MMM d • p')}</p>
        <button className="primary" onClick={handleScan} disabled={isScanning}>
          {isScanning ? 'Processing…' : 'Run Full Body Scan'}
        </button>
      </div>
    </section>
  );
}
