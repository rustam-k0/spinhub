import { useState } from 'react';
import MachineCard from './components/MachineCard';
import type { Machine } from './types';
import './App.css';

function App() {
  const [machines, setMachines] = useState<Machine[]>([
    { id: 1, status: 'available' },
    { id: 2, status: 'available' },
    { id: 3, status: 'available' },
  ]);

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
          <div>
            <h1 className="header-title">SpinHub</h1>
            <p className="header-subtitle">Wiesenmühlenstraße 7/9</p>
          </div>
          <div className="header-legend">
            <span><span className="legend-dot" style={{ background: 'var(--color-available)' }} />Available</span>
            <span><span className="legend-dot" style={{ background: 'var(--color-in-use)' }} />In Use</span>
          </div>
        </div>
      </header>

      {/* Machine Grid */}
      <main className="main">
        <div className="machine-grid">
          {machines.map(machine => (
            <MachineCard
              key={machine.id}
              machine={machine}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        © 2026 Wiesenmühlen Dormitory
      </footer>
    </div>
  );
}

export default App;
