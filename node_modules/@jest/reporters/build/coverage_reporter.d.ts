/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Config } from '@jest/types';
import { AggregatedResult, TestResult } from '@jest/test-result';
import { CoverageMap } from 'istanbul-lib-coverage';
import BaseReporter from './base_reporter';
import { Context, Test, CoverageReporterOptions } from './types';
export default class CoverageReporter extends BaseReporter {
    private _coverageMap;
    private _globalConfig;
    private _sourceMapStore;
    private _options;
    constructor(globalConfig: Config.GlobalConfig, options?: CoverageReporterOptions);
    onTestResult(_test: Test, testResult: TestResult, _aggregatedResults: AggregatedResult): void;
    onRunComplete(contexts: Set<Context>, aggregatedResults: AggregatedResult): Promise<void>;
    private _addUntestedFiles;
    private _checkThreshold;
    getCoverageMap(): CoverageMap;
}
//# sourceMappingURL=coverage_reporter.d.ts.map