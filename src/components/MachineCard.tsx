import { useState, useEffect } from 'react';
import {
  CheckCircle,
  Timer,
  Gift,
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
  free_time: 'Free Time',
  out_of_order: 'Out of Order',
};

const MachineCard: React.FC<MachineCardProps> = ({ machine, onUpdate }) => {
  const [timeLeft, setTimeLeft] = useState('');
  const [showDurationModal, setShowDurationModal] = useState(false);
  const [durationInput, setDurationInput] = useState(String(DEFAULT_DURATION));

  // Countdown timer
  useEffect(() => {
    if (machine.status === 'in_use' && machine.finishTime) {
      const tick = () => {
        const diff = machine.finishTime! - Date.now();
        if (diff <= 0) {
          onUpdate(machine.id, { status: 'free_time' });
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
      tick();
      const interval = setInterval(tick, 1000);
      return () => clearInterval(interval);
    }
  }, [machine.status, machine.finishTime, onUpdate, machine.id]);

  const handleStart = () => {
    setDurationInput(String(DEFAULT_DURATION));
    setShowDurationModal(true);
  };

  const confirmStart = () => {
    const minutes = parseInt(durationInput) || DEFAULT_DURATION;
    onUpdate(machine.id, {
      status: 'in_use',
      finishTime: Date.now() + minutes * 60000,
      durationMinutes: minutes,
    });
    setShowDurationModal(false);
  };

  const handleFinishEarly = () => onUpdate(machine.id, { status: 'free_time' });
  const handleReportBroken = () => onUpdate(machine.id, { status: 'out_of_order' });
  const handleEndCycle = () => onUpdate(machine.id, { status: 'available' });
  const handleFix = () => onUpdate(machine.id, { status: 'available' });

  const handleClaimFreeTime = () => {
    setDurationInput(String(DEFAULT_DURATION));
    setShowDurationModal(true);
  };

  const statusIcon = () => {
    const cls = `card-icon card-icon--${machine.status}`;
    switch (machine.status) {
      case 'available': return <CheckCircle className={cls} />;
      case 'in_use': return <Timer className={cls} />;
      case 'free_time': return <Gift className={cls} />;
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
          <span className="card-label">Ready to use</span>
        )}

        {machine.status === 'in_use' && (
          <>
            <span className="card-timer">{timeLeft}</span>
            <span className="card-label">remaining</span>
          </>
        )}

        {machine.status === 'free_time' && (
          <>
            <span className="card-timer" style={{ fontSize: '1.25rem' }}>Free Time!</span>
            <span className="card-label">15 min left to claim</span>
          </>
        )}

        {machine.status === 'out_of_order' && (
          <span className="card-label">Temporarily unavailable</span>
        )}
      </div>

      {/* Actions */}
      <div className="card-actions">
        {machine.status === 'available' && (
          <button className="btn btn--primary" onClick={handleStart}>Start Machine</button>
        )}

        {machine.status === 'in_use' && (
          <>
            <button className="btn btn--secondary" onClick={handleFinishEarly}>Finish Early</button>
            <button className="btn btn--danger" onClick={handleReportBroken}>Report Broken</button>
          </>
        )}

        {machine.status === 'free_time' && (
          <>
            <button className="btn btn--primary" onClick={handleClaimFreeTime}>Claim Free Time</button>
            <button className="btn btn--secondary" onClick={handleEndCycle}>End Cycle</button>
          </>
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
