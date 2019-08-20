// Type definitions for history 4.7.2
// Project: https://github.com/mjackson/history
// Definitions by: Sergey Buturlakin <https://github.com/sergey-buturlakin>, Nathan Brown <https://github.com/ngbrown>, Young Rok Kim <https://github.com/rokoroku>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3
export as namespace History;

export type Action = 'PUSH' | 'POP' | 'REPLACE';
export type UnregisterCallback = () => void;

export interface History<HistoryLocationState = LocationState> {
    length: number;
    action: Action;
    location: Location<HistoryLocationState>;
    push(path: Path, state?: HistoryLocationState): void;
    push(location: LocationDescriptorObject<HistoryLocationState>): void;
    replace(path: Path, state?: HistoryLocationState): void;
    replace(location: LocationDescriptorObject<HistoryLocationState>): void;
    go(n: number): void;
    goBack(): void;
    goForward(): void;
    block(prompt?: boolean | string | TransitionPromptHook): UnregisterCallback;
    listen(listener: LocationListener): UnregisterCallback;
    createHref(location: LocationDescriptorObject<HistoryLocationState>): Href;
}

export interface Location<S = LocationState> {
    pathname: Pathname;
    search: Search;
    state: S;
    hash: Hash;
    key?: LocationKey;
}

export interface LocationDescriptorObject<S = LocationState> {
    pathname?: Pathname;
    search?: Search;
    state?: S;
    hash?: Hash;
    key?: LocationKey;
}

export namespace History {
    export type LocationDescriptor<S = LocationState> = Path | LocationDescriptorObject<S>;
    export type LocationKey = string;
    export type LocationListener = (location: Location, action: Action) => void;
    export type LocationState = any;
    export type Path = string;
    export type Pathname = string;
    export type Search = string;
    export type TransitionHook = (location: Location, callback: (result: any) => void) => any;
    export type TransitionPromptHook = (location: Location, action: Action) => string | false | void;
    export type Hash = string;
    export type Href = string;
}

export type LocationDescriptor<S = LocationState> = History.LocationDescriptor<S>;
export type LocationKey = History.LocationKey;
export type LocationListener = History.LocationListener;
export type LocationState = History.LocationState;
export type Path = History.Path;
export type Pathname = History.Pathname;
export type Search = History.Search;
export type TransitionHook = History.TransitionHook;
export type TransitionPromptHook = History.TransitionPromptHook;
export type Hash = History.Hash;
export type Href = History.Href;

import { default as createBrowserHistory } from "./createBrowserHistory";
import { default as createHashHistory } from "./createHashHistory";
import { default as createMemoryHistory } from "./createMemoryHistory";
import { createLocation, locationsAreEqual } from "./LocationUtils";
import { parsePath, createPath } from "./PathUtils";

// Global usage, without modules, needs the small trick, because lib.d.ts
// already has `history` and `History` global definitions:
// var createHistory = ((window as any).History as HistoryModule.Module).createHistory;
export interface Module {
    createBrowserHistory: typeof createBrowserHistory;
    createHashHistory: typeof createHashHistory;
    createMemoryHistory: typeof createMemoryHistory;
    createLocation: typeof createLocation;
    locationsAreEqual: typeof locationsAreEqual;
    parsePath: typeof parsePath;
    createPath: typeof createPath;
}

export * from "./createBrowserHistory";
export * from "./createHashHistory";
export * from "./createMemoryHistory";
export { createLocation, locationsAreEqual } from "./LocationUtils";
export { parsePath, createPath } from "./PathUtils";
export { createBrowserHistory, createHashHistory, createMemoryHistory };
