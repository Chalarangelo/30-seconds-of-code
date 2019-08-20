/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Config } from '@jest/types';
import { CoverageReporterSerializedOptions } from './types';
import { CoverageWorkerResult } from './generateEmptyCoverage';
export declare type CoverageWorkerData = {
    globalConfig: Config.GlobalConfig;
    config: Config.ProjectConfig;
    path: Config.Path;
    options?: CoverageReporterSerializedOptions;
};
export { CoverageWorkerResult };
export declare function worker({ config, globalConfig, path, options, }: CoverageWorkerData): CoverageWorkerResult | null;
//# sourceMappingURL=coverage_worker.d.ts.map