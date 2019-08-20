/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { Reporter, RunDetails } from '../types';
import { SpecResult } from './Spec';
import { SuiteResult } from './Suite';
import Timer from './Timer';
export default class JsApiReporter implements Reporter {
    started: boolean;
    finished: boolean;
    runDetails: RunDetails;
    jasmineStarted: (runDetails: RunDetails) => void;
    jasmineDone: (runDetails: RunDetails) => void;
    status: () => unknown;
    executionTime: () => unknown;
    suiteStarted: (result: SuiteResult) => void;
    suiteDone: (result: SuiteResult) => void;
    suiteResults: (index: number, length: number) => Array<SuiteResult>;
    suites: () => Record<string, SuiteResult>;
    specResults: (index: number, length: number) => Array<SpecResult>;
    specDone: (result: SpecResult) => void;
    specs: () => Array<SpecResult>;
    specStarted: (spec: SpecResult) => void;
    constructor(options: {
        timer?: Timer;
    });
}
//# sourceMappingURL=JsApiReporter.d.ts.map