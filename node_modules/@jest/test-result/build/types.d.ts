/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CoverageMap, CoverageMapData } from 'istanbul-lib-coverage';
import { ConsoleBuffer } from '@jest/console';
import { Config } from '@jest/types';
export declare type SerializableError = {
    code?: unknown;
    message: string;
    stack: string | null | undefined;
    type?: string;
};
export declare type FailedAssertion = {
    matcherName?: string;
    message?: string;
    actual?: any;
    pass?: boolean;
    passed?: boolean;
    expected?: any;
    isNot?: boolean;
    stack?: string;
    error?: any;
};
export declare type AssertionLocation = {
    fullName: string;
    path: string;
};
export declare type Status = 'passed' | 'failed' | 'skipped' | 'pending' | 'todo' | 'disabled';
export declare type Bytes = number;
export declare type Milliseconds = number;
declare type Callsite = {
    column: number;
    line: number;
};
export declare type AssertionResult = {
    ancestorTitles: Array<string>;
    duration?: Milliseconds | null | undefined;
    failureMessages: Array<string>;
    fullName: string;
    invocations?: number;
    location: Callsite | null | undefined;
    numPassingAsserts: number;
    status: Status;
    title: string;
};
export declare type FormattedAssertionResult = {
    ancestorTitles: Array<string>;
    failureMessages: Array<string> | null;
    fullName: string;
    location: Callsite | null | undefined;
    status: Status;
    title: string;
};
export declare type AggregatedResultWithoutCoverage = {
    numFailedTests: number;
    numFailedTestSuites: number;
    numPassedTests: number;
    numPassedTestSuites: number;
    numPendingTests: number;
    numTodoTests: number;
    numPendingTestSuites: number;
    numRuntimeErrorTestSuites: number;
    numTotalTests: number;
    numTotalTestSuites: number;
    openHandles: Array<Error>;
    snapshot: SnapshotSummary;
    startTime: number;
    success: boolean;
    testResults: Array<TestResult>;
    wasInterrupted: boolean;
};
export declare type AggregatedResult = AggregatedResultWithoutCoverage & {
    coverageMap?: CoverageMap | null;
};
export declare type Suite = {
    title: string;
    suites: Array<Suite>;
    tests: Array<AssertionResult>;
};
export declare type TestResult = {
    console?: ConsoleBuffer;
    coverage?: CoverageMapData;
    displayName?: Config.DisplayName;
    failureMessage?: string | null;
    leaks: boolean;
    memoryUsage?: Bytes;
    numFailingTests: number;
    numPassingTests: number;
    numPendingTests: number;
    numTodoTests: number;
    openHandles: Array<Error>;
    perfStats: {
        end: Milliseconds;
        start: Milliseconds;
    };
    skipped: boolean;
    snapshot: {
        added: number;
        fileDeleted: boolean;
        matched: number;
        unchecked: number;
        uncheckedKeys: Array<string>;
        unmatched: number;
        updated: number;
    };
    sourceMaps?: {
        [sourcePath: string]: string;
    };
    testExecError?: SerializableError;
    testFilePath: string;
    testResults: Array<AssertionResult>;
};
export declare type FormattedTestResult = {
    message: string;
    name: string;
    summary: string;
    status: 'failed' | 'passed';
    startTime: number;
    endTime: number;
    coverage: any;
    assertionResults: Array<FormattedAssertionResult>;
};
export declare type FormattedTestResults = {
    coverageMap?: CoverageMap | null | undefined;
    numFailedTests: number;
    numFailedTestSuites: number;
    numPassedTests: number;
    numPassedTestSuites: number;
    numPendingTests: number;
    numPendingTestSuites: number;
    numRuntimeErrorTestSuites: number;
    numTotalTests: number;
    numTotalTestSuites: number;
    snapshot: SnapshotSummary;
    startTime: number;
    success: boolean;
    testResults: Array<FormattedTestResult>;
    wasInterrupted: boolean;
};
export declare type CodeCoverageReporter = any;
export declare type CodeCoverageFormatter = (coverage: CoverageMapData | null | undefined, reporter: CodeCoverageReporter) => Record<string, any> | null | undefined;
export declare type UncheckedSnapshot = {
    filePath: string;
    keys: Array<string>;
};
export declare type SnapshotSummary = {
    added: number;
    didUpdate: boolean;
    failure: boolean;
    filesAdded: number;
    filesRemoved: number;
    filesRemovedList: Array<string>;
    filesUnmatched: number;
    filesUpdated: number;
    matched: number;
    total: number;
    unchecked: number;
    uncheckedKeysByFile: Array<UncheckedSnapshot>;
    unmatched: number;
    updated: number;
};
export {};
//# sourceMappingURL=types.d.ts.map