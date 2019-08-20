/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { Jasmine, AssertionErrorWithStack, Reporter, Spy } from '../types';
import Spec from './Spec';
import Suite from './Suite';
export default function (j$: Jasmine): {
    new (_options?: object | undefined): {
        specFilter: (spec: Spec) => boolean;
        catchExceptions: (value: unknown) => boolean;
        throwOnExpectationFailure: (value: unknown) => void;
        catchingExceptions: () => boolean;
        topSuite: () => Suite;
        fail: (error: Error | AssertionErrorWithStack) => void;
        pending: (message: string) => void;
        afterAll: (afterAllFunction: (done: (error?: any) => void) => void, timeout?: number | undefined) => void;
        fit: (description: string, fn: (done: (error?: any) => void) => void, timeout?: number | undefined) => void;
        throwingExpectationFailures: () => boolean;
        randomizeTests: (value: unknown) => void;
        randomTests: () => boolean;
        seed: (value: unknown) => unknown;
        execute: (runnablesToRun: string[], suiteTree?: Suite | undefined) => Promise<void>;
        fdescribe: (description: string, specDefinitions: Function) => Suite;
        spyOn: (obj: Record<string, any>, methodName: string, accessType?: "configurable" | "enumerable" | "value" | "writable" | "get" | "set" | undefined) => Spy;
        beforeEach: (beforeEachFunction: (done: (error?: any) => void) => void, timeout?: number | undefined) => void;
        afterEach: (afterEachFunction: (done: (error?: any) => void) => void, timeout?: number | undefined) => void;
        clearReporters: () => void;
        addReporter: (reporterToAdd: Reporter) => void;
        it: (description: string, fn: (done: (error?: any) => void) => void, timeout?: number | undefined) => Spec;
        xdescribe: (description: string, specDefinitions: Function) => Suite;
        xit: (description: string, fn: (done: (error?: any) => void) => void, timeout?: number | undefined) => any;
        beforeAll: (beforeAllFunction: (done: (error?: any) => void) => void, timeout?: number | undefined) => void;
        todo: () => Spec;
        provideFallbackReporter: (reporterToAdd: Reporter) => void;
        allowRespy: (allow: boolean) => void;
        describe: (description: string, specDefinitions: Function) => Suite;
    };
};
//# sourceMappingURL=Env.d.ts.map