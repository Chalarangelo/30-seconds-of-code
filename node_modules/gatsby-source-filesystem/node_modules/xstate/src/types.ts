import { StateNode } from './StateNode';
import { State } from './State';

export type EventType = string | number;
export type ActionType = string | number;

export interface EventObject {
  type: EventType;
  [key: string]: any;
}
export interface ActionObject {
  type: EventType;
  [key: string]: any;
}

export type Event = EventType | EventObject;
export type InternalEvent = EventType | EventObject;
export type ActionFunction = ((state: any, event: EventObject) => any | void);
export type Action = ActionType | ActionObject | ActionFunction;
export type StateKey = string | State;

export interface StateValueMap {
  [key: string]: StateValue;
}

export type StateValue = string | StateValueMap;

export interface HistoryValue {
  states: Record<string, HistoryValue | undefined>;
  current: StateValue | undefined;
}

export type ConditionPredicate = (
  extendedState: any,
  event: EventObject,
  microstepState: StateValue
) => boolean;

export type Condition = string | ConditionPredicate;

export interface TransitionConfig {
  cond?: Condition;
  actions?: Action[];
  in?: StateValue;
  internal?: boolean;
}

export interface TargetTransitionConfig extends TransitionConfig {
  target: string | string[];
}

export type ConditionalTransitionConfig = TargetTransitionConfig[];

export type Transition =
  | string
  | Record<string, TransitionConfig>
  | ConditionalTransitionConfig;

export type Activity = string | ActionObject;

export interface StateNodeConfig {
  key?: string;
  initial?: string | undefined;
  parallel?: boolean | undefined;
  /**
   * Indicates whether the state node is a history state node, and what
   * type of history:
   * shallow, deep, true (shallow), false (none), undefined (none)
   */
  history?: 'shallow' | 'deep' | boolean | undefined;
  states?: Record<string, SimpleOrCompoundStateNodeConfig> | undefined;
  on?: Record<string, Transition | undefined>;
  onEntry?: Action | Action[];
  onExit?: Action | Action[];
  activities?: Activity[];
  parent?: StateNode;
  strict?: boolean | undefined;
  data?: object | undefined;
  id?: string | undefined;
  delimiter?: string;
}
export interface SimpleStateNodeConfig extends StateNodeConfig {
  initial?: undefined;
  parallel?: false | undefined;
  states?: undefined;
}

export interface HistoryStateNodeConfig extends SimpleStateNodeConfig {
  history: 'shallow' | 'deep' | true;
  target: StateValue | undefined;
}

export interface CompoundStateNodeConfig extends StateNodeConfig {
  initial?: string;
  parallel?: boolean;
  states: Record<string, SimpleOrCompoundStateNodeConfig>;
  history?: false | undefined;
}

export type SimpleOrCompoundStateNodeConfig =
  | CompoundStateNodeConfig
  | SimpleStateNodeConfig;

export interface MachineOptions {
  guards: Record<string, ConditionPredicate>;
}
export interface MachineConfig extends CompoundStateNodeConfig {
  key?: string;
  strict?: boolean;
  history?: false | undefined;
}
export interface StandardMachineConfig extends MachineConfig {
  initial: string;
  parallel?: false | undefined;
}

export interface ParallelMachineConfig extends MachineConfig {
  initial?: undefined;
  parallel: true;
}

export interface EntryExitEffectMap {
  entry: Action[];
  exit: Action[];
}

export interface StateNode {
  key: string;
  id: string;
  initial: string | undefined;
  parallel: boolean;
  transient: boolean;
  history: false | 'shallow' | 'deep';
  states: Record<string, StateNode>;
  on?: Record<string, Transition>;
  onEntry?: Action | Action[];
  onExit?: Action | Action[];
  parent: StateNode | undefined;
  machine: Machine;
}

export interface ComplexStateNode extends StateNode {
  initial: string;
  history: false;
}

export interface LeafStateNode extends StateNode {
  initial: never;
  parallel: never;
  states: never;
  parent: StateNode;
}

export interface HistoryStateNode extends StateNode {
  history: 'shallow' | 'deep';
  target: StateValue | undefined;
}

export interface Machine extends StateNode {
  id: string;
  initial: string | undefined;
  parallel: boolean;
  states: Record<string, StateNode>;
  onEntry: never;
  onExit: never;
}

export interface StandardMachine extends Machine {
  initial: string;
  parallel: false;
}

export interface ParallelMachine extends Machine {
  initial: undefined;
  parallel: true;
}
export interface ActionMap {
  onEntry: Action[];
  actions: Action[];
  onExit: Action[];
}

export interface EntryExitStates {
  entry: Set<StateNode>;
  exit: Set<StateNode>;
}

export interface ActivityMap {
  [activityKey: string]: boolean;
}
export type MaybeStateValueActionsTuple = [
  StateValue | undefined,
  ActionMap,
  ActivityMap | undefined
];

// tslint:disable-next-line:class-name
export interface StateTransition {
  value: StateValue | undefined;
  entryExitStates: EntryExitStates | undefined;
  actions: Action[];
  paths: string[][];
}

export interface TransitionData {
  value: StateValue | undefined;
  actions: ActionMap;
  activities?: ActivityMap;
}

export interface ActivityAction extends ActionObject {
  activity: ActionType;
  data: {
    type: ActionType;
    [key: string]: any;
  };
  command?: ActionFunction;
}

export interface SendAction extends ActionObject {
  event: EventObject;
  delay?: number;
  id: string | number;
}
export interface SendActionOptions {
  delay?: number;
  id?: string | number;
}

export interface CancelAction extends ActionObject {
  sendId: string | number;
}

export interface Edge {
  event: string;
  source: StateNode;
  target: StateNode;
  cond?: Condition;
  actions: Action[];
}
export interface NodesAndEdges {
  nodes: StateNode[];
  edges: Edge[];
}

export interface Segment {
  state: StateValue;
  event: Event;
}

export interface PathMap {
  [key: string]: Segment[];
}

export interface PathItem {
  state: StateValue;
  path: Segment[];
}

export interface PathsItem {
  state: StateValue;
  paths: Segment[][];
}

export interface PathsMap {
  [key: string]: Segment[][];
}

export interface TransitionMap {
  state: StateValue | undefined;
}

export interface AdjacencyMap {
  [stateId: string]: Record<string, TransitionMap>;
}

export interface StateInterface {
  value: StateValue;
  history?: State;
  actions: Action[];
  activities: ActivityMap;
  data: Record<string, any>;
  events: EventObject[];
}
