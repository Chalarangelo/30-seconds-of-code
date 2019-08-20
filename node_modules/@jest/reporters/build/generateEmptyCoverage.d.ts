/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Config } from '@jest/types';
export declare type CoverageWorkerResult = {
    coverage: any;
    sourceMapPath?: string | null;
};
export default function (source: string, filename: Config.Path, globalConfig: Config.GlobalConfig, config: Config.ProjectConfig, changedFiles?: Set<Config.Path>): CoverageWorkerResult | null;
//# sourceMappingURL=generateEmptyCoverage.d.ts.map