/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Config } from '@jest/types';
export declare type ResolverConfig = {
    browser?: boolean;
    defaultPlatform?: string | null;
    extensions: Array<string>;
    hasCoreModules: boolean;
    moduleDirectories: Array<string>;
    moduleNameMapper?: Array<ModuleNameMapperConfig> | null;
    modulePaths: Array<Config.Path>;
    platforms?: Array<string>;
    resolver?: Config.Path | null;
    rootDir: Config.Path;
};
declare type ModuleNameMapperConfig = {
    regex: RegExp;
    moduleName: string;
};
export {};
//# sourceMappingURL=types.d.ts.map