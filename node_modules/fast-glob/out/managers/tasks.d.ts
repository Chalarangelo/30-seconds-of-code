import { Pattern, PatternsGroup } from '../types/patterns';
import { IOptions } from './options';
export interface ITask {
    base: string;
    dynamic: boolean;
    patterns: Pattern[];
    positive: Pattern[];
    negative: Pattern[];
}
/**
 * Generate tasks based on parent directory of each pattern.
 */
export declare function generate(patterns: Pattern[], options: IOptions): ITask[];
/**
 * Convert patterns to tasks based on parent directory of each pattern.
 */
export declare function convertPatternsToTasks(positive: Pattern[], negative: Pattern[], dynamic: boolean): ITask[];
/**
 * Return only positive patterns.
 */
export declare function getPositivePatterns(patterns: Pattern[]): Pattern[];
/**
 * Return only negative patterns.
 */
export declare function getNegativePatternsAsPositive(patterns: Pattern[], ignore: Pattern[]): Pattern[];
/**
 * Group patterns by base directory of each pattern.
 */
export declare function groupPatternsByBaseDirectory(patterns: Pattern[]): PatternsGroup;
/**
 * Convert group of patterns to tasks.
 */
export declare function convertPatternGroupsToTasks(positive: PatternsGroup, negative: Pattern[], dynamic: boolean): ITask[];
/**
 * Create a task for positive and negative patterns.
 */
export declare function convertPatternGroupToTask(base: string, positive: Pattern[], negative: Pattern[], dynamic: boolean): ITask;
