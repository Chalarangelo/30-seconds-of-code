/// <reference types="node" />
import * as fs from 'fs';
import { FileSystemAdapter } from './adapters/fs';
import { Options } from './managers/options';
import { AsyncCallback } from './providers/stat';
/**
 * Asynchronous API.
 */
export declare function stat(path: fs.PathLike, opts?: Options): Promise<fs.Stats>;
/**
 * Callback API.
 */
export declare function statCallback(path: fs.PathLike, callback: AsyncCallback): void;
export declare function statCallback(path: fs.PathLike, opts: Options, callback: AsyncCallback): void;
/**
 * Synchronous API.
 */
export declare function statSync(path: fs.PathLike, opts?: Options): fs.Stats;
export declare type Options = Options;
export declare type StatAsyncCallback = AsyncCallback;
export declare type FileSystemAdapter = FileSystemAdapter;
//# sourceMappingURL=index.d.ts.map