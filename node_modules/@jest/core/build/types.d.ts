/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Context } from 'jest-runtime';
import { Test } from 'jest-runner';
import { Config } from '@jest/types';
export declare type Stats = {
    roots: number;
    testMatch: number;
    testPathIgnorePatterns: number;
    testRegex: number;
    testPathPattern?: number;
};
export declare type TestRunData = Array<{
    context: Context;
    matches: {
        allTests: number;
        tests: Array<Test>;
        total?: number;
        stats?: Stats;
    };
}>;
export declare type TestPathCases = Array<{
    stat: keyof Stats;
    isMatch: (path: Config.Path) => boolean;
}>;
export declare type TestPathCasesWithPathPattern = TestPathCases & {
    testPathPattern: (path: Config.Path) => boolean;
};
export declare type FilterResult = {
    test: string;
    message: string;
};
export declare type Filter = (testPaths: Array<string>) => Promise<{
    filtered: Array<FilterResult>;
}>;
//# sourceMappingURL=types.d.ts.map