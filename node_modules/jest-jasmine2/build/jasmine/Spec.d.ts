/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { Config } from '@jest/types';
import { FailedAssertion, Milliseconds, Status } from '@jest/test-result';
import ExpectationFailed from '../ExpectationFailed';
import expectationResultFactory, { Options as ExpectationResultFactoryOptions } from '../expectationResultFactory';
import queueRunner, { QueueableFn } from '../queueRunner';
import { AssertionErrorWithStack } from '../types';
export declare type Attributes = {
    id: string;
    resultCallback: (result: Spec['result']) => void;
    description: string;
    throwOnExpectationFailure: unknown;
    getTestPath: () => Config.Path;
    queueableFn: QueueableFn;
    beforeAndAfterFns: () => {
        befores: Array<QueueableFn>;
        afters: Array<QueueableFn>;
    };
    userContext: () => unknown;
    onStart: (context: Spec) => void;
    getSpecName: (spec: Spec) => string;
    queueRunnerFactory: typeof queueRunner;
};
export declare type SpecResult = {
    id: string;
    description: string;
    fullName: string;
    duration?: Milliseconds;
    failedExpectations: Array<FailedAssertion>;
    testPath: Config.Path;
    passedExpectations: Array<ReturnType<typeof expectationResultFactory>>;
    pendingReason: string;
    status: Status;
    __callsite?: {
        getColumnNumber: () => number;
        getLineNumber: () => number;
    };
};
export default class Spec {
    id: string;
    description: string;
    resultCallback: (result: SpecResult) => void;
    queueableFn: QueueableFn;
    beforeAndAfterFns: () => {
        befores: Array<QueueableFn>;
        afters: Array<QueueableFn>;
    };
    userContext: () => unknown;
    onStart: (spec: Spec) => void;
    getSpecName: (spec: Spec) => string;
    queueRunnerFactory: typeof queueRunner;
    throwOnExpectationFailure: boolean;
    initError: Error;
    result: SpecResult;
    disabled?: boolean;
    currentRun?: ReturnType<typeof queueRunner>;
    markedTodo?: boolean;
    markedPending?: boolean;
    expand?: boolean;
    static pendingSpecExceptionMessage: string;
    static isPendingSpecException(e: Error): boolean;
    constructor(attrs: Attributes);
    addExpectationResult(passed: boolean, data: ExpectationResultFactoryOptions, isError?: boolean): void;
    execute(onComplete: Function, enabled: boolean): void;
    cancel(): void;
    onException(error: ExpectationFailed | AssertionErrorWithStack): void;
    disable(): void;
    pend(message?: string): void;
    todo(): void;
    getResult(): SpecResult;
    status(enabled?: boolean): "disabled" | "pending" | "failed" | "passed" | "todo";
    isExecutable(): boolean;
    getFullName(): string;
    isAssertionError(error: Error): boolean;
}
//# sourceMappingURL=Spec.d.ts.map