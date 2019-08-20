import { History, Location, LocationState } from './index';
import { getConfirmation } from './DOMUtils';

export interface MemoryHistoryBuildOptions {
  getUserConfirmation?: typeof getConfirmation;
  initialEntries?: string[];
  initialIndex?: number;
  keyLength?: number;
}

export interface MemoryHistory<HistoryLocationState = LocationState> extends History<HistoryLocationState> {
  index: number;
  entries: Location<HistoryLocationState>[];
  canGo(n: number): boolean;
}

export default function createMemoryHistory(options?: MemoryHistoryBuildOptions): MemoryHistory;
