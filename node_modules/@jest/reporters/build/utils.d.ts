/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Config } from '@jest/types';
import { AggregatedResult } from '@jest/test-result';
import { SummaryOptions } from './types';
export declare const printDisplayName: (config: Config.ProjectConfig) => string;
export declare const trimAndFormatPath: (pad: number, config: Config.GlobalConfig | Config.ProjectConfig, testPath: string, columns: number) => string;
export declare const formatTestPath: (config: Config.GlobalConfig | Config.ProjectConfig, testPath: string) => string;
export declare const relativePath: (config: Config.GlobalConfig | Config.ProjectConfig, testPath: string) => {
    basename: string;
    dirname: string;
};
export declare const getSummary: (aggregatedResults: AggregatedResult, options?: SummaryOptions | undefined) => string;
export declare const wrapAnsiString: (string: string, terminalWidth: number) => string;
//# sourceMappingURL=utils.d.ts.map