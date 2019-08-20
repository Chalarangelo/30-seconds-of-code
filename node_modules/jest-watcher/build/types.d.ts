/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="node" />
import { Config } from '@jest/types';
import { AggregatedResult } from '@jest/test-result';
declare type TestSuiteInfo = {
    config: Config.ProjectConfig;
    duration?: number;
    testPath: string;
};
export declare type JestHookExposedFS = {
    projects: Array<{
        config: Config.ProjectConfig;
        testPaths: Array<Config.Path>;
    }>;
};
export declare type FileChange = (fs: JestHookExposedFS) => void;
export declare type ShouldRunTestSuite = (testSuiteInfo: TestSuiteInfo) => Promise<boolean>;
export declare type TestRunComplete = (results: AggregatedResult) => void;
export declare type JestHookSubscriber = {
    onFileChange: (fn: FileChange) => void;
    onTestRunComplete: (fn: TestRunComplete) => void;
    shouldRunTestSuite: (fn: ShouldRunTestSuite) => void;
};
export declare type JestHookEmitter = {
    onFileChange: (fs: JestHookExposedFS) => void;
    onTestRunComplete: (results: AggregatedResult) => void;
    shouldRunTestSuite: (testSuiteInfo: TestSuiteInfo) => Promise<boolean>;
};
export declare type UsageData = {
    key: string;
    prompt: string;
};
export declare type AllowedConfigOptions = Partial<Pick<Config.GlobalConfig, 'bail' | 'changedSince' | 'collectCoverage' | 'collectCoverageFrom' | 'collectCoverageOnlyFrom' | 'coverageDirectory' | 'coverageReporters' | 'notify' | 'notifyMode' | 'onlyFailures' | 'reporters' | 'testNamePattern' | 'testPathPattern' | 'updateSnapshot' | 'verbose'> & {
    mode: 'watch' | 'watchAll';
}>;
export declare type UpdateConfigCallback = (config?: AllowedConfigOptions) => void;
export interface WatchPlugin {
    isInternal?: boolean;
    apply?: (hooks: JestHookSubscriber) => void;
    getUsageInfo?: (globalConfig: Config.GlobalConfig) => UsageData | null;
    onKey?: (value: string) => void;
    run?: (globalConfig: Config.GlobalConfig, updateConfigAndRun: UpdateConfigCallback) => Promise<void | boolean>;
}
export interface WatchPluginClass {
    new (options: {
        stdin: NodeJS.ReadStream;
        stdout: NodeJS.WriteStream;
    }): WatchPlugin;
}
export declare type ScrollOptions = {
    offset: number;
    max: number;
};
export {};
//# sourceMappingURL=types.d.ts.map