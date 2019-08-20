/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Test } from 'jest-runner';
import { Config } from '@jest/types';
import { TestResult } from '@jest/test-result';
export default class FailedTestsCache {
    private _enabledTestsMap?;
    filterTests(tests: Array<Test>): Array<Test>;
    setTestResults(testResults: Array<TestResult>): void;
    updateConfig(globalConfig: Config.GlobalConfig): Config.GlobalConfig;
}
//# sourceMappingURL=FailedTestsCache.d.ts.map