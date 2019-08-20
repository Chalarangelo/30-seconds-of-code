import { Action, Event, EventObject, ActivityAction, SendAction, SendActionOptions, CancelAction, ActionObject } from './types';
export declare const actionTypes: {
    start: string;
    stop: string;
    raise: string;
    send: string;
    cancel: string;
    null: string;
};
export declare const toEventObject: (event: Event) => EventObject;
export declare const toActionObject: (action: Action) => ActionObject;
export declare const toActionObjects: (action: string | number | ActionObject | ((state: any, event: EventObject) => any) | Action[] | undefined) => ActionObject[];
export declare const raise: (eventType: string | number) => EventObject;
export declare const send: (event: Event, options?: SendActionOptions | undefined) => SendAction;
export declare const cancel: (sendId: string | number) => CancelAction;
export declare const start: (activity: string | number | ActionObject) => ActivityAction;
export declare const stop: (activity: string | number | ActionObject) => ActivityAction;
