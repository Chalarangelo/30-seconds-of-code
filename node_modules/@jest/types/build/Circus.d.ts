/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="node" />
import * as Global from './Global';
declare type Process = NodeJS.Process;
export declare type DoneFn = Global.DoneFn;
export declare type BlockFn = Global.BlockFn;
export declare type BlockName = Global.BlockName;
export declare type BlockMode = void | 'skip' | 'only' | 'todo';
export declare type TestMode = BlockMode;
export declare type TestName = Global.TestName;
export declare type TestFn = Global.TestFn;
export declare type HookFn = (done?: DoneFn) => Promise<any> | null | undefined;
export declare type AsyncFn = TestFn | HookFn;
export declare type SharedHookType = 'afterAll' | 'beforeAll';
export declare type HookType = SharedHookType | 'afterEach' | 'beforeEach';
export declare type TestContext = Record<string, any>;
export declare type Exception = any;
export declare type FormattedError = string;
export declare type Hook = {
    asyncError: Error;
    fn: HookFn;
    type: HookType;
    parent: DescribeBlock;
    timeout: number | undefined | null;
};
export declare type EventHandler = (event: Event, state: State) => void;
export declare type Event = {
    name: 'include_test_location_in_result';
} | {
    asyncError: Error;
    mode: BlockMode;
    name: 'start_describe_definition';
    blockName: BlockName;
} | {
    mode: BlockMode;
    name: 'finish_describe_definition';
    blockName: BlockName;
} | {
    asyncError: Error;
    name: 'add_hook';
    hookType: HookType;
    fn: HookFn;
    timeout: number | undefined;
} | {
    asyncError: Error;
    name: 'add_test';
    testName: TestName;
    fn?: TestFn;
    mode?: TestMode;
    timeout: number | undefined;
} | {
    name: 'hook_start';
    hook: Hook;
} | {
    name: 'hook_success';
    describeBlock?: DescribeBlock;
    test?: TestEntry;
    hook: Hook;
} | {
    name: 'hook_failure';
    error: string | Exception;
    describeBlock?: DescribeBlock;
    test?: TestEntry;
    hook: Hook;
} | {
    name: 'test_fn_start';
    test: TestEntry;
} | {
    name: 'test_fn_success';
    test: TestEntry;
} | {
    name: 'test_fn_failure';
    error: Exception;
    test: TestEntry;
} | {
    name: 'test_retry';
    test: TestEntry;
} | {
    name: 'test_start';
    test: TestEntry;
} | {
    name: 'test_skip';
    test: TestEntry;
} | {
    name: 'test_todo';
    test: TestEntry;
} | {
    name: 'test_done';
    test: TestEntry;
} | {
    name: 'run_describe_start';
    describeBlock: DescribeBlock;
} | {
    name: 'run_describe_finish';
    describeBlock: DescribeBlock;
} | {
    name: 'run_start';
} | {
    name: 'run_finish';
} | {
    name: 'error';
    error: Exception;
} | {
    name: 'setup';
    testNamePattern?: string;
    parentProcess: Process;
} | {
    name: 'teardown';
};
export declare type TestStatus = 'skip' | 'done' | 'todo';
export declare type TestResult = {
    duration?: number | null;
    errors: Array<FormattedError>;
    invocations: number;
    status: TestStatus;
    location?: {
        column: number;
        line: number;
    } | null;
    testPath: Array<TestName | BlockName>;
};
export declare type RunResult = {
    unhandledErrors: Array<FormattedError>;
    testResults: TestResults;
};
export declare type TestResults = Array<TestResult>;
export declare type GlobalErrorHandlers = {
    uncaughtException: Array<(exception: Exception) => void>;
    unhandledRejection: Array<(exception: Exception, promise: Promise<any>) => void>;
};
export declare type State = {
    currentDescribeBlock: DescribeBlock;
    currentlyRunningTest?: TestEntry | null;
    expand?: boolean;
    hasFocusedTests: boolean;
    originalGlobalErrorHandlers?: GlobalErrorHandlers;
    parentProcess: Process | null;
    rootDescribeBlock: DescribeBlock;
    testNamePattern?: RegExp | null;
    testTimeout: number;
    unhandledErrors: Array<Exception>;
    includeTestLocationInResult: boolean;
};
export declare type DescribeBlock = {
    children: Array<DescribeBlock>;
    hooks: Array<Hook>;
    mode: BlockMode;
    name: BlockName;
    parent?: DescribeBlock;
    tests: Array<TestEntry>;
};
export declare type TestError = Exception | Array<[Exception | undefined, Exception]>;
export declare type TestEntry = {
    asyncError: Exception;
    errors: TestError;
    fn?: TestFn;
    invocations: number;
    mode: TestMode;
    name: TestName;
    parent: DescribeBlock;
    startedAt?: number | null;
    duration?: number | null;
    status?: TestStatus | null;
    timeout?: number;
};
export {};
//# sourceMappingURL=Circus.d.ts.map