import { StateValue, ActivityMap, EventObject, Action, StateInterface, HistoryValue } from './types';
export declare class State implements StateInterface {
    value: StateValue;
    historyValue?: HistoryValue | undefined;
    history?: State | undefined;
    actions: Action[];
    activities: ActivityMap;
    data: Record<string, any>;
    /**
     * Internal event queue
     */
    events: EventObject[];
    static from(stateValue: State | StateValue): State;
    static inert(stateValue: State | StateValue): State;
    constructor(value: StateValue, historyValue?: HistoryValue | undefined, history?: State | undefined, actions?: Action[], activities?: ActivityMap, data?: Record<string, any>, 
    /**
     * Internal event queue
     */
    events?: EventObject[]);
    toString(): string | undefined;
}
