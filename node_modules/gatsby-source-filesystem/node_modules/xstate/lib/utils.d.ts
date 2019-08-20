import { State } from './State';
import { Event, StateValue, EventType, ActionType, Action } from './types';
export declare function getEventType(event: Event): EventType;
export declare function getActionType(action: Action): ActionType;
export declare function toStatePath(stateId: string | string[], delimiter: string): string[];
export declare function toStateValue(stateValue: State | StateValue, delimiter: string): StateValue;
export declare function pathToStateValue(statePath: string[]): StateValue;
export declare function mapValues<T, P>(collection: {
    [key: string]: T;
}, iteratee: (item: T, key: string, collection: {
    [key: string]: T;
}) => P): {
    [key: string]: P;
};
export declare function mapFilterValues<T, P>(collection: {
    [key: string]: T;
}, iteratee: (item: T, key: string, collection: {
    [key: string]: T;
}) => P, predicate: (item: T) => boolean): {
    [key: string]: P;
};
/**
 * Retrieves a value at the given path.
 * @param props The deep path to the prop of the desired value
 */
export declare const path: <T extends Record<string, any>>(props: string[]) => any;
/**
 * Retrieves a value at the given path via the nested accessor prop.
 * @param props The deep path to the prop of the desired value
 */
export declare function nestedPath<T extends Record<string, any>>(props: string[], accessorProp: keyof T): (object: T) => T;
export declare const toStatePaths: (stateValue: StateValue) => string[][];
export declare const pathsToStateValue: (paths: string[][]) => StateValue;
export declare const flatMap: <T>(array: T[][]) => T[];
