/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Config } from '@jest/types';
import { OnTestFailure as JestOnTestFailure, OnTestStart as JestOnTestStart, OnTestSuccess as JestOnTestSuccess, Test as JestTest, TestRunnerContext as JestTestRunnerContext, TestRunnerOptions as JestTestRunnerOptions, TestWatcher as JestTestWatcher } from './types';
declare namespace TestRunner {
    type Test = JestTest;
    type OnTestFailure = JestOnTestFailure;
    type OnTestStart = JestOnTestStart;
    type OnTestSuccess = JestOnTestSuccess;
    type TestWatcher = JestTestWatcher;
    type TestRunnerContext = JestTestRunnerContext;
    type TestRunnerOptions = JestTestRunnerOptions;
}
declare class TestRunner {
    private _globalConfig;
    private _context;
    constructor(globalConfig: Config.GlobalConfig, context?: JestTestRunnerContext);
    runTests(tests: Array<JestTest>, watcher: JestTestWatcher, onStart: JestOnTestStart, onResult: JestOnTestSuccess, onFailure: JestOnTestFailure, options: JestTestRunnerOptions): Promise<void>;
    private _createInBandTestRun;
    private _createParallelTestRun;
}
export = TestRunner;
//# sourceMappingURL=index.d.ts.map