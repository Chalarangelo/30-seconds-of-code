import { Location, Action, LocationListener, UnregisterCallback } from './index';
import { getConfirmation } from './DOMUtils';

export type PromptFunction = (location: Location, action: Action) => any;

export type Prompt = PromptFunction | boolean;

export interface TransitionManager {
  setPrompt(nextPrompt?: Prompt): UnregisterCallback;
  appendListener(listener: LocationListener): UnregisterCallback;
  notifyListeners(location: Location, action: Action): void;
  confirmTransitionTo(location: Location, action: Action, getUserConfirmation: typeof getConfirmation, callback: (result: boolean) => void): void;
}

export default function createTransitionManager(): TransitionManager;
