/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="node" />
import EventEmitter from 'events';
import { Config } from '@jest/types';
import H from './constants';
import HasteFS from './HasteFS';
import HasteModuleMap, { SerializableModuleMap as HasteSerializableModuleMap } from './ModuleMap';
import { ChangeEvent, HasteMap as InternalHasteMapObject, HasteRegExp, InternalHasteMap, Mapper } from './types';
declare type HType = typeof H;
declare type Options = {
    cacheDirectory?: string;
    computeDependencies?: boolean;
    computeSha1?: boolean;
    console?: Console;
    dependencyExtractor?: string;
    extensions: Array<string>;
    forceNodeFilesystemAPI?: boolean;
    hasteImplModulePath?: string;
    ignorePattern?: HasteRegExp;
    mapper?: Mapper;
    maxWorkers: number;
    mocksPattern?: string;
    name: string;
    platforms: Array<string>;
    providesModuleNodeModules?: Array<string>;
    resetCache?: boolean;
    retainAllFiles: boolean;
    rootDir: string;
    roots: Array<string>;
    skipPackageJson?: boolean;
    throwOnModuleCollision?: boolean;
    useWatchman?: boolean;
    watch?: boolean;
};
declare namespace HasteMap {
    type ModuleMap = HasteModuleMap;
    type SerializableModuleMap = HasteSerializableModuleMap;
    type FS = HasteFS;
    type HasteMapObject = InternalHasteMapObject;
    type HasteChangeEvent = ChangeEvent;
}
/**
 * HasteMap is a JavaScript implementation of Facebook's haste module system.
 *
 * This implementation is inspired by https://github.com/facebook/node-haste
 * and was built with for high-performance in large code repositories with
 * hundreds of thousands of files. This implementation is scalable and provides
 * predictable performance.
 *
 * Because the haste map creation and synchronization is critical to startup
 * performance and most tasks are blocked by I/O this class makes heavy use of
 * synchronous operations. It uses worker processes for parallelizing file
 * access and metadata extraction.
 *
 * The data structures created by `jest-haste-map` can be used directly from the
 * cache without further processing. The metadata objects in the `files` and
 * `map` objects contain cross-references: a metadata object from one can look
 * up the corresponding metadata object in the other map. Note that in most
 * projects, the number of files will be greater than the number of haste
 * modules one module can refer to many files based on platform extensions.
 *
 * type HasteMap = {
 *   clocks: WatchmanClocks,
 *   files: {[filepath: string]: FileMetaData},
 *   map: {[id: string]: ModuleMapItem},
 *   mocks: {[id: string]: string},
 * }
 *
 * // Watchman clocks are used for query synchronization and file system deltas.
 * type WatchmanClocks = {[filepath: string]: string};
 *
 * type FileMetaData = {
 *   id: ?string, // used to look up module metadata objects in `map`.
 *   mtime: number, // check for outdated files.
 *   size: number, // size of the file in bytes.
 *   visited: boolean, // whether the file has been parsed or not.
 *   dependencies: Array<string>, // all relative dependencies of this file.
 *   sha1: ?string, // SHA-1 of the file, if requested via options.
 * };
 *
 * // Modules can be targeted to a specific platform based on the file name.
 * // Example: platform.ios.js and Platform.android.js will both map to the same
 * // `Platform` module. The platform should be specified during resolution.
 * type ModuleMapItem = {[platform: string]: ModuleMetaData};
 *
 * //
 * type ModuleMetaData = {
 *   path: string, // the path to look up the file object in `files`.
 *   type: string, // the module type (either `package` or `module`).
 * };
 *
 * Note that the data structures described above are conceptual only. The actual
 * implementation uses arrays and constant keys for metadata storage. Instead of
 * `{id: 'flatMap', mtime: 3421, size: 42, visited: true, dependencies: []}` the real
 * representation is similar to `['flatMap', 3421, 42, 1, []]` to save storage space
 * and reduce parse and write time of a big JSON blob.
 *
 * The HasteMap is created as follows:
 *  1. read data from the cache or create an empty structure.
 *
 *  2. crawl the file system.
 *     * empty cache: crawl the entire file system.
 *     * cache available:
 *       * if watchman is available: get file system delta changes.
 *       * if watchman is unavailable: crawl the entire file system.
 *     * build metadata objects for every file. This builds the `files` part of
 *       the `HasteMap`.
 *
 *  3. parse and extract metadata from changed files.
 *     * this is done in parallel over worker processes to improve performance.
 *     * the worst case is to parse all files.
 *     * the best case is no file system access and retrieving all data from
 *       the cache.
 *     * the average case is a small number of changed files.
 *
 *  4. serialize the new `HasteMap` in a cache file.
 *     Worker processes can directly access the cache through `HasteMap.read()`.
 *
 */
declare class HasteMap extends EventEmitter {
    private _buildPromise;
    private _cachePath;
    private _changeInterval?;
    private _console;
    private _options;
    private _watchers;
    private _whitelist;
    private _worker;
    constructor(options: Options);
    static getCacheFilePath(tmpdir: Config.Path, name: string, ...extra: Array<string>): string;
    getCacheFilePath(): string;
    build(): Promise<InternalHasteMapObject>;
    /**
     * 1. read data from the cache or create an empty structure.
     */
    read(): InternalHasteMap;
    readModuleMap(): HasteModuleMap;
    /**
     * 2. crawl the file system.
     */
    private _buildFileMap;
    /**
     * 3. parse and extract metadata from changed files.
     */
    private _processFile;
    private _buildHasteMap;
    private _cleanup;
    /**
     * 4. serialize the new `HasteMap` in a cache file.
     */
    private _persist;
    /**
     * Creates workers or parses files and extracts metadata in-process.
     */
    private _getWorker;
    private _crawl;
    /**
     * Watch mode
     */
    private _watch;
    /**
     * This function should be called when the file under `filePath` is removed
     * or changed. When that happens, we want to figure out if that file was
     * part of a group of files that had the same ID. If it was, we want to
     * remove it from the group. Furthermore, if there is only one file
     * remaining in the group, then we want to restore that single file as the
     * correct resolution for its ID, and cleanup the duplicates index.
     */
    private _recoverDuplicates;
    end(): Promise<void>;
    /**
     * Helpers
     */
    private _ignore;
    private _isNodeModulesDir;
    private _createEmptyMap;
    static H: HType;
    static DuplicateError: typeof DuplicateError;
    static ModuleMap: typeof HasteModuleMap;
}
declare class DuplicateError extends Error {
    mockPath1: string;
    mockPath2: string;
    constructor(mockPath1: string, mockPath2: string);
}
export = HasteMap;
//# sourceMappingURL=index.d.ts.map