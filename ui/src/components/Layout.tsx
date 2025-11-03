import { PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';
import { useScan } from '../context/ScanContext';

export function Layout({ children }: PropsWithChildren) {
  const { state } = useScan();
  const hasScans = state.scans.length > 0;

  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <div className="brand">Heelia Diagnostics</div>
        <nav className="nav-links">
          <NavLink to="/scan" className={({ isActive }) => (isActive ? 'active' : '')}>
            Scan
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (!hasScans ? 'disabled' : isActive ? 'active' : '')}
            aria-disabled={!hasScans}
            tabIndex={!hasScans ? -1 : 0}
          >
            Dashboard
          </NavLink>
        </nav>
      </aside>
      <main className="app-content">
        <header className="app-header">
          <h1>Bone Health Command Center</h1>
          <p className="app-subtitle">
            A calm, data-rich cockpit to help your patients stay strong and resilient.
          </p>
        </header>
        <div className="app-body">{children}</div>
      </main>
    </div>
  );
}
