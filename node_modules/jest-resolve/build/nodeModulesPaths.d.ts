/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Adapted from: https://github.com/substack/node-resolve
 */
import { Config } from '@jest/types';
declare type NodeModulesPathsOptions = {
    moduleDirectory?: Array<string>;
    paths?: Array<Config.Path>;
};
export default function nodeModulesPaths(basedir: Config.Path, options: NodeModulesPathsOptions): Array<Config.Path>;
export {};
//# sourceMappingURL=nodeModulesPaths.d.ts.map