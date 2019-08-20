/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="node" />
import { Script } from 'vm';
import { RawSourceMap } from 'source-map';
import { Config } from '@jest/types';
export declare type ShouldInstrumentOptions = Pick<Config.GlobalConfig, 'collectCoverage' | 'collectCoverageFrom' | 'collectCoverageOnlyFrom'> & {
    changedFiles: Set<Config.Path> | undefined;
};
export declare type Options = ShouldInstrumentOptions & Pick<Config.GlobalConfig, 'extraGlobals'> & {
    isCoreModule?: boolean;
    isInternalModule?: boolean;
};
declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
interface FixedRawSourceMap extends Omit<RawSourceMap, 'version'> {
    version: number;
}
export declare type TransformedSource = {
    code: string;
    map?: FixedRawSourceMap | string | null;
};
export declare type TransformResult = {
    script: Script;
    mapCoverage: boolean;
    sourceMapPath: string | null;
};
export declare type TransformOptions = {
    instrument: boolean;
};
export declare type CacheKeyOptions = {
    config: Config.ProjectConfig;
    instrument: boolean;
    rootDir: string;
};
export interface Transformer {
    canInstrument?: boolean;
    createTransformer?: (options?: any) => Transformer;
    getCacheKey: (fileData: string, filePath: Config.Path, configStr: string, options: CacheKeyOptions) => string;
    process: (sourceText: string, sourcePath: Config.Path, config: Config.ProjectConfig, options?: TransformOptions) => string | TransformedSource;
}
export {};
//# sourceMappingURL=types.d.ts.map