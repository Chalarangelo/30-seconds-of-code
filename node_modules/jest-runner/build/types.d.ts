/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="node" />
import { EventEmitter } from 'events';
import { Config } from '@jest/types';
import { SerializableError, TestResult } from '@jest/test-result';
import { JestEnvironment } from '@jest/environment';
import { ModuleMap, FS as HasteFS } from 'jest-haste-map';
import HasteResolver from 'jest-resolve';
import Runtime from 'jest-runtime';
export declare type ErrorWithCode = Error & {
    code?: string;
};
export declare type Test = {
    context: Context;
    duration?: number;
    path: Config.Path;
};
export declare type Context = {
    config: Config.ProjectConfig;
    hasteFS: HasteFS;
    moduleMap: ModuleMap;
    resolver: HasteResolver;
};
export declare type OnTestStart = (test: Test) => Promise<void>;
export declare type OnTestFailure = (test: Test, serializableError: SerializableError) => Promise<void>;
export declare type OnTestSuccess = (test: Test, testResult: TestResult) => Promise<void>;
export declare type TestFramework = (globalConfig: Config.GlobalConfig, config: Config.ProjectConfig, environment: JestEnvironment, runtime: Runtime, testPath: string) => Promise<TestResult>;
export declare type TestRunnerOptions = {
    serial: boolean;
};
export declare type TestRunnerContext = {
    changedFiles?: Set<Config.Path>;
};
export declare type TestRunnerSerializedContext = {
    changedFiles?: Array<Config.Path>;
};
export declare type WatcherState = {
    interrupted: boolean;
};
export interface TestWatcher extends EventEmitter {
    state: WatcherState;
    new ({ isWatchMode }: {
        isWatchMode: boolean;
    }): TestWatcher;
    setState(state: WatcherState): void;
    isInterrupted(): boolean;
    isWatchMode(): boolean;
}
//# sourceMappingURL=types.d.ts.map