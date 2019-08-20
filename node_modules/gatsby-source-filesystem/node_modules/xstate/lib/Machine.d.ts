import { StandardMachine, ParallelMachine, MachineConfig, ParallelMachineConfig, MachineOptions } from './types';
export declare function Machine(config: MachineConfig | ParallelMachineConfig, options?: MachineOptions): StandardMachine | ParallelMachine;
