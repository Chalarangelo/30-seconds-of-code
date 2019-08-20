/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="node" />
import fs from 'fs';
import { Config } from '@jest/types';
import ModuleMap from './ModuleMap';
import HasteFS from './HasteFS';
export declare type IgnoreMatcher = (item: string) => boolean;
export declare type Mapper = (item: string) => Array<string> | null;
export declare type WorkerMessage = {
    computeDependencies: boolean;
    computeSha1: boolean;
    dependencyExtractor?: string;
    rootDir: string;
    filePath: string;
    hasteImplModulePath?: string;
};
export declare type WorkerMetadata = {
    dependencies: Array<string> | undefined | null;
    id: string | undefined | null;
    module: ModuleMetaData | undefined | null;
    sha1: string | undefined | null;
};
export declare type CrawlerOptions = {
    computeSha1: boolean;
    data: InternalHasteMap;
    extensions: Array<string>;
    forceNodeFilesystemAPI: boolean;
    ignore: IgnoreMatcher;
    mapper?: Mapper | null;
    rootDir: string;
    roots: Array<string>;
};
export declare type HasteImpl = {
    getHasteName(filePath: Config.Path): string | undefined;
};
export declare type FileData = Map<Config.Path, FileMetaData>;
export declare type FileMetaData = [string, number, number, 0 | 1, string, string | null | undefined];
export declare type MockData = Map<string, Config.Path>;
export declare type ModuleMapData = Map<string, ModuleMapItem>;
export declare type WatchmanClocks = Map<Config.Path, string>;
export declare type HasteRegExp = RegExp | ((str: string) => boolean);
export declare type DuplicatesSet = Map<string, /* type */ number>;
export declare type DuplicatesIndex = Map<string, Map<string, DuplicatesSet>>;
export declare type InternalHasteMap = {
    clocks: WatchmanClocks;
    duplicates: DuplicatesIndex;
    files: FileData;
    map: ModuleMapData;
    mocks: MockData;
};
export declare type HasteMap = {
    hasteFS: HasteFS;
    moduleMap: ModuleMap;
    __hasteMapForTest?: InternalHasteMap | null;
};
export declare type RawModuleMap = {
    rootDir: Config.Path;
    duplicates: DuplicatesIndex;
    map: ModuleMapData;
    mocks: MockData;
};
declare type ModuleMapItem = {
    [platform: string]: ModuleMetaData;
};
export declare type ModuleMetaData = [Config.Path, /* type */ number];
export declare type HType = {
    ID: 0;
    MTIME: 1;
    SIZE: 2;
    VISITED: 3;
    DEPENDENCIES: 4;
    SHA1: 5;
    PATH: 0;
    TYPE: 1;
    MODULE: 0;
    PACKAGE: 1;
    GENERIC_PLATFORM: 'g';
    NATIVE_PLATFORM: 'native';
    DEPENDENCY_DELIM: '\0';
};
export declare type HTypeValue = HType[keyof HType];
export declare type EventsQueue = Array<{
    filePath: Config.Path;
    stat: fs.Stats | undefined;
    type: string;
}>;
export declare type ChangeEvent = {
    eventsQueue: EventsQueue;
    hasteFS: HasteFS;
    moduleMap: ModuleMap;
};
export {};
//# sourceMappingURL=types.d.ts.map