import { useState, useEffect } from 'react';
import MachineCard from './components/MachineCard';
import Impressum from './components/Impressum';
import Privacy from './components/Privacy';
import type { Machine } from './types';
import './App.css';

function App() {
  const [page, setPage] = useState<'home' | 'impressum' | 'privacy'>('home');
  const [machines, setMachines] = useState<Machine[]>(() => {
    try {
      const saved = localStorage.getItem('spinhub-machines');
      if (saved) {
        const parsed = JSON.parse(saved);
        const now = Date.now();
        return parsed.map((m: Machine) => {
          // If the timer is expired, forcefully reset to available.
          if ((m.status === 'in_use' || m.status === 'available') && m.finishTime && m.finishTime <= now) {
            return { ...m, status: 'available', finishTime: undefined, bonusMinutes: 0 };
          }
          return m;
        });
      }
    } catch (e) {
      console.error('Failed to parse machines from local storage', e);
    }
    return [
      { id: 1, status: 'available' },
      { id: 2, status: 'available' },
      { id: 3, status: 'available' },
    ];
  });

  useEffect(() => {
    localStorage.setItem('spinhub-machines', JSON.stringify(machines));
  }, [machines]);

  // Sync state across tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'spinhub-machines' && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          const now = Date.now();
          setMachines(parsed.map((m: Machine) => {
            if ((m.status === 'in_use' || m.status === 'available') && m.finishTime && m.finishTime <= now) {
              return { ...m, status: 'available', finishTime: undefined, bonusMinutes: 0 };
            }
            return m;
          }));
        } catch (err) {
          console.error('Storage sync parse error', err);
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleUpdate = (id: number, updates: Partial<Machine>) => {
    setMachines(prev => prev.map(m =>
      m.id === id ? { ...m, ...updates } : m
    ));
  };

  return (
    <div className="app">

      {/* Header */}
      <header className="header">
        <div className="header-inner">
          <div onClick={() => setPage('home')} style={{ cursor: 'pointer' }} className="group">
            <h1 className="header-title group-hover:text-indigo-400 transition-colors">SpinHub</h1>
            <p className="header-subtitle">Wiesenmühlenstraße 7/9</p>
          </div>
          {page === 'home' && (
            <div className="header-legend">
              <span><span className="legend-dot" style={{ background: 'var(--color-available)' }} />Available</span>
              <span><span className="legend-dot" style={{ background: 'var(--color-in-use)' }} />In Use</span>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="main">
        {page === 'home' && (
          <div className="machine-grid">
            {machines.map(machine => (
              <MachineCard
                key={machine.id}
                machine={machine}
                onUpdate={handleUpdate}
              />
            ))}
          </div>
        )}
        {page === 'impressum' && <Impressum />}
        {page === 'privacy' && <Privacy />}
      </main>

      {/* Footer */}
      <footer className="footer max-w-4xl mx-auto border-t border-zinc-800">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-2">
          <span>© 2026 Wiesenmühlen Dormitory</span>
          <div className="flex items-center gap-4 text-zinc-400 shrink-0">
            <button
              onClick={() => setPage('home')}
              className={`hover:text-zinc-200 transition-colors ${page === 'home' ? 'text-zinc-200' : ''}`}
            >
              Home
            </button>
            <span>&middot;</span>
            <button
              onClick={() => setPage('impressum')}
              className={`hover:text-zinc-200 transition-colors ${page === 'impressum' ? 'text-zinc-200' : ''}`}
            >
              Impressum
            </button>
            <span>&middot;</span>
            <button
              onClick={() => setPage('privacy')}
              className={`hover:text-zinc-200 transition-colors ${page === 'privacy' ? 'text-zinc-200' : ''}`}
            >
              Datenschutz
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
