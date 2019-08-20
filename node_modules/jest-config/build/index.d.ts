/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Config } from '@jest/types';
export { getTestEnvironment, isJSONString } from './utils';
export { default as normalize } from './normalize';
export { default as deprecationEntries } from './Deprecated';
export { replaceRootDirInPath } from './utils';
export { default as defaults } from './Defaults';
export { default as descriptions } from './Descriptions';
declare type ReadConfig = {
    configPath: Config.Path | null | undefined;
    globalConfig: Config.GlobalConfig;
    hasDeprecationWarnings: boolean;
    projectConfig: Config.ProjectConfig;
};
export declare function readConfig(argv: Config.Argv, packageRootOrConfig: Config.Path | Config.InitialOptions, skipArgvConfigOption?: boolean, parentConfigPath?: Config.Path | null, projectIndex?: number): ReadConfig;
export declare function readConfigs(argv: Config.Argv, projectPaths: Array<Config.Path>): {
    globalConfig: Config.GlobalConfig;
    configs: Array<Config.ProjectConfig>;
    hasDeprecationWarnings: boolean;
};
//# sourceMappingURL=index.d.ts.map