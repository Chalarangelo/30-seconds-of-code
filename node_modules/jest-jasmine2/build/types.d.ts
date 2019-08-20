/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="node" />
import { AssertionError } from 'assert';
import { Config } from '@jest/types';
import expect from 'expect';
import Spec, { SpecResult } from './jasmine/Spec';
import JsApiReporter from './jasmine/JsApiReporter';
import Timer from './jasmine/Timer';
import Env from './jasmine/Env';
import createSpy from './jasmine/createSpy';
import ReportDispatcher from './jasmine/ReportDispatcher';
import SpyRegistry from './jasmine/spyRegistry';
import Suite, { SuiteResult } from './jasmine/Suite';
import SpyStrategy from './jasmine/SpyStrategy';
import CallTracker from './jasmine/CallTracker';
export interface AssertionErrorWithStack extends AssertionError {
    stack: string;
}
export declare type SyncExpectationResult = {
    pass: boolean;
    message: () => string;
};
export declare type AsyncExpectationResult = Promise<SyncExpectationResult>;
export declare type ExpectationResult = SyncExpectationResult | AsyncExpectationResult;
export declare type RawMatcherFn = (expected: any, actual: any, options?: any) => ExpectationResult;
export declare type RunDetails = {
    totalSpecsDefined?: number;
    failedExpectations?: SuiteResult['failedExpectations'];
};
export declare type Reporter = {
    jasmineDone: (runDetails: RunDetails) => void;
    jasmineStarted: (runDetails: RunDetails) => void;
    specDone: (result: SpecResult) => void;
    specStarted: (spec: SpecResult) => void;
    suiteDone: (result: SuiteResult) => void;
    suiteStarted: (result: SuiteResult) => void;
};
export interface Spy extends Record<string, any> {
    (this: Record<string, unknown>, ...args: Array<any>): unknown;
    and: SpyStrategy;
    calls: CallTracker;
    restoreObjectToOriginalState?: () => void;
}
export declare type Jasmine = {
    _DEFAULT_TIMEOUT_INTERVAL: number;
    DEFAULT_TIMEOUT_INTERVAL: number;
    currentEnv_: ReturnType<typeof Env>['prototype'];
    getEnv: (options?: object) => ReturnType<typeof Env>['prototype'];
    createSpy: typeof createSpy;
    Env: ReturnType<typeof Env>;
    JsApiReporter: typeof JsApiReporter;
    ReportDispatcher: typeof ReportDispatcher;
    Spec: typeof Spec;
    SpyRegistry: typeof SpyRegistry;
    Suite: typeof Suite;
    Timer: typeof Timer;
    version: string;
    testPath: Config.Path;
    addMatchers: Function;
} & typeof expect & NodeJS.Global;
declare global {
    module NodeJS {
        interface Global {
            expect: typeof expect;
        }
    }
}
//# sourceMappingURL=types.d.ts.map