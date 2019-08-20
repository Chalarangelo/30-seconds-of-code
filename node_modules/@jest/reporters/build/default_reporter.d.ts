/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Config } from '@jest/types';
import { AggregatedResult, TestResult } from '@jest/test-result';
import { Test, ReporterOnStartOptions } from './types';
import BaseReporter from './base_reporter';
export default class DefaultReporter extends BaseReporter {
    private _clear;
    private _err;
    protected _globalConfig: Config.GlobalConfig;
    private _out;
    private _status;
    private _bufferedOutput;
    constructor(globalConfig: Config.GlobalConfig);
    private _wrapStdio;
    forceFlushBufferedOutput(): void;
    private _clearStatus;
    private _printStatus;
    onRunStart(aggregatedResults: AggregatedResult, options: ReporterOnStartOptions): void;
    onTestStart(test: Test): void;
    onRunComplete(): void;
    onTestResult(test: Test, testResult: TestResult, aggregatedResults: AggregatedResult): void;
    testFinished(config: Config.ProjectConfig, testResult: TestResult, aggregatedResults: AggregatedResult): void;
    printTestFileHeader(_testPath: Config.Path, config: Config.ProjectConfig, result: TestResult): void;
    printTestFileFailureMessage(_testPath: Config.Path, _config: Config.ProjectConfig, result: TestResult): void;
}
//# sourceMappingURL=default_reporter.d.ts.map