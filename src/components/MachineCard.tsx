import { useState, useEffect } from 'react';
import {
  CheckCircle,
  Timer,
  AlertTriangle,
  Clock
} from 'lucide-react';
import type { Machine, MachineStatus } from '../types';

interface MachineCardProps {
  machine: Machine;
  onUpdate: (id: number, updates: Partial<Machine>) => void;
}

const DEFAULT_DURATION = 150; // 2 hours 30 minutes

const STATUS_LABELS: Record<MachineStatus, string> = {
  available: 'Available',
  in_use: 'In Use',
  out_of_order: 'Out of Order',
};

const MachineCard: React.FC<MachineCardProps> = ({ machine, onUpdate }) => {
  const [timeLeft, setTimeLeft] = useState('');
  const [showDurationModal, setShowDurationModal] = useState(false);
  const [durationInput, setDurationInput] = useState(String(DEFAULT_DURATION));
  const [now, setNow] = useState(() => Date.now());

  // Countdown timer
  useEffect(() => {
    if ((machine.status === 'in_use' || machine.status === 'available') && machine.finishTime) {
      const tick = () => {
        const currentTime = Date.now();
        setNow(currentTime);

        const diff = machine.finishTime! - currentTime;
        if (diff <= 0) {
          // Time expired
          onUpdate(machine.id, { status: 'available', bonusMinutes: 0, finishTime: undefined });
          setTimeLeft('');
          return;
        }
        const h = Math.floor(diff / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);

        setTimeLeft(
          h > 0
            ? `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
            : `${m}:${s.toString().padStart(2, '0')}`
        );
      };
      // Run once immediately to avoid 1s delay
      tick();
      const interval = setInterval(tick, 1000);
      return () => clearInterval(interval);
    }
    // If not in use or available with a finish time, we don't need a timer
  }, [machine.status, machine.finishTime, onUpdate, machine.id]);

  const displayTimeLeft = ((machine.status === 'in_use' || machine.status === 'available') && machine.finishTime) ? timeLeft : '';

  const handleStart = () => {
    setDurationInput(String(DEFAULT_DURATION));
    setShowDurationModal(true);
  };

  const confirmStart = () => {
    let minutes = parseInt(durationInput);
    if (isNaN(minutes) || minutes <= 0) minutes = DEFAULT_DURATION;
    if (minutes > 1440) minutes = 1440; // Max 24 hours

    onUpdate(machine.id, {
      status: 'in_use',
      finishTime: Date.now() + minutes * 60000,
      durationMinutes: minutes,
      bonusMinutes: 0
    });
    setShowDurationModal(false);
  };

  const handleFinishEarly = () => {
    // Just switch to available, keeping finishTime running
    const remaining = Math.max(0, Math.ceil((machine.finishTime! - Date.now()) / 60000));
    onUpdate(machine.id, { status: 'available', bonusMinutes: remaining });
  };
  const handleReportBroken = () => onUpdate(machine.id, { status: 'out_of_order', finishTime: undefined, bonusMinutes: 0 });
  const handleFix = () => onUpdate(machine.id, { status: 'available', bonusMinutes: 0, finishTime: undefined });

  const handleUseBonus = () => {
    // Resume in_use with existing finishTime
    onUpdate(machine.id, {
      status: 'in_use',
      // finishTime unused/preserved
    });
  };

  const statusIcon = () => {
    const cls = `card-icon card-icon--${machine.status}`;
    switch (machine.status) {
      case 'available': return <CheckCircle className={cls} />;
      case 'in_use': return <Timer className={cls} />;
      case 'out_of_order': return <AlertTriangle className={cls} />;
    }
  };

  return (
    <div className={`card card--${machine.status}`}>

      {/* Header row */}
      <div className="card-header">
        <span className="card-title">WM {machine.id}</span>
        <span className={`card-status-badge badge--${machine.status}`}>
          {STATUS_LABELS[machine.status]}
        </span>
      </div>

      {/* Body */}
      <div className="card-body">
        {statusIcon()}

        {machine.status === 'available' && (
          (machine.finishTime && machine.finishTime > now) ? (
            <>
              <span className="card-timer" style={{ fontSize: '1.25rem', color: 'var(--color-free)' }}>{displayTimeLeft}</span>
              <span className="card-label">Bonus Time Available!</span>
            </>
          ) : (
            <span className="card-label">Ready to use</span>
          )
        )}

        {machine.status === 'in_use' && (
          <>
            <span className="card-timer">{displayTimeLeft}</span>
            <span className="card-label">remaining</span>
          </>
        )}


        {machine.status === 'out_of_order' && (
          <span className="card-label">Temporarily unavailable</span>
        )}
      </div>

      {/* Actions */}
      <div className="card-actions">
        {machine.status === 'available' && (
          (machine.finishTime && machine.finishTime > now) ? (
            <div className="card-actions-group">
              <button className="btn btn--primary" onClick={handleUseBonus}>Use Bonus ({displayTimeLeft})</button>
              <button className="btn btn--secondary" onClick={handleStart}>New Wash</button>
            </div>
          ) : (
            <button className="btn btn--primary" onClick={handleStart}>Start Machine</button>
          )
        )}

        {machine.status === 'in_use' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn btn--secondary" style={{ flex: 1, paddingLeft: 0, paddingRight: 0 }} onClick={handleFinishEarly}>Finish Early</button>
              <button className="btn btn--secondary" style={{ flex: 1, paddingLeft: 0, paddingRight: 0 }} onClick={() => onUpdate(machine.id, { status: 'available', finishTime: undefined, bonusMinutes: 0 })}>Cancel Wash</button>
            </div>
            <button className="btn btn--danger" onClick={handleReportBroken}>Report Broken</button>
          </div>
        )}

        {machine.status === 'out_of_order' && (
          <button className="btn btn--primary" onClick={handleFix}>Mark as Fixed</button>
        )}
      </div>

      {/* Duration Modal */}
      {showDurationModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Set Duration (min)</h3>
            <div className="modal-input-group">
              <Clock />
              <input
                type="number"
                value={durationInput}
                onChange={e => setDurationInput(e.target.value)}
                placeholder="150"
                className="modal-input"
                autoFocus
              />
            </div>
            <div className="modal-buttons">
              <button className="btn btn--secondary" onClick={() => setShowDurationModal(false)}>Cancel</button>
              <button className="btn btn--primary" onClick={confirmStart}>Start</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MachineCard;

