/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Config } from '@jest/types';
import { DuplicatesSet, HTypeValue, RawModuleMap, ModuleMapData, MockData } from './types';
declare type ValueType<T> = T extends Map<string, infer V> ? V : never;
export declare type SerializableModuleMap = {
    duplicates: ReadonlyArray<[string, [string, [string, [string, number]]]]>;
    map: ReadonlyArray<[string, ValueType<ModuleMapData>]>;
    mocks: ReadonlyArray<[string, ValueType<MockData>]>;
    rootDir: Config.Path;
};
export default class ModuleMap {
    static DuplicateHasteCandidatesError: typeof DuplicateHasteCandidatesError;
    private readonly _raw;
    private json;
    private static mapToArrayRecursive;
    private static mapFromArrayRecursive;
    constructor(raw: RawModuleMap);
    getModule(name: string, platform?: string | null, supportsNativePlatform?: boolean | null, type?: HTypeValue | null): Config.Path | null;
    getPackage(name: string, platform: string | null | undefined, _supportsNativePlatform: boolean | null): Config.Path | null;
    getMockModule(name: string): Config.Path | undefined;
    getRawModuleMap(): RawModuleMap;
    toJSON(): SerializableModuleMap;
    static fromJSON(serializableModuleMap: SerializableModuleMap): ModuleMap;
    /**
     * When looking up a module's data, we walk through each eligible platform for
     * the query. For each platform, we want to check if there are known
     * duplicates for that name+platform pair. The duplication logic normally
     * removes elements from the `map` object, but we want to check upfront to be
     * extra sure. If metadata exists both in the `duplicates` object and the
     * `map`, this would be a bug.
     */
    private _getModuleMetadata;
    private _assertNoDuplicates;
    static create(rootDir: Config.Path): ModuleMap;
}
declare class DuplicateHasteCandidatesError extends Error {
    hasteName: string;
    platform: string | null;
    supportsNativePlatform: boolean;
    duplicatesSet: DuplicatesSet;
    constructor(name: string, platform: string, supportsNativePlatform: boolean, duplicatesSet: DuplicatesSet);
}
export {};
//# sourceMappingURL=ModuleMap.d.ts.map