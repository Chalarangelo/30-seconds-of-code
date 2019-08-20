import { History } from './index';
import { getConfirmation } from './DOMUtils';

export interface BrowserHistoryBuildOptions {
  basename?: string;
  forceRefresh?: boolean;
  getUserConfirmation?: typeof getConfirmation;
  keyLength?: number;
}

export default function createBrowserHistory(options?: BrowserHistoryBuildOptions): History;
