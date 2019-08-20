/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Context } from 'jest-runtime';
import { Config } from '@jest/types';
import { Test } from 'jest-runner';
import { ChangedFiles } from 'jest-changed-files';
import { Filter, Stats } from './types';
export declare type SearchResult = {
    noSCM?: boolean;
    stats?: Stats;
    collectCoverageFrom?: Set<string>;
    tests: Array<Test>;
    total?: number;
};
export declare type TestSelectionConfig = {
    input?: string;
    findRelatedTests?: boolean;
    onlyChanged?: boolean;
    paths?: Array<Config.Path>;
    shouldTreatInputAsPattern?: boolean;
    testPathPattern?: string;
    watch?: boolean;
};
export default class SearchSource {
    private _context;
    private _testPathCases;
    constructor(context: Context);
    private _filterTestPathsWithStats;
    private _getAllTestPaths;
    isTestFilePath(path: Config.Path): boolean;
    findMatchingTests(testPathPattern?: string): SearchResult;
    findRelatedTests(allPaths: Set<Config.Path>, collectCoverage: boolean): SearchResult;
    findTestsByPaths(paths: Array<Config.Path>): SearchResult;
    findRelatedTestsFromPattern(paths: Array<Config.Path>, collectCoverage: boolean): SearchResult;
    findTestRelatedToChangedFiles(changedFilesInfo: ChangedFiles, collectCoverage: boolean): SearchResult;
    private _getTestPaths;
    getTestPaths(globalConfig: Config.GlobalConfig, changedFiles: ChangedFiles | undefined, filter?: Filter): Promise<SearchResult>;
}
//# sourceMappingURL=SearchSource.d.ts.map