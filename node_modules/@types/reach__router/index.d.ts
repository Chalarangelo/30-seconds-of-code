// Type definitions for @reach/router 1.2
// Project: https://github.com/reach/router
// Definitions by: Kingdaro <https://github.com/kingdaro>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.8

import * as React from "react";
import { Location as HLocation } from "history";
export type WindowLocation = Window["location"] & HLocation;

export type HistoryActionType = "PUSH" | "POP";
export type HistoryLocation = WindowLocation & { state?: any };
export interface HistoryListenerParameter {
	location: HistoryLocation;
	action: HistoryActionType;
}
export type HistoryListener = (parameter: HistoryListenerParameter) => void;
export type HistoryUnsubscribe = () => void;

export interface History {
    readonly location: HistoryLocation;
    readonly transitioning: boolean;
    listen: (listener: HistoryListener) => HistoryUnsubscribe;
    navigate: NavigateFn;
}

export class Router extends React.Component<
  RouterProps & React.HTMLProps<HTMLDivElement>
> {}

export interface RouterProps {
    basepath?: string;
    primary?: boolean;
    location?: WindowLocation;
    component?: React.ComponentType | string;
}

export type RouteComponentProps<TParams = {}> = Partial<TParams> & {
    path?: string;
    default?: boolean;
    location?: WindowLocation;
    navigate?: NavigateFn;
    uri?: string;
};

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

export type AnchorProps = Omit<
    React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
    >,
    "href" // remove href, as it's ignored by the router
    >;

export interface LinkProps<TState> extends AnchorProps {
    to?: string;
    replace?: boolean;
    getProps?: (props: LinkGetProps) => {};
    state?: TState;
}

export interface LinkGetProps {
    isCurrent: boolean;
    isPartiallyCurrent: boolean;
    href: string;
    location: WindowLocation;
}

export class Link<TState> extends React.Component<LinkProps<TState>> { }

export interface RedirectProps<TState> {
    from?: string;
    to: string;
    noThrow?: boolean;
    state?: TState;
    replace?: boolean;
}

export class Redirect<TState> extends React.Component<RouteComponentProps<RedirectProps<TState>>> { }

export interface MatchProps<TParams> {
    path: string;
    children: MatchRenderFn<TParams>;
}

export type MatchRenderFn<TParams> = (
    props: MatchRenderProps<TParams>
) => React.ReactNode;

export interface MatchRenderProps<TParams> {
    match: null | { uri: string; path: string } & TParams;
    location: WindowLocation;
    navigate: NavigateFn;
}

export class Match<TParams> extends React.Component<MatchProps<TParams>> { }

export type NavigateFn = (to: string, options?: NavigateOptions<{}>) => void;

export interface NavigateOptions<TState> {
    state?: TState;
    replace?: boolean;
}

export interface LocationProps {
    children: LocationProviderRenderFn;
}

export class Location extends React.Component<LocationProps> { }

export interface LocationProviderProps {
    history?: History;
    children?: React.ReactNode | LocationProviderRenderFn;
}

export type LocationProviderRenderFn = (
    context: LocationContext
) => React.ReactNode;

export interface LocationContext {
    location: WindowLocation;
    navigate: NavigateFn;
}

export class LocationProvider extends React.Component<LocationProviderProps> { }

export interface ServerLocationProps {
    url: string;
}

export class ServerLocation extends React.Component<ServerLocationProps> { }

export const navigate: NavigateFn;

export interface HistorySource {
    readonly location: WindowLocation;
    addEventListener(name: string, listener: (event: Event) => void): void;
    removeEventListener(name: string, listener: (event: Event) => void): void;
    history: {
        readonly state: any;
        pushState(state: any, title: string, uri: string): void;
        replaceState(state: any, title: string, uri: string): void;
    };
}

export function createHistory(source: HistorySource): History;

export function createMemorySource(initialPath: string): HistorySource;

export interface RedirectRequest {
    uri: string;
}

export function isRedirect(error: any): error is RedirectRequest;

export function redirectTo(uri: string): void;

export const globalHistory: History;
