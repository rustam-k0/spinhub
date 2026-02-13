export type MachineStatus = 'available' | 'in_use' | 'free_time' | 'out_of_order';

export interface Machine {
  id: number;
  status: MachineStatus;
  finishTime?: number; // timestamp in ms
  durationMinutes?: number;
}
