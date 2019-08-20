declare global {
    // Some users of this package are don't use "dom" libs
    interface EventTarget {}
    interface EventListener {}
    interface EventListenerObject {}
}

export const isExtraneousPopstateEvent: boolean;
export function addEventListener(node: EventTarget, event: string, listener: EventListener | EventListenerObject): void;
export function removeEventListener(node: EventTarget, event: string, listener: EventListener | EventListenerObject): void;
export function getConfirmation(message: string, callback: (result: boolean) => void): void;
export function supportsHistory(): boolean;
export function supportsGoWithoutReloadUsingHash(): boolean;
