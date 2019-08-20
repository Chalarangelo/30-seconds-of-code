/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="yargs" />
export declare const check: (argv: import("yargs").Arguments<Partial<{
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
}>>) => boolean;
export declare const usage = "Usage: $0 [--config=<pathToConfigFile>] [TestPathPattern]";
export declare const docs = "Documentation: https://jestjs.io/";
export declare const options: {
    all: {
        default: undefined;
        description: string;
        type: "boolean";
    };
    automock: {
        default: undefined;
        description: string;
        type: "boolean";
    };
    bail: {
        alias: string;
        default: undefined;
        description: string;
        type: "boolean";
    };
    browser: {
        default: undefined;
        description: string;
        type: "boolean";
    };
    cache: {
        default: undefined;
        description: string;
        type: "boolean";
    };
    cacheDirectory: {
        description: string;
        type: "string";
    };
    changedFilesWithAncestor: {
        default: undefined;
        description: string;
        type: "boolean";
    };
    changedSince: {
        description: string;
        nargs: number;
        type: "string";
    };
    ci: {
        default: boolean;
        description: string;
        type: "boolean";
    };
    clearCache: {
        default: undefined;
        description: string;
        type: "boolean";
    };
    clearMocks: {
        default: undefined;
        description: string;
        type: "boolean";
    };
    collectCoverage: {
        default: undefined;
        description: string;
        type: "boolean";
    };
    collectCoverageFrom: {
        description: string;
        type: "string";
    };
    collectCoverageOnlyFrom: {
        description: string;
        string: true;
        type: "array";
    };
    color: {
        default: undefined;
        description: string;
        type: "boolean";
    };
    colors: {
        default: undefined;
        description: string;
        type: "boolean";
    };
    config: {
        alias: string;
        description: string;
        type: "string";
    };
    coverage: {
        default: undefined;
        description: string;
        type: "boolean";
    };
    coverageDirectory: {
        description: string;
        type: "string";
    };
    coveragePathIgnorePatterns: {
        description: string;
        string: true;
        type: "array";
    };
    coverageReporters: {
        description: string;
        string: true;
        type: "array";
    };
    coverageThreshold: {
        description: string;
        type: "string";
    };
    debug: {
        default: undefined;
        description: string;
        type: "boolean";
    };
    detectLeaks: {
        default: boolean;
        description: string;
        type: "boolean";
    };
    detectOpenHandles: {
        default: boolean;
        description: string;
        type: "boolean";
    };
    env: {
        description: string;
        type: "string";
    };
    errorOnDeprecated: {
        default: boolean;
        description: string;
        type: "boolean";
    };
    expand: {
        alias: string;
        default: undefined;
        description: string;
        type: "boolean";
    };
    filter: {
        default: undefined;
        description: string;
        type: "string";
    };
    findRelatedTests: {
        default: undefined;
        description: string;
        type: "boolean";
    };
    forceExit: {
        default: undefined;
        description: string;
        type: "boolean";
    };
    globalSetup: {
        description: string;
        type: "string";
    };
    globalTeardown: {
        description: string;
        type: "string";
    };
    globals: {
        description: string;
        type: "string";
    };
    haste: {
        description: string;
        type: "string";
    };
    init: {
        description: string;
        type: "boolean";
    };
    json: {
        default: undefined;
        description: string;
        type: "boolean";
    };
    lastCommit: {
        default: undefined;
        description: string;
        type: "boolean";
    };
    listTests: {
        default: boolean;
        description: string;
        type: "boolean";
    };
    logHeapUsage: {
        default: undefined;
        description: string;
        type: "boolean";
    };
    mapCoverage: {
        default: undefined;
        description: string;
        type: "boolean";
    };
    maxConcurrency: {
        default: number;
        description: string;
        type: "number";
    };
    maxWorkers: {
        alias: string;
        description: string;
        type: "string";
    };
    moduleDirectories: {
        description: string;
        string: true;
        type: "array";
    };
    moduleFileExtensions: {
        description: string;
        string: true;
        type: "array";
    };
    moduleNameMapper: {
        description: string;
        type: "string";
    };
    modulePathIgnorePatterns: {
        description: string;
        string: true;
        type: "array";
    };
    modulePaths: {
        description: string;
        string: true;
        type: "array";
    };
    noStackTrace: {
        default: undefined;
        description: string;
        type: "boolean";
    };
    notify: {
        default: undefined;
        description: string;
        type: "boolean";
    };
    notifyMode: {
        default: string;
        description: string;
        type: "string";
    };
    onlyChanged: {
        alias: string;
        default: undefined;
        description: string;
        type: "boolean";
    };
    onlyFailures: {
        alias: string;
        default: undefined;
        description: string;
        type: "boolean";
    };
    outputFile: {
        description: string;
        type: "string";
    };
    passWithNoTests: {
        default: boolean;
        description: string;
        type: "boolean";
    };
    preset: {
        description: string;
        type: "string";
    };
    prettierPath: {
        default: undefined;
        description: string;
        type: "string";
    };
    projects: {
        description: string;
        string: true;
        type: "array";
    };
    reporters: {
        description: string;
        string: true;
        type: "array";
    };
    resetMocks: {
        default: undefined;
        description: string;
        type: "boolean";
    };
    resetModules: {
        default: undefined;
        description: string;
        type: "boolean";
    };
    resolver: {
        description: string;
        type: "string";
    };
    restoreMocks: {
        default: undefined;
        description: string;
        type: "boolean";
    };
    rootDir: {
        description: string;
        type: "string";
    };
    roots: {
        description: string;
        string: true;
        type: "array";
    };
    runInBand: {
        alias: string;
        default: undefined;
        description: string;
        type: "boolean";
    };
    runTestsByPath: {
        default: boolean;
        description: string;
        type: "boolean";
    };
    runner: {
        description: string;
        type: "string";
    };
    setupFiles: {
        description: string;
        string: true;
        type: "array";
    };
    setupFilesAfterEnv: {
        description: string;
        string: true;
        type: "array";
    };
    showConfig: {
        default: undefined;
        description: string;
        type: "boolean";
    };
    silent: {
        default: undefined;
        description: string;
        type: "boolean";
    };
    skipFilter: {
        default: undefined;
        description: string;
        type: "boolean";
    };
    snapshotSerializers: {
        description: string;
        string: true;
        type: "array";
    };
    testEnvironment: {
        description: string;
        type: "string";
    };
    testEnvironmentOptions: {
        description: string;
        type: "string";
    };
    testFailureExitCode: {
        description: string;
        type: "string";
    };
    testLocationInResults: {
        default: boolean;
        description: string;
        type: "boolean";
    };
    testMatch: {
        description: string;
        string: true;
        type: "array";
    };
    testNamePattern: {
        alias: string;
        description: string;
        type: "string";
    };
    testPathIgnorePatterns: {
        description: string;
        string: true;
        type: "array";
    };
    testPathPattern: {
        description: string;
        string: true;
        type: "array";
    };
    testRegex: {
        description: string;
        string: true;
        type: "array";
    };
    testResultsProcessor: {
        description: string;
        type: "string";
    };
    testRunner: {
        description: string;
        type: "string";
    };
    testSequencer: {
        description: string;
        type: "string";
    };
    testTimeout: {
        description: string;
        type: "number";
    };
    testURL: {
        description: string;
        type: "string";
    };
    timers: {
        description: string;
        type: "string";
    };
    transform: {
        description: string;
        type: "string";
    };
    transformIgnorePatterns: {
        description: string;
        string: true;
        type: "array";
    };
    unmockedModulePathPatterns: {
        description: string;
        string: true;
        type: "array";
    };
    updateSnapshot: {
        alias: string;
        default: undefined;
        description: string;
        type: "boolean";
    };
    useStderr: {
        default: undefined;
        description: string;
        type: "boolean";
    };
    verbose: {
        default: undefined;
        description: string;
        type: "boolean";
    };
    version: {
        alias: string;
        default: undefined;
        description: string;
        type: "boolean";
    };
    watch: {
        default: undefined;
        description: string;
        type: "boolean";
    };
    watchAll: {
        default: undefined;
        description: string;
        type: "boolean";
    };
    watchPathIgnorePatterns: {
        description: string;
        string: true;
        type: "array";
    };
    watchman: {
        default: undefined;
        description: string;
        type: "boolean";
    };
};
//# sourceMappingURL=args.d.ts.map