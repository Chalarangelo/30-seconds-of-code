/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="yargs" />
import { Config } from '@jest/types';
import { AggregatedResult } from '@jest/test-result';
export declare const runCLI: (argv: import("yargs").Arguments<Partial<{
    all: boolean;
    automock: boolean;
    bail: number | boolean;
    browser: boolean;
    cache: boolean;
    cacheDirectory: string;
    changedFilesWithAncestor: boolean;
    changedSince: string;
    ci: boolean;
    clearCache: boolean;
    clearMocks: boolean;
    collectCoverage: boolean;
    collectCoverageFrom: string;
    collectCoverageOnlyFrom: string[];
    color: boolean;
    colors: boolean;
    config: string;
    coverage: boolean;
    coverageDirectory: string;
    coveragePathIgnorePatterns: string[];
    coverageReporters: string[];
    coverageThreshold: string;
    debug: boolean;
    env: string;
    expand: boolean;
    findRelatedTests: boolean;
    forceExit: boolean;
    globals: string;
    globalSetup: string | null | undefined;
    globalTeardown: string | null | undefined;
    haste: string;
    init: boolean;
    json: boolean;
    lastCommit: boolean;
    logHeapUsage: boolean;
    maxWorkers: string | number;
    moduleDirectories: string[];
    moduleFileExtensions: string[];
    moduleNameMapper: string;
    modulePathIgnorePatterns: string[];
    modulePaths: string[];
    noStackTrace: boolean;
    notify: boolean;
    notifyMode: string;
    onlyChanged: boolean;
    outputFile: string;
    preset: string | null | undefined;
    projects: string[];
    prettierPath: string | null | undefined;
    resetMocks: boolean;
    resetModules: boolean;
    resolver: string | null | undefined;
    restoreMocks: boolean;
    rootDir: string;
    roots: string[];
    runInBand: boolean;
    setupFiles: string[];
    setupFilesAfterEnv: string[];
    showConfig: boolean;
    silent: boolean;
    snapshotSerializers: string[];
    testEnvironment: string;
    testFailureExitCode: string | null | undefined;
    testMatch: string[];
    testNamePattern: string;
    testPathIgnorePatterns: string[];
    testPathPattern: string[];
    testRegex: string | string[];
    testResultsProcessor: string | null | undefined;
    testRunner: string;
    testSequencer: string;
    testURL: string;
    testTimeout: number | null | undefined;
    timers: string;
    transform: string;
    transformIgnorePatterns: string[];
    unmockedModulePathPatterns: string[] | null | undefined;
    updateSnapshot: boolean;
    useStderr: boolean;
    verbose: boolean | null | undefined;
    version: boolean;
    watch: boolean;
    watchAll: boolean;
    watchman: boolean;
    watchPathIgnorePatterns: string[];
}>>, projects: string[]) => Promise<{
    results: AggregatedResult;
    globalConfig: Config.GlobalConfig;
}>;
//# sourceMappingURL=index.d.ts.map