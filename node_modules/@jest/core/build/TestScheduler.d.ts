/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Config } from '@jest/types';
import { Test } from 'jest-runner';
import { Reporter } from '@jest/reporters';
import { AggregatedResult } from '@jest/test-result';
import TestWatcher from './TestWatcher';
export declare type TestSchedulerOptions = {
    startRun: (globalConfig: Config.GlobalConfig) => void;
};
export declare type TestSchedulerContext = {
    firstRun: boolean;
    previousSuccess: boolean;
    changedFiles?: Set<Config.Path>;
};
export default class TestScheduler {
    private _dispatcher;
    private _globalConfig;
    private _options;
    private _context;
    constructor(globalConfig: Config.GlobalConfig, options: TestSchedulerOptions, context: TestSchedulerContext);
    addReporter(reporter: Reporter): void;
    removeReporter(ReporterClass: Function): void;
    scheduleTests(tests: Array<Test>, watcher: TestWatcher): Promise<AggregatedResult>;
    private _partitionTests;
    private _shouldAddDefaultReporters;
    private _setupReporters;
    private _setupDefaultReporters;
    private _addCustomReporters;
    /**
     * Get properties of a reporter in an object
     * to make dealing with them less painful.
     */
    private _getReporterProps;
    private _bailIfNeeded;
}
//# sourceMappingURL=TestScheduler.d.ts.map