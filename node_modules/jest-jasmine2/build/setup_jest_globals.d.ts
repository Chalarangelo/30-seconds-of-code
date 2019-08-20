/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Config } from '@jest/types';
import { Plugin } from 'pretty-format';
export declare type SetupOptions = {
    config: Config.ProjectConfig;
    globalConfig: Config.GlobalConfig;
    localRequire: (moduleName: string) => Plugin;
    testPath: Config.Path;
};
declare const _default: ({ config, globalConfig, localRequire, testPath, }: SetupOptions) => import("jest-snapshot/build/State").default;
export default _default;
//# sourceMappingURL=setup_jest_globals.d.ts.map