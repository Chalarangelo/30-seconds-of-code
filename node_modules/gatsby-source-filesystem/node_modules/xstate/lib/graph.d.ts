import { StateNode } from './index';
import { Machine, Edge, PathMap, PathItem, PathsItem, PathsMap, AdjacencyMap } from './types';
export declare function getNodes(node: StateNode): StateNode[];
export declare function getEventEdges(node: StateNode, event: string): Edge[];
export declare function getEdges(node: StateNode, options?: {
    deep: boolean;
}): Edge[];
export declare function getAdjacencyMap(node: Machine, extendedState?: any): AdjacencyMap;
export declare function getShortestPaths(machine: Machine, extendedState?: any): PathMap;
export declare function getShortestPathsAsArray(machine: Machine, extendedState?: any): PathItem[];
export declare function getSimplePaths(machine: Machine, extendedState?: any): PathsMap;
export declare function getSimplePathsAsArray(machine: Machine, extendedState?: any): PathsItem[];
