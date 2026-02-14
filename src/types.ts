export type MachineStatus = 'available' | 'in_use' | 'out_of_order';

export interface Machine {
  id: number;
  status: MachineStatus;
  finishTime?: number; // timestamp in ms
  durationMinutes?: number;
  bonusMinutes?: number;
}
