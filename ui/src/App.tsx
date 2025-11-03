import { Route, Routes, Navigate } from 'react-router-dom';
import { ScanPage } from './pages/ScanPage';
import { DashboardPage } from './pages/DashboardPage';
import { GuidancePage } from './pages/GuidancePage';
import { useScan } from './context/ScanContext';
import { Layout } from './components/Layout';

export default function App() {
  const { state } = useScan();
  const hasScans = state.scans.length > 0;

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/scan" replace />} />
        <Route path="/scan" element={<ScanPage />} />
        <Route
          path="/dashboard"
          element={hasScans ? <DashboardPage /> : <Navigate to="/scan" replace />}
        />
        <Route path="/guidance/:topic" element={<GuidancePage />} />
        <Route path="*" element={<Navigate to="/scan" replace />} />
      </Routes>
    </Layout>
  );
}
