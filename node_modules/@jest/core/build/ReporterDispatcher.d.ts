/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { AggregatedResult, TestResult } from '@jest/test-result';
import { Test } from 'jest-runner';
import { Context } from 'jest-runtime';
import { Reporter, ReporterOnStartOptions } from '@jest/reporters';
export default class ReporterDispatcher {
    private _reporters;
    constructor();
    register(reporter: Reporter): void;
    unregister(ReporterClass: Function): void;
    onTestResult(test: Test, testResult: TestResult, results: AggregatedResult): Promise<void>;
    onTestStart(test: Test): Promise<void>;
    onRunStart(results: AggregatedResult, options: ReporterOnStartOptions): Promise<void>;
    onRunComplete(contexts: Set<Context>, results: AggregatedResult): Promise<void>;
    getErrors(): Array<Error>;
    hasErrors(): boolean;
}
//# sourceMappingURL=ReporterDispatcher.d.ts.map