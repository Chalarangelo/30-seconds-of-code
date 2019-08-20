/// <reference types="node" />
import { IPartialOptions } from './managers/options';
import { ITask } from './managers/tasks';
import { EntryItem } from './types/entries';
import { Pattern } from './types/patterns';
/**
 * Synchronous API.
 */
export declare function sync(source: Pattern | Pattern[], opts?: IPartialOptions): EntryItem[];
/**
 * Asynchronous API.
 */
export declare function async(source: Pattern | Pattern[], opts?: IPartialOptions): Promise<EntryItem[]>;
/**
 * Stream API.
 */
export declare function stream(source: Pattern | Pattern[], opts?: IPartialOptions): NodeJS.ReadableStream;
/**
 * Return a set of tasks based on provided patterns.
 */
export declare function generateTasks(source: Pattern | Pattern[], opts?: IPartialOptions): ITask[];
