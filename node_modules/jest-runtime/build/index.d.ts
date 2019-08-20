/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="yargs" />
import { Config } from '@jest/types';
import { JestEnvironment } from '@jest/environment';
import { SourceMapRegistry } from '@jest/source-map';
import HasteMap, { ModuleMap } from 'jest-haste-map';
import Resolver from 'jest-resolve';
import { ScriptTransformer, ShouldInstrumentOptions } from '@jest/transform';
import { Context as JestContext } from './types';
declare type HasteMapOptions = {
    console?: Console;
    maxWorkers: number;
    resetCache: boolean;
    watch?: boolean;
    watchman: boolean;
};
declare type InternalModuleOptions = {
    isInternalModule: boolean;
};
declare type CacheFS = {
    [path: string]: string;
};
declare namespace Runtime {
    type Context = JestContext;
}
declare class Runtime {
    static ScriptTransformer: typeof ScriptTransformer;
    private _cacheFS;
    private _config;
    private _coverageOptions;
    private _currentlyExecutingModulePath;
    private _environment;
    private _explicitShouldMock;
    private _internalModuleRegistry;
    private _isCurrentlyExecutingManualMock;
    private _mockFactories;
    private _mockMetaDataCache;
    private _mockRegistry;
    private _isolatedMockRegistry;
    private _moduleMocker;
    private _isolatedModuleRegistry;
    private _moduleRegistry;
    private _needsCoverageMapped;
    private _resolver;
    private _shouldAutoMock;
    private _shouldMockModuleCache;
    private _shouldUnmockTransitiveDependenciesCache;
    private _sourceMapRegistry;
    private _scriptTransformer;
    private _transitiveShouldMock;
    private _unmockList;
    private _virtualMocks;
    constructor(config: Config.ProjectConfig, environment: JestEnvironment, resolver: Resolver, cacheFS?: CacheFS, coverageOptions?: ShouldInstrumentOptions);
    static shouldInstrument(filename: Config.Path, options: ShouldInstrumentOptions, config: Config.ProjectConfig): boolean;
    static createContext(config: Config.ProjectConfig, options: {
        console?: Console;
        maxWorkers: number;
        watch?: boolean;
        watchman: boolean;
    }): Promise<JestContext>;
    static createHasteMap(config: Config.ProjectConfig, options?: HasteMapOptions): HasteMap;
    static createResolver(config: Config.ProjectConfig, moduleMap: ModuleMap): Resolver;
    static runCLI(args?: Config.Argv, info?: Array<string>): void;
    static getCLIOptions(): Record<"cache" | "config" | "debug" | "version" | "watchman", import("yargs").Options>;
    requireModule(from: Config.Path, moduleName?: string, options?: InternalModuleOptions, isRequireActual?: boolean | null): any;
    requireInternalModule(from: Config.Path, to?: string): any;
    requireActual(from: Config.Path, moduleName: string): any;
    requireMock(from: Config.Path, moduleName: string): any;
    private _loadModule;
    private _getFullTransformationOptions;
    requireModuleOrMock(from: Config.Path, moduleName: string): any;
    isolateModules(fn: () => void): void;
    resetModules(): void;
    getAllCoverageInfoCopy(): import("istanbul-lib-coverage").CoverageMapData;
    getSourceMapInfo(coveredFiles: Set<string>): {
        [path: string]: string;
    };
    getSourceMaps(): SourceMapRegistry;
    setMock(from: string, moduleName: string, mockFactory: () => unknown, options?: {
        virtual?: boolean;
    }): void;
    restoreAllMocks(): void;
    resetAllMocks(): void;
    clearAllMocks(): void;
    private _resolveModule;
    private _requireResolve;
    private _requireResolvePaths;
    private _execModule;
    private _requireCoreModule;
    private _generateMock;
    private _shouldMock;
    private _createRequireImplementation;
    private _createJestObjectFor;
    private _logFormattedReferenceError;
}
export = Runtime;
//# sourceMappingURL=index.d.ts.map