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
export default class ReportDispatcher implements Reporter {
    addReporter: (reporter: Reporter) => void;
    provideFallbackReporter: (reporter: Reporter) => void;
    clearReporters: () => void;
    jasmineDone: (runDetails: RunDetails) => void;
    jasmineStarted: (runDetails: RunDetails) => void;
    specDone: (result: SpecResult) => void;
    specStarted: (spec: SpecResult) => void;
    suiteDone: (result: SuiteResult) => void;
    suiteStarted: (result: SuiteResult) => void;
    constructor(methods: Array<keyof Reporter>);
}
//# sourceMappingURL=ReportDispatcher.d.ts.map