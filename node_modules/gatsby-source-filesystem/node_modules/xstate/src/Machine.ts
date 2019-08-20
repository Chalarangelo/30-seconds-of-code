import {
  Machine,
  StandardMachine,
  ParallelMachine,
  MachineConfig,
  ParallelMachineConfig,
  MachineOptions
} from './types';
import { StateNode } from './StateNode';

export function Machine(
  config: MachineConfig | ParallelMachineConfig,
  options?: MachineOptions
): StandardMachine | ParallelMachine {
  return new StateNode(config, options) as StandardMachine | ParallelMachine;
}
