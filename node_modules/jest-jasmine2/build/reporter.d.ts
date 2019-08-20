/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Config } from '@jest/types';
import { TestResult } from '@jest/test-result';
import { SpecResult } from './jasmine/Spec';
import { SuiteResult } from './jasmine/Suite';
import { Reporter, RunDetails } from './types';
export default class Jasmine2Reporter implements Reporter {
    private _testResults;
    private _globalConfig;
    private _config;
    private _currentSuites;
    private _resolve;
    private _resultsPromise;
    private _startTimes;
    private _testPath;
    constructor(globalConfig: Config.GlobalConfig, config: Config.ProjectConfig, testPath: Config.Path);
    jasmineStarted(_runDetails: RunDetails): void;
    specStarted(spec: SpecResult): void;
    specDone(result: SpecResult): void;
    suiteStarted(suite: SuiteResult): void;
    suiteDone(_result: SuiteResult): void;
    jasmineDone(_runDetails: RunDetails): void;
    getResults(): Promise<TestResult>;
    private _addMissingMessageToStack;
    private _extractSpecResults;
}
//# sourceMappingURL=reporter.d.ts.map